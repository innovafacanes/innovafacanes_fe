// Converts Strapi v4 REST responses into the plain objects the pages use.
// This is the only file that knows the Strapi response shape (update it for Strapi v5).

const toImage = (media) =>
  media?.attributes
    ? {
        url: media.attributes.url,
        alt: media.attributes.alternativeText ?? "",
        width: media.attributes.width ?? null,
        height: media.attributes.height ?? null,
      }
    : null;

const toImages = (relation) => (relation?.data ?? []).map(toImage).filter(Boolean);

export const normalizeProject = (entry) => ({
  id: entry.id,
  title: entry.attributes.Title ?? "",
  description: entry.attributes.Description ?? "",
  date: entry.attributes.Date ?? null,
  images: toImages(entry.attributes.Images),
});

export const normalizeFirstProject = (response) =>
  response.data.length > 0 ? normalizeProject(response.data[0]) : null;

export const normalizeProjectsPage = (response) => ({
  projects: response.data.map(normalizeProject),
  page: response.meta.pagination.page,
  pageCount: response.meta.pagination.pageCount,
  total: response.meta.pagination.total,
});

export const normalizeHome = (response) => ({
  carousel: toImages(response.data.attributes.top_carousel),
  reasons: (response.data.attributes.perque_nosaltres ?? []).map((reason) => ({
    title: reason.titol_rao,
    description: reason.descripcio_rao,
  })),
});

export const normalizeNosaltres = (response) =>
  (response.data.attributes.tema ?? []).map((section) => ({
    title: section.titol,
    description: section.descripcio,
    image: toImage(section.imatge?.data),
  }));

export const normalizeServeis = (response) =>
  (response.data.attributes.servei ?? []).map((service) => ({
    title: service.titol_servei,
    description: service.descripcio_servei,
  }));

export const normalizeContact = (response) => ({
  name: response.data.attributes.nom_empresa,
  address: response.data.attributes.direccio_empresa,
  phone: response.data.attributes.telefon_empresa,
  mobile: response.data.attributes.mobil_empresa,
  email: response.data.attributes.email_empresa,
});

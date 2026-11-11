export const slugify = (text) =>
  text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/·/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const projectSlug = (project) => `${slugify(project.title)}-${project.id}`;

export const projectIdFromSlug = (slug) => {
  const match = /(?:^|-)(\d+)$/.exec(slug ?? "");
  return match ? Number(match[1]) : null;
};

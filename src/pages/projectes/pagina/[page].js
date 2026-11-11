import ProjectsPage from "../../../../components/ProjectsPage";
import { REVALIDATE_SECONDS } from "@/lib/config";
import { getProjectsPage } from "@/lib/content";

export default ProjectsPage;

export async function getStaticPaths({ locales }) {
  const paths = [];
  for (const locale of locales) {
    const { pageCount } = await getProjectsPage(locale, 1);
    for (let page = 2; page <= pageCount; page++) {
      paths.push({ params: { page: String(page) }, locale });
    }
  }
  // New pages (when projects are added) are rendered on first request.
  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params, locale }) {
  const page = Number(params.page);
  // Page 1 lives at /projectes.
  if (!Number.isInteger(page) || page < 2) return { notFound: true };

  const { projects, pageCount } = await getProjectsPage(locale, page);
  if (page > pageCount) return { notFound: true, revalidate: REVALIDATE_SECONDS };

  return { props: { projects, page, pageCount }, revalidate: REVALIDATE_SECONDS };
}

import ProjectsPage from "../../../components/ProjectsPage";
import { REVALIDATE_SECONDS } from "@/lib/config";
import { getProjectsPage } from "@/lib/content";

export default ProjectsPage;

export async function getStaticProps({ locale }) {
  const { projects, page, pageCount } = await getProjectsPage(locale, 1);
  return { props: { projects, page, pageCount }, revalidate: REVALIDATE_SECONDS };
}

import { useContext } from "react";
import styles from "@/styles/Projectes.module.css";
import LanguageContext from "@/store/language/context/LanguageContext";
import Footer from "./Footer";
import Navbar from "./Navbar";
import ProjectsGrid from "./ProjectsGrid";
import Seo from "./Seo";

export default function ProjectsPage({ projects, page, pageCount }) {
  const { t } = useContext(LanguageContext);
  const title = page > 1 ? `${t("projects")} (${page}) | Innovafaçanes` : `${t("projects")} | Innovafaçanes`;

  return (
    <>
      <Seo title={title} />
      <Navbar />
      <div className={styles.mainProjectes}>
        <div className={styles.contentWrapper}>
          <h1>{t("projects")}</h1>
          <ProjectsGrid initialProjects={projects} page={page} pageCount={pageCount} />
        </div>
      </div>
      <Footer />
    </>
  );
}

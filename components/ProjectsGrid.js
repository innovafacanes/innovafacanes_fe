import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import styles from "@/styles/Projectes.module.css";
import LanguageContext from "@/store/language/context/LanguageContext";
import cloudinaryLoader from "@/lib/cloudinary";
import { getProject, getProjectsPage } from "@/lib/content";
import { projectIdFromSlug, projectSlug } from "@/lib/slug";
import ProjectPopup from "./ProjectPopup";

export default function ProjectsGrid({ initialProjects, page, pageCount }) {
  const router = useRouter();
  const { t } = useContext(LanguageContext);
  const [projects, setProjects] = useState(initialProjects);
  const [lastPage, setLastPage] = useState(page);
  const [loading, setLoading] = useState(false);
  const [activeProject, setActiveProject] = useState(null);

  // New props arrive when switching language or page. Browser "back" from a popup also
  // re-delivers equal props as a new object; keying on content keeps the projects already loaded.
  const initialKey = `${page}:${initialProjects.map((project) => project.id).join(",")}`;
  useEffect(() => {
    setProjects(initialProjects);
    setLastPage(page);
  }, [initialKey]);

  // The open popup lives in the URL (?p=slug) so it can be shared and closed with "back".
  const slug = typeof router.query.p === "string" ? router.query.p : null;
  useEffect(() => {
    if (!slug) {
      setActiveProject(null);
      return;
    }
    const id = projectIdFromSlug(slug);
    const loaded = projects.find((project) => project.id === id);
    if (loaded) {
      setActiveProject(loaded);
      return;
    }
    // Shared link to a project that is not on this page yet.
    let cancelled = false;
    getProject(router.locale, id)
      .then((project) => !cancelled && setActiveProject(project))
      .catch(() => !cancelled && setActiveProject(null));
    return () => {
      cancelled = true;
    };
  }, [slug, projects, router.locale]);

  const openProject = (project) => {
    router.push(
      { pathname: router.pathname, query: { ...router.query, p: projectSlug(project) } },
      undefined,
      { shallow: true, scroll: false }
    );
  };

  const closeProject = () => {
    const { p, ...query } = router.query;
    router.replace({ pathname: router.pathname, query }, undefined, { shallow: true, scroll: false });
  };

  const loadMore = async (event) => {
    event.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      const next = await getProjectsPage(router.locale, lastPage + 1);
      setProjects((current) => [...current, ...next.projects]);
      setLastPage(next.page);
    } catch {
      // Fall back to the pre-rendered page if the browser cannot reach Strapi.
      router.push(`/projectes/pagina/${lastPage + 1}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles.projectsWrapper}>
        {projects.map((project) => (
          <div key={project.id} className={styles.projectWrapper} onClick={() => openProject(project)}>
            {project.images[0] && (
              <Image
                className={styles.projectImg}
                loader={cloudinaryLoader}
                src={project.images[0].url}
                alt={project.images[0].alt}
                width={450}
                height={450}
              />
            )}
            <h2 className={styles.projectTitle}>{project.title}</h2>
            {/* Readable by search engines and screen readers; shown visually in the popup. */}
            <div className={styles.srOnly} dangerouslySetInnerHTML={{ __html: project.description }} />
          </div>
        ))}
      </div>
      {lastPage < pageCount && (
        <div className={styles.loadMoreWrapper}>
          <Link
            href={`/projectes/pagina/${lastPage + 1}`}
            className={styles.loadMore}
            onClick={loadMore}
            aria-busy={loading}
            scroll={false}
          >
            {t("loadMore")}
          </Link>
        </div>
      )}
      <ProjectPopup project={activeProject} onClose={closeProject} />
    </>
  );
}

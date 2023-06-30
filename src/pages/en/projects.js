import React, { useState } from "react";
import NavbarEn from "../../../components/NavbarEn";
import { fetchProjectes } from "../api/fetching";
import FooterEn from "../../../components/FooterEn";
import styles from "@/styles/Projectes.module.css";
import Image from "next/image";
import Popup from "reactjs-popup";

export default function Projects({ projects }) {
  const [open, setOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const closeModal = () => setOpen(false);

  return (
    <>
      <NavbarEn />
      <div className={styles.mainProjectes}>
        <h1>PROJECTS</h1>
        <div className={styles.projectsWrapper}>
          {projects.map((project, index) => (
            <div key={index}>
              <div
                className={styles.projectWrapper}
                onClick={() => {
                  setOpen((o) => !o);
                  setActiveProject(index);
                }}
              >
                <Image
                  className={styles.projectImg}
                  src={`${project.images.data[0].attributes.url}`}
                  alt={project.images.data[0].attributes.alternativeText}
                  width={450}
                  height={450}
                />
                <h2 className={styles.projectTitle}>{project.title}</h2>
              </div>

              <Popup
                key={index}
                open={activeProject === index ? open : false}
                className={styles.popupContent}
                closeOnDocumentClick
                onClose={closeModal}
                overlayStyle={{ background: "rgba(0,0,0,0.5)" }}
                contentStyle={{
                  margin: "auto",
                  position: "relative",
                  width: "80%",
                  height: "fit-content",
                  background: "white",
                  borderRadius: "0rem",
                  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "1rem",
                }}
              >
                <div className={styles.popupContentWrapper}>
                <div className={styles.detailImgCarousel}>
                  <div className={styles.carouselImgWrapper}>
                    {project.images.data.map((img, index) => (
                      <Image
                        key={index}
                        className={styles.projectDetailImg}
                        src={`${img.attributes.url}`}
                        alt={img.attributes.alternativeText}
                        width={600}
                        height={450}
                      />
                    ))}
                  </div>
                  <div class={styles.controls}>
                    <button id="prevBtn" className={styles.prevBtn}>
                      Previous
                    </button>
                    <button id="nextBtn" className={styles.nextBtn}>
                      Next
                    </button>
                  </div>
                </div>
                <div className={styles.detailText}>
                  <h3 className={styles.detailTitle}>{project.title}</h3>
                  <p className={styles.detailDescription}>
                    {project.description}
                  </p>
                  <p className={styles.detailDate}>
                    {project.date}
                  </p>
                </div>
                <a className={styles.close} onClick={closeModal}>
                  &times;
                </a>
                </div>
              </Popup>
            </div>
          ))}
        </div>
      </div>
      <FooterEn />
    </>
  );
}

export async function getStaticProps() {
  return fetchProjectes('en');
}

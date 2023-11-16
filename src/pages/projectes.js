import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import useStrapiApi, { fetchProjectes } from "./api/fetching";
import Footer from "../../components/Footer";
import styles from "@/styles/Projectes.module.css";
import Image from "next/image";
import Popup from "reactjs-popup";
import LanguageContext from "@/store/language/context/LanguageContext";

export default function Projectes() {
  const [open, setOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const closeModal = () => setOpen(false);
  const { fetchProjectes } = useStrapiApi();
  const { language } = useContext(LanguageContext);
  const [info, setInfo] = useState([]);
  const [title, setTitle] = useState(["Projectes"]);
  const [indexToShow, setIndexToShow] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);

  useEffect(() => {
    (async () => {
      const {
        props: { projects },
      } = await fetchProjectes(language);

      setInfo(projects);
    })();
  }, [fetchProjectes, language]);

  useEffect(() => {
    changeTitle(language);
  }, [language]);

  const changeTitle = (language) => {
    if (language === "ca") {
      setTitle(["Projectes"]);
    }
    if (language === "es") {
      setTitle(["Proyectos"]);
    }
    if (language === "en") {
      setTitle(["Projects"]);
    }
  };

  const setNextImage = () => {
    if (indexToShow < maxIndex) {
      setIndexToShow(indexToShow + 1);

      return;
    }

    setIndexToShow(0);
  };

  const setPreviousImage = () => {
    if (indexToShow > 0) {
      setIndexToShow(indexToShow - 1);

      return;
    }

    setIndexToShow(maxIndex);
  };

  return (
    <>
      <Navbar />
      <div className={styles.mainProjectes}>
        <h1>{title}</h1>
        {info && (
          <div className={styles.projectsWrapper}>
            {info.map((project, index) => (
              <div key={index}>
                <div
                  className={styles.projectWrapper}
                  onClick={() => {
                    setMaxIndex(project.images.data.length - 1);
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
                    maxWidth: "1200px",
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
                        {project.images.data[indexToShow] && (
                          <Image
                            className={styles.projectDetailImg}
                            src={`${project.images.data[indexToShow].attributes.url}`}
                            alt={
                              project.images.data[indexToShow].attributes
                                .alternativeText
                            }
                            width={600}
                            height={450}
                          />
                        )}
                      </div>
                      <div className={styles.controls}>
                        <button
                          id="prevBtn"
                          className={styles.prevBtn}
                          onClick={setPreviousImage}
                        >
                          {"<"}
                        </button>
                        <button
                          id="nextBtn"
                          className={styles.nextBtn}
                          onClick={setNextImage}
                        >
                          {">"}
                        </button>
                      </div>
                    </div>
                    <div className={styles.detailText}>
                      <h3 className={styles.detailTitle}>{project.title}</h3>
                      <p className={styles.detailDescription}>
                        {project.description}
                      </p>
                      <p className={styles.detailDate}>{project.date}</p>
                    </div>
                    <a className={styles.close} onClick={closeModal}>
                      &times;
                    </a>
                  </div>
                </Popup>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

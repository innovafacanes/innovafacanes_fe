import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import useStrapiApi, { fetchNosaltres } from "./api/fetching";
import styles from "@/styles/Nosaltres.module.css";
import Footer from "../../components/Footer";
import Image from "next/image";
import LanguageContext from "@/store/language/context/LanguageContext";

export default function Nosaltres() {
  const imgWidth = 800;
  const imgHeight = 550;
  const { language } = useContext(LanguageContext);
  const { fetchNosaltres } = useStrapiApi();
  const [info, setInfo] = useState([
    { title: "", description: "", image: "", alt: "" },
    { title: "", description: "", image: "", alt: "" },
    { title: "", description: "", image: "", alt: "" },
    { title: "", description: "", image: "", alt: "" },
  ]);
  const [title, setTitle] = useState(["Qui som?"]);

  useEffect(() => {
    (async () => {
      const {
        props: { nosaltresInfo },
      } = await fetchNosaltres(language);

      setInfo(nosaltresInfo);
    })();
  }, [fetchNosaltres, language]);

  useEffect(() => {
    changeTitle(language);
  }, [language]);

  const changeTitle = (language) => {
    if (language === "ca") {
      setTitle(["Qui som?"]);
    }
    if (language === "es") {
      setTitle(["¿Quiénes somos?"]);
    }
    if (language === "en") {
      setTitle(["About us"]);
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.nosaltresWrapper}>
        <div className={styles.mainTitle}>
          <h1>{title}</h1>
        </div>
        <div className={styles.sectionWrapper}>
          {/*FIRST*/}
          <div className={styles.themeWrapper}>
            <div className={styles.themeText}>
              <h2 className={styles.themeTitle}>{info[0].title}</h2>
              <p className={styles.themeDescription}>{info[0].description}</p>
            </div>
            <div className={styles.themeImageWrapper1}>
              <Image
                className={styles.themeImg}
                src={`${info[0].image}`}
                alt={info[0].alt}
                width={imgWidth}
                height={imgHeight}
              />
            </div>
          </div>
          {/*SECOND*/}
          <div className={`${styles.themeWrapperReverse}`}>
            <div className={styles.themeImageWrapper2}>
              <Image
                className={styles.themeImg}
                src={`${info[1].image}`}
                alt={info[1].alt}
                width={imgWidth}
                height={imgHeight}
              />
            </div>
            <div className={styles.themeText}>
              <h2 className={styles.themeTitle}>{info[1].title}</h2>
              <p className={styles.themeDescription}>{info[1].description}</p>
            </div>
          </div>
          {/*THIRD*/}
          <div className={styles.themeWrapper}>
            <div className={styles.themeText}>
              <h2 className={styles.themeTitle}>{info[2].title}</h2>
              <p className={styles.themeDescription}>{info[2].description}</p>
            </div>
            <div className={styles.themeImageWrapper1}>
              <Image
                className={styles.themeImg}
                src={`${info[2].image}`}
                alt={info[2].alt}
                width={imgWidth}
                height={imgHeight}
              />
            </div>
          </div>
          {/*FOURTH*/}
          <div className={`${styles.themeWrapperReverse}`}>
            <div className={styles.themeImageWrapper2}>
              <Image
                className={styles.themeImg}
                src={`${info[3].image}`}
                alt={info[3].alt}
                width={imgWidth}
                height={imgHeight}
              />
            </div>
            <div className={styles.themeText}>
              <h2 className={styles.themeTitle}>{info[3].title}</h2>
              <p className={styles.themeDescription}>{info[3].description}</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

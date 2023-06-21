import React from "react";
import Navbar from "../../components/Navbar";
import { fetchNosaltres } from "./api/fetching";
import styles from "@/styles/Nosaltres.module.css";
import Footer from "../../components/Footer";
import Image from "next/image";

export default function Nosaltres(props) {
  console.log(props.nosaltresInfo[0]); 
  const imgWidth = 800;
  const imgHeight = 550;
  return (
    <>
      <Navbar />
      <div className={styles.nosaltresWrapper}>
        <div className={styles.mainTitle}>
          <h1>¿QUI SOM?</h1>
        </div>
        <div className={styles.sectionWrapper}>
          {/*FIRST*/}
          <div className={styles.themeWrapper}>
            <div className={styles.themeText}>
              <h2 className={styles.themeTitle}>{props.nosaltresInfo[0].title}</h2>
              <p className={styles.themeDescription}>{props.nosaltresInfo[0].description}</p>
            </div>
            <div className={styles.themeImageWrapper1}>
            <Image className={styles.themeImg} src={`${props.nosaltresInfo[0].image}`} alt={props.nosaltresInfo[0].alt} width={imgWidth} height={imgHeight}/>
            </div>
          </div>
          {/*SECOND*/}
          <div className={`${styles.themeWrapperReverse}`}>
            <div className={styles.themeImageWrapper2}>
            <Image  className={styles.themeImg} src={`${props.nosaltresInfo[1].image}`} alt={props.nosaltresInfo[1].alt} width={imgWidth} height={imgHeight}/>
            </div>
            <div className={styles.themeText}>
              <h2 className={styles.themeTitle}>{props.nosaltresInfo[1].title}</h2>
              <p className={styles.themeDescription}>{props.nosaltresInfo[1].description}</p>
            </div>
          </div>
          {/*THIRD*/}
          <div className={styles.themeWrapper}>
            <div className={styles.themeText}>
              <h2 className={styles.themeTitle}>{props.nosaltresInfo[2].title}</h2>
              <p className={styles.themeDescription}>{props.nosaltresInfo[2].description}</p>
            </div>
            <div className={styles.themeImageWrapper1}>
            <Image  className={styles.themeImg} src={`${props.nosaltresInfo[2].image}`} alt={props.nosaltresInfo[2].alt} width={imgWidth} height={imgHeight}/>
            </div>
          </div>
          {/*FOURTH*/}
          <div className={`${styles.themeWrapperReverse}`}>
          <div className={styles.themeImageWrapper2}>
          <Image  className={styles.themeImg} src={`${props.nosaltresInfo[3].image}`} alt={props.nosaltresInfo[3].alt} width={imgWidth} height={imgHeight}/>
          </div>
            <div className={styles.themeText}>
              <h2 className={styles.themeTitle}>{props.nosaltresInfo[3].title}</h2>
              <p className={styles.themeDescription}>{props.nosaltresInfo[3].description}</p>
            </div>
          </div>

          <h2 className={styles.themeTitle}>{props.nosaltresInfo.title}</h2>
        </div>
      </div>
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  return fetchNosaltres();
}

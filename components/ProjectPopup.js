import Image from "next/image";
import Popup from "reactjs-popup";
import { useEffect, useState } from "react";
import styles from "@/styles/Projectes.module.css";
import cloudinaryLoader from "@/lib/cloudinary";

const CONTENT_STYLE = {
  margin: "auto",
  position: "relative",
  width: "80%",
  maxWidth: "1200px",
  minHeight: "60vh",
  background: "white",
  borderRadius: "0rem",
  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
  display: "flex",
  justifyContent: "space-between",
  padding: "1rem",
};

export default function ProjectPopup({ project, onClose }) {
  const [indexToShow, setIndexToShow] = useState(0);

  useEffect(() => {
    setIndexToShow(0);
  }, [project?.id]);

  const images = project?.images ?? [];
  const maxIndex = images.length - 1;
  const image = images[indexToShow];

  const setNextImage = () => setIndexToShow((index) => (index < maxIndex ? index + 1 : 0));
  const setPreviousImage = () => setIndexToShow((index) => (index > 0 ? index - 1 : maxIndex));

  return (
    <Popup
      open={Boolean(project)}
      className={styles.popupContent}
      closeOnDocumentClick
      onClose={onClose}
      overlayStyle={{ background: "rgba(0,0,0,0.5)" }}
      contentStyle={CONTENT_STYLE}
    >
      {project && (
        <div className={styles.popupContentWrapper}>
          <div className={styles.detailImgCarousel}>
            {image && (
              <Image
                className={styles.projectDetailImg}
                loader={cloudinaryLoader}
                src={image.url}
                alt={image.alt}
                width={600}
                height={450}
              />
            )}
            <div className={styles.controls}>
              <button id="prevBtn" className={styles.prevBtn} onClick={setPreviousImage}>
                <Image src="\arrow_right_black.svg" alt="Previous button" width={60} height={30} className={styles.prevBtnImg} />
              </button>
              <button id="nextBtn" className={styles.nextBtn} onClick={setNextImage}>
                <Image src="\arrow_right_black.svg" alt="Next button" width={60} height={30} className={styles.nextBtnImg} />
              </button>
            </div>
          </div>
          <div className={styles.detailText}>
            <h3 className={styles.detailTitle}>{project.title}</h3>
            <p className={styles.detailDescription} dangerouslySetInnerHTML={{ __html: project.description }} />
            <p className={styles.detailDate}>{project.date}</p>
          </div>
          <a className={styles.close} onClick={onClose}>
            &times;
          </a>
        </div>
      )}
    </Popup>
  );
}

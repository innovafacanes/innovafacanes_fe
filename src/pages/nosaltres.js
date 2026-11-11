import React, { useContext } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Seo from "../../components/Seo";
import styles from "@/styles/Nosaltres.module.css";
import Image from "next/image";
import LanguageContext from "@/store/language/context/LanguageContext";
import cloudinaryLoader from "@/lib/cloudinary";
import { REVALIDATE_SECONDS } from "@/lib/config";
import { getNosaltres } from "@/lib/content";

const IMG_WIDTH = 800;
const IMG_HEIGHT = 550;

function SectionImage({ image, wrapperClass }) {
  return (
    <div className={wrapperClass}>
      {image && (
        <Image
          className={styles.themeImg}
          loader={cloudinaryLoader}
          src={image.url}
          alt={image.alt}
          width={IMG_WIDTH}
          height={IMG_HEIGHT}
        />
      )}
    </div>
  );
}

function SectionText({ title, description }) {
  return (
    <div className={styles.themeText}>
      <h2 className={styles.themeTitle}>{title}</h2>
      <p className={styles.themeDescription}>{description}</p>
    </div>
  );
}

export default function Nosaltres({ sections }) {
  const { t } = useContext(LanguageContext);

  return (
    <>
      <Seo title={`${t("aboutUs")} | Innovafaçanes`} />
      <Navbar />
      <div className={styles.nosaltresWrapper}>
        <div className={styles.mainTitle}>
          <h1>{t("whoWeAre")}</h1>
        </div>
        <div className={styles.sectionWrapper}>
          {sections.map((section, index) =>
            index % 2 === 0 ? (
              <div key={index} className={styles.themeWrapper}>
                <SectionText {...section} />
                <SectionImage image={section.image} wrapperClass={styles.themeImageWrapper1} />
              </div>
            ) : (
              <div key={index} className={styles.themeWrapperReverse}>
                <SectionImage image={section.image} wrapperClass={styles.themeImageWrapper2} />
                <SectionText {...section} />
              </div>
            )
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export async function getStaticProps({ locale }) {
  return { props: { sections: await getNosaltres(locale) }, revalidate: REVALIDATE_SECONDS };
}

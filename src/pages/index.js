import styles from "@/styles/Home.module.css";
import Image from "next/image";
import Link from "next/link";
import Footer from "../../components/Footer";
import HomeCarousel from "../../components/HomeCarousel";
import Navbar from "../../components/Navbar";
import Reason from "../../components/Reason";
import Seo from "../../components/Seo";
import { useContext } from "react";
import LanguageContext from "@/store/language/context/LanguageContext";
import cloudinaryLoader from "@/lib/cloudinary";
import { REVALIDATE_SECONDS } from "@/lib/config";
import { getHome } from "@/lib/content";

export default function Inici({ carousel, reasons, projects }) {
  const { t } = useContext(LanguageContext);

  return (
    <>
      <Seo title="Innovafaçanes" description={t("metaDescription")} />
      <>
        <Navbar></Navbar>
        <main className={styles.main}>
          <section className={styles.homeHeader}>
            <div className={styles.headerTitleWrapper}>
              <h1>
                <span>{t("headerCarousel1")}</span>
                <span>{t("headerCarousel2")}</span>
                <span>{t("headerCarousel3")}</span>
              </h1>
            </div>
            <HomeCarousel carousel={carousel}></HomeCarousel>
          </section>
          <section className={styles.homeReasons}>
            <div className={styles.sectionTitleWrapper}>
              <div>
                <h2 className={styles.sectionTitle}>{t("whyUs")}</h2>
              </div>
              <div className={styles.actionWrapper}>
                <Link href="/nosaltres" rel="noopener noreferrer">
                  <div className={styles.moreInfo}>{t("moreInfo")}</div>
                </Link>
                <Link href="/nosaltres" rel="noopener noreferrer">
                  <Image
                    src="\arrow_right_black.svg"
                    alt="more info"
                    width={40}
                    height={20}
                  ></Image>
                </Link>
              </div>
            </div>
            <div className={styles.reasonsWrapper}>
              {reasons.map(({ title, description }, index) => (
                <Reason key={index} number={index} reasonTitle={title} reasonDesc={description} />
              ))}
            </div>
          </section>
          <section className={styles.homePortfolio}>
            <div className={styles.sectionTitleWrapper}>
              <div>
                <h2 className={styles.sectionTitle}>{t("projects")}</h2>
              </div>
              <div className={styles.actionWrapper}>
                <Link href="/projectes" rel="noopener noreferrer">
                  <div className={styles.moreInfo}>{t("moreInfo")}</div>
                </Link>
                <Link href="/projectes" rel="noopener noreferrer">
                  <Image
                    src="\arrow_right_black.svg"
                    alt="more info"
                    width={40}
                    height={20}
                  ></Image>
                </Link>
              </div>
            </div>
            <div className={styles.container}>
              {projects.map((project, index) => (
                <div className={styles[`box${index}`]} key={project.id}>
                  <Link href="/projectes" rel="noopener noreferrer">
                    {project.images[0] && (
                      <Image
                        className={styles.projectImg}
                        loader={cloudinaryLoader}
                        src={project.images[0].url}
                        alt={project.images[0].alt}
                        fill={true}
                        style={{ objectFit: "cover" }}
                      />
                    )}
                    <h2 className={styles.projectTitle}>{project.title}</h2>
                  </Link>
                </div>
              ))}
            </div>
          </section>
          <Footer></Footer>
        </main>
      </>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return { props: await getHome(locale), revalidate: REVALIDATE_SECONDS };
}

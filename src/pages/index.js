import styles from "@/styles/Home.module.css";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Footer from "../../components/Footer";
import HomeCarousel from "../../components/HomeCarousel";
import Navbar from "../../components/Navbar";
import Reason from "../../components/Reason";
import useStrapiApi from "./api/fetching";
import { useContext, useEffect, useState } from "react";
import LanguageContext from "@/store/language/context/LanguageContext";

export default function Inici() {
  const { fetchHome } = useStrapiApi();
  const [info, setInfo] = useState({
    carousel: [],
    reasons: [],
    projects: [],
  });

  const { language, t } = useContext(LanguageContext);

  useEffect(() => {
    (async () => {
      const {
        props: { carousel, projects, reasons },
      } = await fetchHome(language);

      setInfo({
        carousel: carousel,
        reasons: reasons,
        projects: projects,
      });
    })();
  }, [fetchHome, language]);

  return (
    <>
      <Head>
        <title>Innovafaçanes</title>
        <meta
          name="description"
          content="A Innovafaçanes construim, reformem i restaurem façanes de tot tipus i oferim solucions integrals als teus projectes"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="icon" href="/favicon.ico" />
      </Head>
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
            <HomeCarousel carousel={info.carousel}></HomeCarousel>
            {/* <Image src={`${STRAPI_BASE_URL}${carousel[0].url}`} alt={`${carousel[0].alt}`}></Image> */}
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
              {info.reasons.map(({ reasonTitle, reasonDesc }, index) => (
                <Reason
                  key={index}
                  number={index}
                  reasonTitle={reasonTitle}
                  reasonDesc={reasonDesc}
                />
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
              {info.projects.map((project, index) => {
                return index < 6 ? (
                  <div className={styles[`box${index}`]} key={index}>
                    <Link href="/projectes" rel="noopener noreferrer">
                      <Image
                        className={styles.projectImg}
                        src={`${project.images.data[0].attributes.url}`}
                        alt={project.images.data[0].attributes.alternativeText}
                        fill={true}
                        style={{ objectFit: "cover" }}
                      />
                      <h2 className={styles.projectTitle}>{project.title}</h2>
                    </Link>
                  </div>
                ) : (
                  <></>
                );
              })}
            </div>
          </section>
          <Footer></Footer>
        </main>
      </>
    </>
  );
}

// export async function getStaticProps() {
//   return fetchHome("ca");
// }

import styles from "@/styles/Home.module.css";
import { Inter } from "next/font/google";
import Head from "next/head";
import Image from 'next/image';
import Link from "next/link";
import FooterEn from "../../../components/FooterEn";
import NavbarEn from "../../../components/NavbarEn";
import Reason from "../../../components/Reason";
import HomeCarousel from "../../components/HomeCarousel";
import { fetchHome } from "./api/fetching";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ carousel, reasons, projects }) {
  // 2 objects in JavaScript are equal only if they reference exactly the same object.
  return (
    <>
      <Head>
        <title>Innovafaçanes</title>
        <meta name="description" content="Innovafaçanes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <NavbarEn></NavbarEn>
        <main className={styles.main}>
          <section className={styles.homeHeader}>
            <div className={styles.headerTitleWrapper}>
              <h1>Different systems.</h1>
              <h1>Complete Solutions.</h1>
              <h1>Best quality.</h1>
            </div>
            <HomeCarousel carousel={carousel}></HomeCarousel>
            {/* <Image src={`${STRAPI_BASE_URL}${carousel[0].url}`} alt={`${carousel[0].alt}`}></Image> */}
          </section>
          <section className={styles.homeReasons}>
            <div className={styles.sectionTitleWrapper}>
              <div>
                <h2 className={styles.sectionTitle}>Why us?</h2>
              </div>
              <div className={styles.actionWrapper}>
              <Link href="/about" rel="noopener noreferrer"><div className={styles.moreInfo}>MORE INFORMATION</div></Link>
                <Link href="/about" rel="noopener noreferrer">
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
              {reasons.map(({ reasonTitle, reasonDesc }, index) => (
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
                <h2 className={styles.sectionTitle}>Projects</h2>
              </div>
              <div className={styles.actionWrapper}>
              <Link href="/projects" rel="noopener noreferrer"><div className={styles.moreInfo}>MORE INFORMATION</div></Link>
                <Link href="/projects" rel="noopener noreferrer">
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
              {projects.map((project, index) =>  {
                return (
                  index < 6 ? 
                  
                <div className={styles[`box${index}`]} key={index}>
                <Link href="/projects" rel="noopener noreferrer">
                <Image
                  className={styles.projectImg}
                  src={`${project.images.data[0].attributes.url}`}
                  alt={project.images.data[0].attributes.alternativeText}
                  fill={true}
                  style={{objectFit:'cover'}}
                />
                 <h2 className={styles.projectTitle}>{project.title}</h2>
                 </Link>
                </div>
            : <></>
              )})}
            </div>
          </section>
          <FooterEn></FooterEn>
        </main>
      </>
    </>
  );
}

export async function getStaticProps() {
  return fetchHome('en');
}

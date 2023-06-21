import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Navbar from "../../components/Navbar";
import HomeCarousel from "../../components/HomeCarousel";
import { useEffect, useState } from "react";
import { getCarouselPaths, getReasons } from "../model/getHomeData";
import Reason from "../../components/Reason";
import Footer from "../../components/Footer";
import { fetchHome } from "./api/fetching";
import Link from "next/link";
import Image  from 'next/image';

const inter = Inter({ subsets: ["latin"] });

export default function Home({ carousel, reasons }) {
  // 2 objects in JavaScript are equal only if they reference exactly the same object.
  console.log(carousel, reasons);
  return (
    <>
      <Head>
        <title>Innovafaçanes</title>
        <meta name="description" content="Innovafaçanes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <Navbar></Navbar>
        <main className={styles.main}>
          <section className={styles.homeHeader}>
            <HomeCarousel carousel={carousel}></HomeCarousel>
            {/* <Image src={`${STRAPI_BASE_URL}${carousel[0].url}`} alt={`${carousel[0].alt}`}></Image> */}
          </section>
          <section className={styles.homeReasons}>
            <div className={styles.sectionTitleWrapper}>
              <div>
                <h2 className={styles.sectionTitle}>Per què nosaltres?</h2>
              </div>
              <div className={styles.actionWrapper}>
              <Link href="/nosaltres" rel="noopener noreferrer"><div className={styles.moreInfo}>MÉS INFORMACIÓ</div></Link>
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
                <h2 className={styles.sectionTitle}>Projectes</h2>
              </div>
              <div className={styles.actionWrapper}>
              <Link href="/projectes" rel="noopener noreferrer"><div className={styles.moreInfo}>MÉS INFORMACIÓ</div></Link>
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
              <div className={styles.one}></div>
              <div className={styles.two}></div>
              <div className={styles.three}></div>
              <div className={styles.four}></div>
              <div className={styles.five}></div>
              <div className={styles.six}></div>
              <div className={styles.seven}></div>
            </div>
          </section>
          <Footer></Footer>
        </main>
      </>
    </>
  );
}

export async function getStaticProps() {
  return fetchHome();
}

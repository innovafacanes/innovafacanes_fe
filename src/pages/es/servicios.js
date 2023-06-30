import styles from "@/styles/Serveis.module.css";
import FooterEs from "../../../components/FooterEs";
import NavbarEs from "../../../components/NavbarEs";
import { fetchServeis } from "../api/fetching";
import Link from "next/link";
import Image from "next/image";

export default function Servicios({ serveis }) {
  return (
    <>
      <NavbarEs />
      <div className={styles.main}>
      <div className={styles.sectionTitleWrapper}>
              <div>
              <h1 className={styles.mainTitle}>QUÉ OFRECEMOS?</h1>
              </div>
              <div className={styles.actionWrapper}>
              <Link href="/nosotros" rel="noopener noreferrer"><div className={styles.moreInfo}>MÉS INFORMACIÓ</div></Link>
                <Link href="/nosotros" rel="noopener noreferrer">
                  <Image
                    src="\arrow_right_black.svg"
                    alt="more info"
                    width={40}
                    height={20}

                  ></Image>
                </Link>
              </div>
            </div>
        
        <div className={styles.servicesWrapper}>
          {serveis.map(({ serviceTitle, serviceDesc }, index) => (
            <div key={index} className={styles.serviceWrapper}>
              <h2 className={styles.serviceTitle}>{serviceTitle}</h2>
              <p className={styles.serviceDesc}>{serviceDesc}</p>
            </div>
          ))}
        </div>
      </div>
      <FooterEs />
    </>
  );
}

export async function getStaticProps() {
  return fetchServeis("es");
}

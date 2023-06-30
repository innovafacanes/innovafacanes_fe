import styles from "@/styles/Serveis.module.css";
import FooterEn from "../../components/FooterEn";
import NavbarEn from "../../components/NavbarEn";
import { fetchServeis } from "./api/fetching";

export default function Serveis({ serveis }) {
  return (
    <>
      <NavbarEn />
      <div className={styles.main}>
        <h1 className={styles.mainTitle}>WHAT WE OFFER?</h1>
        <div className={styles.servicesWrapper}>
          {serveis.map(({ serviceTitle, serviceDesc }, index) => (
            <div key={index} className={styles.serviceWrapper}>
              <h2 className={styles.serviceTitle}>{serviceTitle}</h2>
              <p className={styles.serviceDesc}>{serviceDesc}</p>
            </div>
          ))}
        </div>
      </div>
      <FooterEn />
    </>
  );
}

export async function getStaticProps() {
  return fetchServeis("en");
}

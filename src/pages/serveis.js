import styles from "@/styles/Serveis.module.css";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { fetchServeis } from "./api/fetching";

export default function Serveis({ serveis }) {
  return (
    <>
      <Navbar />
      <div className={styles.main}>
        <h1 className={styles.mainTitle}>QUÈ OFERIM?</h1>
        <div className={styles.servicesWrapper}>
          {serveis.map(({ serviceTitle, serviceDesc }, index) => (
            <div key={index} className={styles.serviceWrapper}>
              <h2 className={styles.serviceTitle}>{serviceTitle}</h2>
              <p className={styles.serviceDesc}>{serviceDesc}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  return fetchServeis("ca");
}

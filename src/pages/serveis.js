import LanguageContext from "@/store/language/context/LanguageContext";
import styles from "@/styles/Serveis.module.css";
import { useContext } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Seo from "../../components/Seo";
import { REVALIDATE_SECONDS } from "@/lib/config";
import { getServeis } from "@/lib/content";

export default function Serveis({ services }) {
  const { t } = useContext(LanguageContext);

  return (
    <>
      <Seo title={`${t("services")} | Innovafaçanes`} />
      <Navbar />
      <div className={styles.main}>
        <h1 className={styles.mainTitle}>{t("whatWeOffer")}</h1>
        <div className={styles.servicesWrapper}>
          {services.map(({ title, description }, index) => (
            <div key={index} className={styles.serviceWrapper}>
              <h2 className={styles.serviceTitle}>{title}</h2>
              <p className={styles.serviceDesc} dangerouslySetInnerHTML={{ __html: description }} />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export async function getStaticProps({ locale }) {
  return { props: { services: await getServeis(locale) }, revalidate: REVALIDATE_SECONDS };
}

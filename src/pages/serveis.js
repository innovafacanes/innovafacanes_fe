import LanguageContext from "@/store/language/context/LanguageContext";
import styles from "@/styles/Serveis.module.css";
import { useContext, useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import useStrapiApi from "./api/fetching";

export default function Serveis() {
  const { language, t } = useContext(LanguageContext);
  const { fetchServeis } = useStrapiApi();
  const [services, setServices] = useState([
    { serviceTitle: "", serviceDesc: "" },
  ]);

  useEffect(() => {
    (async () => {
      const {
        props: { serveis },
      } = await fetchServeis(language);

      setServices(serveis);
    })();
  }, [fetchServeis, language]);

  return (
    <>
      <Navbar />
      <div className={styles.main}>
        <h1 className={styles.mainTitle}>{t("whatWeOffer")}</h1>
        <div className={styles.servicesWrapper}>
          {services.map(({ serviceTitle, serviceDesc }, index) => (
            <div key={index} className={styles.serviceWrapper}>
              <h2 className={styles.serviceTitle}>{serviceTitle}</h2>
              <p
                className={styles.serviceDesc}
                dangerouslySetInnerHTML={{ __html: serviceDesc }}
              />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

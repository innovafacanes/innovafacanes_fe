import LanguageContext from "@/store/language/context/LanguageContext";
import styles from "@/styles/Serveis.module.css";
import { useContext, useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import useStrapiApi from "./api/fetching";

const Serveis = () => {
  const { language } = useContext(LanguageContext);
  const { fetchServeis } = useStrapiApi();
  const [title, setTitle] = useState(["Qui som?"]);
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

  useEffect(() => {
    changeTitle(language);
  }, [language]);

  const changeTitle = (language) => {
    if (language === "ca") {
      setTitle(["Què oferim?"]);
    }

    if (language === "es") {
      setTitle(["¿Qué ofrecemos?"]);
    }

    if (language === "en") {
      setTitle(["Our services"]);
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.main}>
        <h1 className={styles.mainTitle}>{title}</h1>
        <div className={styles.servicesWrapper}>
          {services.map(({ serviceTitle, serviceDesc }, index) => (
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
};

export default Serveis;

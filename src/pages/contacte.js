import styles from "@/styles/Contacte.module.css";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import useStrapiApi, { fetchContacte } from "./api/fetching";
import LanguageContext from "@/store/language/context/LanguageContext";
import { Resend } from "resend";

const apiBaseUrl = process.env.NEXT_PUBLIC_STRAPI_BASE_URL;
//const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);
//const MY_EMAIL = process.env.NEXT_PUBLIC_MY_EMAIL;

const Contacte = () => {
  const { language, t } = useContext(LanguageContext);
  const { fetchContacte } = useStrapiApi();
  const [contact, setContact] = useState([
    { nom: "", direccio: "", tlf: "", mbl: "", email: "" },
  ]);

  useEffect(() => {
    (async () => {
      const {
        props: { contactInfo },
      } = await fetchContacte(language);

      setContact(contactInfo);
    })();
  }, [fetchContacte, language]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      fetch(`${apiBaseUrl}/ezforms/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData: formData }),
      });

      /*const { data } = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: [`${MY_EMAIL}`],
        subject: "Missatge nou",
        react: EmailTemplate({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });*/
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <main className={styles.mainContacte}>
        <div className={styles.firstDiv}>
          <h1 className={styles.contactTitle}>{t("contactUs")}</h1>
          <div className={styles.infoWrapper}>
            <h2 className={styles.infoText}>{contact.nom}</h2>
            <h2 className={styles.infoText}>{contact.direccio}</h2>
            <h2 className={styles.infoText}>{contact.tlf}</h2>
            <h2 className={styles.infoText}>{contact.mbl}</h2>
          </div>
        </div>
        <div className={styles.secondDiv}>
          <div className={styles.formWrapper}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.namemail}>
                <div>
                  <div className={styles.label}>
                    <label htmlFor="name">{t("formName")}:</label>
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className={styles.input}
                    placeholder={t("formName")}
                    value={formData.name}
                    onChange={handleInputChange}
                  ></input>
                </div>
                <div>
                  <div className={styles.label}>
                    <label htmlFor="email">Email:</label>
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={styles.input}
                    placeholder="example@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  ></input>
                </div>
              </div>
              <div className={styles.message}>
                <label htmlFor="message">{t("formText")}:</label>
                <textarea
                  type="text"
                  id="message"
                  name="message"
                  className={styles.messageBox}
                  placeholder={t("formPlaceHolder")}
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <div className={styles.submit}>
                <input
                  className={styles.submitButton}
                  type="submit"
                  value={t("formSend")}
                ></input>
                <Image
                  src="\arrow_right_black.svg"
                  alt="contacta"
                  width={80}
                  height={40}
                ></Image>
              </div>
            </form>
          </div>
          <div className={styles.mapWrapper}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2989.335824684473!2d2.0252504766144623!3d41.47531859053552!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4910827de9d81%3A0x6e16617456a61fb0!2sCarrer%20Praga%2C%2015%2C%2008191%20Rub%C3%AD%2C%20Barcelona!5e0!3m2!1ses!2ses!4v1686241900689!5m2!1ses!2ses"
              width="600"
              height="450"
              className={styles.map}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </main>
      <Footer></Footer>
    </>
  );
};

export default Contacte;

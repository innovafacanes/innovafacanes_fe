import styles from "@/styles/Contacte.module.css";
import Image from "next/image";
import Script from "next/script";
import { useContext, useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Seo from "../../components/Seo";
import LanguageContext from "@/store/language/context/LanguageContext";
import { REVALIDATE_SECONDS } from "@/lib/config";
import { getContact } from "@/lib/content";
import { submitContactForm } from "@/lib/contactForm";

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

const emptyFormData = { name: "", email: "", message: "" };

const Contacte = ({ contact }) => {
  const { t } = useContext(LanguageContext);

  const [formData, setFormData] = useState(emptyFormData);
  const [status, setStatus] = useState("idle");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await submitContactForm({
        formData,
        siteKey: RECAPTCHA_SITE_KEY,
        grecaptcha: typeof window !== "undefined" ? window.grecaptcha : undefined,
      });
      setFormData(emptyFormData);
      setStatus("sent");
    } catch (error) {
      console.log(error);
      setStatus("error");
    }
  };

  return (
    <>
      <Seo title={`${t("contact")} | Innovafaçanes`} />
      {RECAPTCHA_SITE_KEY && (
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`}
          strategy="afterInteractive"
        />
      )}
      <Navbar />
      <main className={styles.mainContacte}>
        <div className={styles.firstDiv}>
          <h1 className={styles.contactTitle}>{t("contactUs")}</h1>
          <div className={styles.infoWrapper}>
            <h2 className={styles.infoText}>{contact.name}</h2>
            <h2 className={styles.infoText}>{contact.address}</h2>
            <h2 className={styles.infoText}>{contact.phone}</h2>
            <h2 className={styles.infoText}>{contact.mobile}</h2>
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
                  disabled={status === "sending"}
                ></input>
                <Image
                  src="\arrow_right_black.svg"
                  alt="contacta"
                  width={80}
                  height={40}
                ></Image>
              </div>
              {status !== "idle" && (
                <p
                  role="status"
                  aria-live="polite"
                  className={`${styles.formStatus} ${status === "error" ? styles.formStatusError : ""}`}
                >
                  {status === "sending" && t("formSending")}
                  {status === "sent" && t("formSent")}
                  {status === "error" && t("formError")}
                </p>
              )}
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

export async function getStaticProps({ locale }) {
  return { props: { contact: await getContact(locale) }, revalidate: REVALIDATE_SECONDS };
}

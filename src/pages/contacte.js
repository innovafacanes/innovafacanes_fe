import React from "react";
import Navbar from "../../components/Navbar";
import styles from "@/styles/Contacte.module.css";
import { fetchContacte } from "./api/fetching";
import Footer from "../../components/Footer";
import Image from "next/image";

const Contacte = (props) => {
  return (
    <>
      <Navbar />
      <main className={styles.mainContacte}>
        <div className={styles.firstDiv}>
          <h1 className={styles.contactTitle}>CONTACTA AMB NOSALTRES</h1>
          <div className={styles.infoWrapper}>
            <h2 className={styles.infoText}>{props.contactInfo.nom}</h2>
            <h2 className={styles.infoText}>{props.contactInfo.direccio}</h2>
            <h2 className={styles.infoText}>{props.contactInfo.tlf}</h2>
            <h2 className={styles.infoText}>{props.contactInfo.mbl}</h2>
          </div>
        </div>
        <div className={styles.secondDiv}>
          <div className={styles.formWrapper}>
            <form className={styles.form}>
              <div className={styles.namemail}>
                <div>
                  <div className={styles.label}>
                    <label for="name">Name:</label>
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className={styles.input}
                    placeholder="Name"
                  ></input>
                </div>
                <div>
                  <div className={styles.label}>
                    <label for="email">Email:</label>
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={styles.input}
                    placeholder="example@example.com"
                  ></input>
                </div>
              </div>
              <div className={styles.message}>
              <label for="message">Text:</label>
              <input
                type="text"
                id="message"
                name="message"
                className={styles.messageBox}
                placeholder="Text"
              ></input>
              </div>
              <div className={styles.submit}>
              <input
                className={styles.submitButton}
                type="submit"
                value="SEND"
                ></input>
                <Image src="\arrow_right_black.svg" alt="contacta" width={80} height={40}></Image>
                </div>
            </form>
          </div>
          <div className={styles.mapWrapper}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2989.335824684473!2d2.0252504766144623!3d41.47531859053552!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4910827de9d81%3A0x6e16617456a61fb0!2sCarrer%20Praga%2C%2015%2C%2008191%20Rub%C3%AD%2C%20Barcelona!5e0!3m2!1ses!2ses!4v1686241900689!5m2!1ses!2ses"
              width="600"
              height="450"
              className={styles.map}
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </main>
      <Footer></Footer>
    </>
  );
};

export default Contacte;

export async function getStaticProps() {
  return fetchContacte();
}

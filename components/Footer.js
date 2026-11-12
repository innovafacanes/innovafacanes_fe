import LanguageContext from "@/store/language/context/LanguageContext";
import styles from "@/styles/Footer.module.css";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";

const CONTACT_TITLE = {
  ca: "Contacta amb nosaltres",
  es: "Contacta con nosotros",
  en: "Contact with us",
};

export default function Footer() {
  const { language } = useContext(LanguageContext);
  const contact = CONTACT_TITLE[language];

  return (
    <div className={styles.footerWrapper}>
      <div className={styles.footerActionWrapper}>
        <div className={styles.actionWrapper}>
          <Link href="/contacte" rel="noopener noreferrer">
            <h2 className={styles.footerAction}>{contact}</h2>
          </Link>
          <Link href="/contacte" rel="noopener noreferrer">
            <Image
              src="\arrow_right.svg"
              alt="contacta"
              width={80}
              height={40}
              className={styles.arrow}
            ></Image>
          </Link>
        </div>
      </div>
      <div className={styles.footerInfo}>
        <div className={styles.rightInfo}>
          <span>INNOVA FAÇANES S.L.</span>
          <span>C/Praga 15, 08191 Rubí</span>
          <span>Tlf: +34 93 713 67 03</span>
          <span>innovafacanes@innovafacanes.cat</span>
          <div className={styles.socialMedia}>
            <a href="https://www.instagram.com/innova_facanes/" target="_blank">
              <Image
                src="\instagram.svg"
                alt="instagram"
                width={40}
                height={40}
              ></Image>
            </a>
            <a
              href="https://www.linkedin.com/company/innova-facanes/"
              target="_blank"
            >
              <Image
                src="\linkedin.svg"
                alt="linkedin"
                width={40}
                height={40}
              ></Image>
            </a>
          </div>
        </div>
      </div>
      <div className={styles.footerMe}>
        <div className={styles.leftMe}>COPYRIGHT © 2023. INNOVA FAÇANES</div>
        <div className={styles.rightMe}>developed by @eudaldmoya</div>
      </div>
    </div>
  );
}

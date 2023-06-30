import styles from "@/styles/Footer.module.css";
import  Image  from 'next/image';
import Link from "next/link";

export default function FooterEn(props) {
  return (
    <div className={styles.footerWrapper}>
      <div className={styles.footerActionWrapper}>
        <div className={styles.actionWrapper}>
        <Link href="/contact" rel="noopener noreferrer"><h2 className={styles.footerAction}>CONTACT US</h2></Link>
        <Link href="/contact" rel="noopener noreferrer"><Image src="\arrow_right.svg" alt="contacta" width={80} height={40} className={styles.arrow}></Image></Link>
        </div>
      </div>
      <div className={styles.footerInfo}>
        <div className={styles.leftInfo}>
          <span>LEGAL WARNING</span>
          <span>COOKIES POLICY</span>
        </div>
        <div className={styles.rightInfo}>
          <span>INNOVA FAÇANES S.L.</span>
          <span>C/Praga 15, 08191 Rubí</span>
          <span>Tlf: +34 93 713 67 03</span>
          <span>innovafacanes@innovafacanes.cat</span>
          <div className={styles.socialMedia}>
            <a href="https://www.instagram.com/innova_facanes/"><Image src="\instagram.svg" alt="instagram" width={40} height={40}></Image></a>
            <a href="www.linkedin.com"><Image src="\linkedin.svg" alt="linkedin" width={40} height={40}></Image></a>
          </div>
        </div>
      </div>
      <div className={styles.footerMe}>
        <div className={styles.leftMe}>
        COPYRIGHT © 2023. INNOVA FAÇANES 
        </div>
        <div className={styles.rightMe}>
          developed by @eudaldmoya
        </div>
      </div>
    </div>
  );
}

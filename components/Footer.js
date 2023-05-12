import styles from "@/styles/Footer.module.css";
import  Image  from 'next/image';
import Link from "next/link";

export default function Footer(props) {
  return (
    <div className={styles.footerWrapper}>
      <div className={styles.footerActionWrapper}>
        <div className={styles.actionWrapper}>
        <Link href="/contacte" rel="noopener noreferrer"><h2 className={styles.footerAction}>CONTACTA AMB NOSALTRES</h2></Link>
        <Link href="/contacte" rel="noopener noreferrer"><Image src="\arrow_right.svg" alt="contacta" width={80} height={40}></Image></Link>
        </div>
      </div>
      <div className={styles.footerInfo}>
        <div className={styles.leftInfo}>
          <span>AVÍS LEGAL</span>
          <span>POLÍTICA DE COOKIES</span>
        </div>
        <div className={styles.rightInfo}>
          <span>INNOVA FAÇANES S.L.</span>
          <span>C/Praga 15, 08191 Rubí</span>
          <span>Tlf: +34 93 713 67 03</span>
          <span>innovafacanes@innovafacanes.cat</span>
          <div className={styles.socialMedia}>
            <a href="www.linkedin.com"><Image src="\instagram.svg" alt="instagram" width={40} height={40}></Image></a>
            <a href="www.linkedin.com"><Image src="\linkedin.svg" alt="linkedin" width={40} height={40}></Image></a>
          </div>
        </div>
      </div>
      <div className={styles.footerMe}>
        <div className={styles.leftMe}>
        COPYRIGHT © 2021. INNOVA FAÇANES 
        </div>
        <div className={styles.rightMe}>
          developed by @eudaldmoya
        </div>
      </div>
    </div>
  );
}

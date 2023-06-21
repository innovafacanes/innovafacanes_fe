import styles from "@/styles/Navbar.module.css";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className={styles.navWrapper}>
      <div className={styles.navLogo}>
        <Link href="/" rel="noopener noreferrer">
          <Image
            src="/iflogo_negro.png"
            alt="InnovaFaçanes logo"
            width={240}
            height={40}
            className={styles.logo}
          ></Image>
        </Link>
      </div>
      <nav>
        <div className={styles.navTagsWrapper}>
          <div className={styles.navItems}>
            <Link href="/serveis" rel="noopener noreferrer">
              Serveis
            </Link>
          </div>
          <div className={styles.navItems}>
            <Link href="/projectes" rel="noopener noreferrer">
              Projectes
            </Link>
          </div>
          <div className={styles.navItems}>
            <Link href="/nosaltres" rel="noopener noreferrer">
              Nosaltres
            </Link>
          </div>
          <div className={styles.navItems}>
            <Link href="/contacte" rel="noopener noreferrer">
              Contacte
            </Link>
          </div>
          <form>
          <select id="country" name="country">
            <option value="au">Català</option>
            <option value="ca">Castellà</option>
            <option value="usa">Anglès</option>
          </select>
        </form>
        </div>
        
      </nav>
    </div>
  );
}

import styles from "@/styles/Navbar.module.css";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className={styles.navWrapper}>
      <nav>
        <div className={styles.navTagsWrapper}>
          <div className={styles.navItems}>
          <Link href="/serveis"  rel="noopener noreferrer">
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
          
        </div>
      </nav>
    </div>
  );
}

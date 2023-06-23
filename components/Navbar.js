import styles from "@/styles/Navbar.module.css";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [mobileMenuState, setMobileMenuState] = useState(false);

  const handleMobileMenu = () => {
    setMobileMenuState((mobileMenuState) => !mobileMenuState);
    console.log(mobileMenuState);
  };

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
      <nav className={styles.nav}>
        <div className={styles.burger} onClick={handleMobileMenu}>
          <Image src="\menu.svg" alt="burger-menu" width={40} height={40} />
        </div>
        <div className={styles.navTagsWrapper}>
          <Link href="/serveis" rel="noopener noreferrer">
            <div className={styles.navItems}>Serveis</div>
          </Link>
          <Link href="/projectes" rel="noopener noreferrer">
            <div className={styles.navItems}>Projectes</div>
          </Link>
          <Link href="/nosaltres" rel="noopener noreferrer">
            <div className={styles.navItems}>Nosaltres</div>
          </Link>
          <Link href="/contacte" rel="noopener noreferrer">
            <div className={styles.navItems}>Contacte</div>
          </Link>
          <form className={styles.langForm}>
            <select id="country" name="country">
              <option value="au">Català</option>
              <option value="ca">Castellà</option>
              <option value="usa">Anglès</option>
            </select>
          </form>
        </div>
      </nav>
      {mobileMenuState ? (
        <div className={styles.mobileMenu}>
          <div className={styles.menuTagsWrapper}>
          <Link href="/serveis" rel="noopener noreferrer">
            <div className={styles.menuItems}>Serveis</div>
          </Link>
          <Link href="/projectes" rel="noopener noreferrer">
            <div className={styles.menuItems}>Projectes</div>
          </Link>
          <Link href="/nosaltres" rel="noopener noreferrer">
            <div className={styles.menuItems}>Nosaltres</div>
          </Link>
          <Link href="/contacte" rel="noopener noreferrer">
            <div className={styles.menuItems}>Contacte</div>
          </Link>
          <form className={styles.langForm}>
            <select id="country" name="country">
              <option value="au">Català</option>
              <option value="ca">Castellà</option>
              <option value="usa">Anglès</option>
            </select>
          </form>
        </div>
          <div onClick={handleMobileMenu} className={styles.close}><Image src="\close.svg" alt="burger-menu" width={40} height={40} /></div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

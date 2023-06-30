import styles from "@/styles/Navbar.module.css";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function NavbarEn() {
  const [mobileMenuState, setMobileMenuState] = useState(false);

  const handleMobileMenu = () => {
    setMobileMenuState((mobileMenuState) => !mobileMenuState);
  };

  return (
    <div className={styles.navWrapper}>
      <div className={styles.navLogo}>
        <Link href="/en/home" rel="noopener noreferrer">
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
          <Link href="/en/services" rel="noopener noreferrer">
            <div className={styles.navItems}>Services</div>
          </Link>
          <Link href="/en/projects" rel="noopener noreferrer">
            <div className={styles.navItems}>Projects</div>
          </Link>
          <Link href="/en/about" rel="noopener noreferrer">
            <div className={styles.navItems}>About us</div>
          </Link>
          <Link href="/en/contact" rel="noopener noreferrer">
            <div className={styles.navItems}>Contact</div>
          </Link>
          <div className={styles.langWrapper}>
          <Link href="/" locale='ca' rel="noopener noreferrer"><Image src="\ca.svg" alt="burger-menu" width={20} height={15} /></Link>
          <Link href="/" locale='es' rel="noopener noreferrer"><Image src="\es.svg" alt="burger-menu" width={20} height={15} /></Link>
          <Image src="\en.svg" alt="burger-menu" width={20} height={15} />
          </div> 
        </div>
      </nav>
      {mobileMenuState ? (
        <div className={styles.mobileMenu}>
          <div className={styles.menuTagsWrapper}>
          <Link href="/en/services" rel="noopener noreferrer">
            <div className={styles.menuItems}>Services</div>
          </Link>
          <Link href="/en/projects" rel="noopener noreferrer">
            <div className={styles.menuItems}>Projects</div>
          </Link>
          <Link href="/en/about" rel="noopener noreferrer">
            <div className={styles.menuItems}>About us</div>
          </Link>
          <Link href="/en/contact" rel="noopener noreferrer">
            <div className={styles.menuItems}>Contact</div>
          </Link>
          <form className={styles.langForm}>
            <select id="country" name="country">
              <option value="au">Catalan</option>
              <option value="ca">Spanish</option>
              <option value="usa">English</option>
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

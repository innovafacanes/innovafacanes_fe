import styles from "@/styles/Navbar.module.css";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [mobileMenuState, setMobileMenuState] = useState(false);

  const handleMobileMenu = () => {
    setMobileMenuState((mobileMenuState) => !mobileMenuState);
  };

  return (
    <div className={styles.navWrapper}>
      <div className={styles.navLogo}>
        <Link href="/es/home" rel="noopener noreferrer">
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
          <Link href="/es/servicios" rel="noopener noreferrer">
            <div className={styles.navItems}>Servicios</div>
          </Link>
          <Link href="/es/proyectos" rel="noopener noreferrer">
            <div className={styles.navItems}>Proyectos</div>
          </Link>
          <Link href="/es/nosotros" rel="noopener noreferrer">
            <div className={styles.navItems}>Nosotros</div>
          </Link>
          <Link href="/contacto" rel="noopener noreferrer">
            <div className={styles.navItems}>Contacto</div>
          </Link>
          <form className={styles.langForm}>
            <select id="country" name="country">
            <option value="ca"><Link href="/">Catalán</Link></option>
              <option value="es"><Link href="/es/home">Castellano</Link></option>
              <option value="en"><Link href="/en/home">Inglés</Link></option>
            </select>
          </form>
        </div>
      </nav>
      {mobileMenuState ? (
        <div className={styles.mobileMenu}>
          <div className={styles.menuTagsWrapper}>
          <Link href="/es/servicios" rel="noopener noreferrer">
            <div className={styles.menuItems}>Servicios</div>
          </Link>
          <Link href="/es/proyectos" rel="noopener noreferrer">
            <div className={styles.menuItems}>Proyectos</div>
          </Link>
          <Link href="/es/nosotros" rel="noopener noreferrer">
            <div className={styles.menuItems}>Nosotros</div>
          </Link>
          <Link href="/es/contacto" rel="noopener noreferrer">
            <div className={styles.menuItems}>Contacto</div>
          </Link>
          <form className={styles.langForm}>
            <select id="country" name="country">
              <option value="au">Catalán</option>
              <option value="ca">Castellano</option>
              <option value="usa">Inglés</option>
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

import LanguageContext from "@/store/language/context/LanguageContext";
import styles from "@/styles/Navbar.module.css";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

export default function Navbar() {
  const [mobileMenuState, setMobileMenuState] = useState(false);
  const [navWords, setNavWords] = useState([
    "Serveis",
    "Projectes",
    "Nosaltres",
    "Contacte",
  ]);
  const { setChosenLanguage, language } = useContext(LanguageContext);

  useEffect(() => {
    navWord(language);
  }, [language]);

  const navWord = (language) => {
    if (language === "ca") {
      setNavWords(["Serveis", "Projectes", "Nosaltres", "Contacte"]);
    }
    if (language === "es") {
      setNavWords(["Servicios", "Proyectos", "Nosotros", "Contacto"]);
    }
    if (language === "en") {
      setNavWords(["Services", "Projects", "About us", "Contact"]);
    }
  };

  const handleMobileMenu = () => {
    setMobileMenuState((mobileMenuState) => !mobileMenuState);
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
            <div className={styles.navItems}>{navWords[0]}</div>
          </Link>
          <Link href="/projectes" rel="noopener noreferrer">
            <div className={styles.navItems}>{navWords[1]}</div>
          </Link>
          <Link href="/nosaltres" rel="noopener noreferrer">
            <div className={styles.navItems}>{navWords[2]}</div>
          </Link>
          <Link href="/contacte" rel="noopener noreferrer">
            <div className={styles.navItems}>{navWords[3]}</div>
          </Link>
          <div className={styles.langWrapper}>
            <button onClick={() => setChosenLanguage("ca")}>
              <Image src="\ca.svg" alt="burger-menu" width={20} height={15} />
            </button>
            <button onClick={() => setChosenLanguage("es")}>
              <Image src="\es.svg" alt="burger-menu" width={20} height={15} />
            </button>
            <button onClick={() => setChosenLanguage("en")}>
              <Image src="\en.svg" alt="burger-menu" width={20} height={15} />
            </button>
          </div>
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
            <div className={styles.langWrapper}>
              <button onClick={() => setChosenLanguage("ca")}>
                <Image src="\ca.svg" alt="burger-menu" width={20} height={15} />
              </button>
              <button onClick={() => setChosenLanguage("es")}>
                <Image src="\es.svg" alt="burger-menu" width={20} height={15} />
              </button>
              <button onClick={() => setChosenLanguage("en")}>
                <Image src="\en.svg" alt="burger-menu" width={20} height={15} />
              </button>
            </div>
          </div>
          <div onClick={handleMobileMenu} className={styles.close}>
            <Image src="\close.svg" alt="burger-menu" width={40} height={40} />
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

import LanguageContext from "@/store/language/context/LanguageContext";
import styles from "@/styles/Navbar.module.css";
import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";

const NAV_WORDS = {
  ca: ["Serveis", "Projectes", "Nosaltres", "Contacte"],
  es: ["Servicios", "Proyectos", "Nosotros", "Contacto"],
  en: ["Services", "Projects", "About us", "Contact"],
};

export default function Navbar() {
  const [mobileMenuState, setMobileMenuState] = useState(false);
  const { setChosenLanguage, language } = useContext(LanguageContext);
  const navWords = NAV_WORDS[language];

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
              <Image src="\ca.svg" alt="Català" width={20} height={15} />
            </button>
            <button onClick={() => setChosenLanguage("es")}>
              <Image src="\es.svg" alt="Español" width={20} height={15} />
            </button>
            <button onClick={() => setChosenLanguage("en")}>
              <Image src="\en.svg" alt="English" width={20} height={15} />
            </button>
          </div>
        </div>
      </nav>
      {mobileMenuState ? (
        <div className={styles.mobileMenu}>
          <div className={styles.menuTagsWrapper}>
            <Link href="/serveis" rel="noopener noreferrer">
              <div className={styles.menuItems}>{navWords[0]}</div>
            </Link>
            <Link href="/projectes" rel="noopener noreferrer">
              <div className={styles.menuItems}>{navWords[1]}</div>
            </Link>
            <Link href="/nosaltres" rel="noopener noreferrer">
              <div className={styles.menuItems}>{navWords[2]}</div>
            </Link>
            <Link href="/contacte" rel="noopener noreferrer">
              <div className={styles.menuItems}>{navWords[3]}</div>
            </Link>
            <div className={styles.langWrapper}>
              <button onClick={() => setChosenLanguage("ca")}>
                <Image src="\ca.svg" alt="Català" width={20} height={15} />
              </button>
              <button onClick={() => setChosenLanguage("es")}>
                <Image src="\es.svg" alt="Español" width={20} height={15} />
              </button>
              <button onClick={() => setChosenLanguage("en")}>
                <Image src="\en.svg" alt="English" width={20} height={15} />
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

import LanguageContextProvider from "@/store/language/context/LanguageContextProvider";
import "@/styles/globals.css";
import { appWithTranslation } from "next-i18next";

function App({ Component, pageProps }) {
  return (
    <LanguageContextProvider>
      <Component {...pageProps} />
    </LanguageContextProvider>
  );
}

export default appWithTranslation(App);

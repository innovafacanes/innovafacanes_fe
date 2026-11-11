import LanguageContextProvider from "@/store/language/context/LanguageContextProvider";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <LanguageContextProvider>
      <Component {...pageProps} />
    </LanguageContextProvider>
  );
}

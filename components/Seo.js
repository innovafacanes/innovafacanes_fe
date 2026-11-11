import Head from "next/head";
import { useRouter } from "next/router";
import { DEFAULT_LOCALE, LOCALES } from "@/lib/config";
import { localizedUrl } from "@/lib/urls";

export default function Seo({ title, description }) {
  const { locale, asPath } = useRouter();
  // asPath has no locale prefix in the pages router; drop ?p= and #hash.
  const path = asPath.split(/[?#]/)[0];

  return (
    <Head>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="canonical" href={localizedUrl(locale, path)} />
      {LOCALES.map((lang) => (
        <link key={lang} rel="alternate" hrefLang={lang} href={localizedUrl(lang, path)} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={localizedUrl(DEFAULT_LOCALE, path)} />
    </Head>
  );
}

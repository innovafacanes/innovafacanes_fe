import { getContactInfo } from "@/model/getContactData";
import { getCarouselPaths, getReasons } from "@/model/getHomeData";
import { getNosaltresInfo } from "@/model/getNosaltresData";
import { getProjectData } from "@/model/getProjectData";
import { getServeis } from "@/model/getServeis";

const { STRAPI_BASE_URL } = process.env;

export async function fetchHome(lang) {
  let language = '';
  language = lang;
  const response = await fetch(`${STRAPI_BASE_URL}/home?locale=${language}&populate=*`);
  const json = await response.json();
  const data = json.data;
  const reasons = getReasons(data);
  const carousel = getCarouselPaths(data);
  const response2 = await fetch(`${STRAPI_BASE_URL}/projects?locale=${language}&populate=*`);
  const json2 = await response2.json();
  const data2 = json2.data;
  const projects = getProjectData(data2);

  return {
    props: {
      reasons,
      carousel,
      projects,
    },
  };
}

export async function fetchNosaltres(lang) {
  let language = '';
  language = lang;
  const response = await fetch(`${STRAPI_BASE_URL}/nosaltres?locale=${language}&populate=deep`);
  const json = await response.json();
  const data = json.data;
  const nosaltresInfo = getNosaltresInfo(data);
  return {
    props: {
      nosaltresInfo,
    },
  };
}

export async function fetchContacte(lang) {
  let language = '';
  language = lang;
  const response = await fetch(`${STRAPI_BASE_URL}/contacte?locale=${language}&populate=*`);
  const json = await response.json();
  const data = json.data;
  const contactInfo = getContactInfo(data);
  return {
    props: {
      contactInfo,
    },
  };
}

export async function fetchProjectes(lang) {
  let language = '';
  language = lang;
  const response = await fetch(`${STRAPI_BASE_URL}/projects?locale=${language}&populate=*`);
  const json = await response.json();
  const data = json.data;
  const projects = getProjectData(data);
  return {
    props: {
      projects,
    },
  };
}



export async function fetchServeis(lang) {
  let language = '';
  language = lang;
  const response = await fetch(`${STRAPI_BASE_URL}/servei?locale=${language}&populate=*`);
  const json = await response.json();
  const data = json.data;
  const serveis = getServeis(data);
  return {
    props: {
      serveis
    },
  };
}
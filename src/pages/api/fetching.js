import { getContactInfo } from "@/model/getContactData";
import { getCarouselPaths, getReasons } from "@/model/getHomeData";
import { getNosaltresInfo } from "@/model/getNosaltresData";
import { getProjectData } from "@/model/getProjectData";

const { STRAPI_BASE_URL } = process.env;

export async function fetchHome() {
  const response = await fetch(`${STRAPI_BASE_URL}/home?populate=*`);
  const json = await response.json();
  const data = json.data;
  const reasons = getReasons(data);
  const carousel = getCarouselPaths(data);
  const response2 = await fetch(`${STRAPI_BASE_URL}/projects?populate=*`);
  const json2 = await response2.json();
  const data2 = json2.data;
  const projects = getProjectData(data2);

  console.log(data);
  return {
    props: {
      reasons,
      carousel,
      projects,
    },
  };
}

export async function fetchNosaltres() {
  const response = await fetch(`${STRAPI_BASE_URL}/nosaltres?populate=deep`);
  const json = await response.json();
  const data = json.data;
  const nosaltresInfo = getNosaltresInfo(data);
  return {
    props: {
      nosaltresInfo,
    },
  };
}

export async function fetchContacte() {
  const response = await fetch(`${STRAPI_BASE_URL}/contacte?populate=*`);
  const json = await response.json();
  const data = json.data;
  console.log(data + "eey");
  const contactInfo = getContactInfo(data);
  return {
    props: {
      contactInfo,
    },
  };
}

export async function fetchProjectes() {
  const response = await fetch(`${STRAPI_BASE_URL}/projects?populate=*`);
  const json = await response.json();
  const data = json.data;
  const projects = getProjectData(data);
  return {
    props: {
      projects,
    },
  };
}

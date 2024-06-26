import { getContactInfo } from "@/model/getContactData";
import { getCarouselPaths, getReasons } from "@/model/getHomeData";
import { getNosaltresInfo } from "@/model/getNosaltresData";
import { getProjectData } from "@/model/getProjectData";
import { getServeis } from "@/model/getServeis";
import { useCallback } from "react";

const useStrapiApi = () => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_STRAPI_BASE_URL;

  const fetchHome = useCallback(
    async (lang) => {
      let language = "";
      language = lang;
      const response = await fetch(
        `${apiBaseUrl}/home?locale=${language}&populate=*`
      );
      const json = await response.json();
      const data = json.data;
      const reasons = getReasons(data);
      const carousel = getCarouselPaths(data);
      const response2 = await fetch(
        `${apiBaseUrl}/projects?locale=${language}&populate=*`
      );
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
    },
    [apiBaseUrl]
  );

  const fetchNosaltres = useCallback(
    async (lang) => {
      let language = "";
      language = lang;
      const response = await fetch(
        `${apiBaseUrl}/nosaltres?locale=${language}&populate=deep`
      );
      const json = await response.json();
      const data = json.data;
      const nosaltresInfo = getNosaltresInfo(data);

      return {
        props: {
          nosaltresInfo,
        },
      };
    },
    [apiBaseUrl]
  );

  const fetchContacte = useCallback(
    async (lang) => {
      let language = "";
      language = lang;
      const response = await fetch(
        `${apiBaseUrl}/contacte?locale=${language}&populate=*`
      );
      const json = await response.json();
      const data = json.data;
      const contactInfo = getContactInfo(data);
      return {
        props: {
          contactInfo,
        },
      };
    },
    [apiBaseUrl]
  );

  const fetchProjectes = useCallback(
    async (lang) => {
      let language = "";
      language = lang;
      const response = await fetch(
        `${apiBaseUrl}/projects?sort=Date:desc&locale=${language}&populate=*`
      );
      const json = await response.json();
      const data = json.data;
      const projects = getProjectData(data);
      console.log(projects);
      return {
        props: {
          projects,
        },
      };
    },
    [apiBaseUrl]
  );

  const fetchServeis = useCallback(
    async (lang) => {
      let language = "";
      language = lang;
      const response = await fetch(
        `${apiBaseUrl}/servei?locale=${language}&populate=*`
      );
      const json = await response.json();
      const data = json.data;
      const serveis = getServeis(data);
      return {
        props: {
          serveis,
        },
      };
    },
    [apiBaseUrl]
  );

  return {
    fetchHome,
    fetchNosaltres,
    fetchContacte,
    fetchProjectes,
    fetchServeis,
  };
};

export default useStrapiApi;

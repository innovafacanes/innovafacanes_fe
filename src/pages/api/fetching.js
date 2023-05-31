import { getCarouselPaths, getReasons } from "@/model/getHomeData";

const STRAPI_BASE_URL = 'http://91.107.192.77/api/';
//const STRAPI_BASE_URL = `http://127.0.0.1:1337/api/`;




export async function fetchHome() {
    const response = await fetch(`${STRAPI_BASE_URL}home?populate=*`);
    const json = await response.json();
    const data = json.data;
    console.log(data);
    const reasons = getReasons(data);
    const carousel = getCarouselPaths(data);
    return {
        props: {
            reasons,
            carousel,
        }
    }
}

export async function fetchNosaltres() {
    const response = await fetch(`${STRAPI_BASE_URL}nosaltres?populate=*`);
    const json = await response.json();
    const data = json.data;
    console.log(data);
    //const reasons = getReasons(data);
    //const carousel = getCarouselPaths(data);
    return {
        props: {
            
        }
    }
}
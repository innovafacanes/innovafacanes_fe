
export const getCarouselPaths = (props) => {
    
    const pathArray = props.attributes.top_carousel.data;
    const pathList = pathArray.map((img) =>({
      name: img.attributes.name,
      alt: img.attributes.alternativeText,
      url: img.attributes.url,
    }));
    
    return pathList;
  };
  
  

  export const getReasons = (props) => {
    const reasonList = props.attributes.perque_nosaltres.map((rao) =>({
      reasonTitle: rao.titol_rao,
      reasonDesc: rao.descripcio_rao,
    }));
    return reasonList;
  };

  const getHomeData = {
    getCarouselPaths,
    getReasons,
  };

  export default getHomeData;
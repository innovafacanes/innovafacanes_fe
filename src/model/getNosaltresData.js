export const getNosaltresInfo = (props) => {
  const pathArray = props.attributes.tema;
  const list = pathArray.map((section) =>({
    title: section.titol,
    description: section.descripcio,
    image: section.imatge.data.attributes.url,
    alt: section.imatge.data.attributes.alternativeText,
  }));
    
    return list;
  };

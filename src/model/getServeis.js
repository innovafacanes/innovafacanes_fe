export const getServeis = (props) => {
    const serveisList = props.attributes.servei.map((servei) =>({
      serviceTitle: servei.titol_servei,
      serviceDesc: servei.descripcio_servei,
    }));
    return serveisList;
  };
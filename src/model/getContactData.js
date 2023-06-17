export const getContactInfo = (props) => {
    const contactInfo = {
      nom: props.attributes.nom_empresa,
      direccio: props.attributes.direccio_empresa,
      tlf: props.attributes.telefon_empresa,
      mbl: props.attributes.mobil_empresa,
      email: props.attributes.email_empresa,
    };
    
    return contactInfo;
  };
  

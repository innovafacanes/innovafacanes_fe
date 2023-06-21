export const getProjectData = (props) => {
    
    const list = props.map((project, index) =>({
      id: index,
      title: project.attributes.Title,
      description: project.attributes.Description,
      date: project.attributes.Date,
      images: project.attributes.Images,
    }));
      return list;
    };
  
import React from 'react'
import Navbar from '../../components/Navbar';
import { fetchProjectes } from './api/fetching';
import Footer from '../../components/Footer';
import styles from "@/styles/Projectes.module.css";
import Image from 'next/image';
import Popup from 'reactjs-popup';


export default function Projectes({ projects }) {
console.log(projects);
  return (
    <>
    <Navbar/>
    <div className={styles.mainProjectes}>
      <h1>Projectes</h1>
      <div className={styles.projectsWrapper}>
      {projects.map((project, index) => (
        <Popup
        key={index}
        trigger={() => (
          <div key={index} className={styles.projectWrapper}>
          <Image className={styles.projectImg} src={`${project.images.data[0].attributes.url}`} alt={project.images.data[0].attributes.alternativeText} width={450} height={450}/>
          <h2 className={styles.projectTitle}>{project.title}</h2>
        </div>
        )}
        
        closeOnDocumentClick
      >
        <div className={styles.fullScreenPopup}>
        <div className={styles.popupWrapper}>
          <div className={styles.detailImgCarousel}>
          {project.images.data.map((img, index) => (
            <Image key={index} className={styles.projectDetailImg} src={`${img.attributes.url}`} alt={img.attributes.alternativeText} width={600} height={600}/>
          ))}  
          </div> 
          <div className={styles.detailText}>
            <h3 className={styles.detailTitle}>{project.title}</h3>
            <p className={styles.detailDescription}>{project.description}</p>
            </div> 
        </div>
        </div>
      </Popup>
        
      ))}
      </div>
    </div>
    <Footer/>
    </>
  )
}


export async function getStaticProps() {
  return fetchProjectes();
}



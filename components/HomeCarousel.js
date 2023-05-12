import  Image  from 'next/image';
import styles from "@/styles/Home.module.css";

//Quan recarrego la web, perdo els props perque es SSR i es genera un html que després s'envia al client
export default function HomeCarousel (props)  {
  const URL = `http://localhost:1337`;
  console.log(props);
  return (
    <>
    <div></div>
      {
         props.carousel.map(({ url, alt }, index) => (
          //<div key={index}>{`${url}`}</div>
          <Image key={index} className={styles.homeCarouselImg} src={`${url}`} alt={alt} fill/>
         ))
      }
    </>
  )
}
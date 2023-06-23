import  Image  from 'next/image';
import styles from "@/styles/Home.module.css";
import useEmblaCarousel from 'embla-carousel-react';
import { useEffect } from 'react';

//Quan recarrego la web, perdo els props perque es SSR i es genera un html que després s'envia al client
export default function HomeCarousel (props)  {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });

  useEffect(() => {
    if (emblaApi) {
      console.log(emblaApi.slideNodes()) // Access API
    }
  }, [emblaApi])
  
  return (
    <>
    <div className={styles.embla} ref={emblaRef}>
    <div className={styles.emblaContainer}>
      {
         props.carousel.map(({ url, alt }, index) => (
          //<div key={index}>{`${url}`}</div>
          <div className={styles.emblaSlide} key={index}>
          <Image  className={styles.homeCarouselImg} src={`${url}`} alt={alt} fill={true} style={{objectFit:'cover'}}/>
          </div>
         ))
      }
      </div>
      </div>
    </>
  )
}
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useCallback } from "react";

//Quan recarrego la web, perdo els props perque es SSR i es genera un html que després s'envia al client
export default function HomeCarousel(props) {
  const [emblaRef, emblaApi] = useEmblaCarousel();

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <>
      <div className={styles.embla}>
        <div className={styles.emblaViewport} ref={emblaRef}>
          <div className={styles.emblaContainer}>
            {props.carousel.map(({ url, alt }, index) => (
              //<div key={index}>{`${url}`}</div>
              <div className={styles.emblaSlide} key={index}>
                <Image
                  className={styles.homeCarouselImg}
                  src={`${url}`}
                  alt={alt}
                  fill={true}
                  style={{ objectFit: "cover" }}
                />
              </div>
            ))}
          </div>
        </div>
        <button class={styles.emblaPrev} onClick={scrollPrev}>
          <Image
            src="\arrow_right.svg"
            alt="Previous button"
            width={120}
            height={60}
            className={styles.emblaPrevImg}
          />
        </button>
        <button class={styles.emblaNext} onClick={scrollNext}>
          <Image
            src="\arrow_right.svg"
            alt="Previous button"
            width={120}
            height={60}
            className={styles.emblaNextImg}
          />
        </button>
      </div>
    </>
  );
}

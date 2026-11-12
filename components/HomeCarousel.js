import Image from "next/image";
import cloudinaryLoader from "@/lib/cloudinary";
import styles from "@/styles/Home.module.css";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useCallback } from "react";

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
                  loader={cloudinaryLoader}
                  src={`${url}`}
                  alt={alt}
                  fill={true}
                  style={{ objectFit: "cover" }}
                />
              </div>
            ))}
          </div>
        </div>
        <button className={styles.emblaPrev} onClick={scrollPrev}>
          <Image
            src="\arrow_right.svg"
            alt="Previous button"
            width={120}
            height={60}
            className={styles.emblaPrevImg}
          />
        </button>
        <button className={styles.emblaNext} onClick={scrollNext}>
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

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

import "./carousel.styles.css"

const Carousel = () => {
  return (
    <Splide
      options={{
        rewind: true,
        gap: "1rem",
        autoplay: true,
        pauseOnHover: false,
        resetProgress: false,
      }}
      aria-label="My Favorite Images"
    >
      <SplideSlide className=" flex justify-center items-center bg-banner4 bg-cover h-[70vh] bg-no-repeat">
        <h1 className="  text-center  text-3xl font-bold drop-shadow-md tracking-wide uppercase text-white">
          Looking for high quality products ?
        </h1>
      </SplideSlide>
      <SplideSlide className=" bg-banner1 flex justify-center h-[70vh] items-center px-10 md:px-32 bg-cover bg-no-repeat">
        <h1 className=" banner-tex  text-white text-center text-lg   md:text-3xl font-extrabold uppercase">
          
          We have second to none, high quality products. APPEKY STORE is one of
          the best skincare products dealer in the market, we are trusted by
          millions of customers.
        </h1>
      </SplideSlide>
      <SplideSlide className=" bg-banner2 h-[70vh] bg-cover bg-no-repeat"></SplideSlide>
      <SplideSlide className=" bg-banner3 h-[70vh] bg-cover bg-no-repeat"></SplideSlide>
    </Splide>
  );
};

export default Carousel;

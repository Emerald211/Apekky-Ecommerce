import ProductCard from "../product-card/product-card.component";

import { Swiper, SwiperSlide } from "swiper/react";

import { FreeMode } from "swiper";

import "swiper/css";
import "swiper/css/free-mode";

const ProductCollection = () => {
  return (
    <div className="mt-24 relative flex   justify-center items-center px-10 md:px-20">
  
      <Swiper
        freeMode={true}
        grabCursor={true}
        modules={FreeMode}
        className="mySwiper"
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          480: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 15,
          },
          1280: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
        }}
        slidesPerView={5}
        spaceBetween={30}
      >
        <SwiperSlide>
          <ProductCard />
        </SwiperSlide>

        <SwiperSlide>
          <ProductCard />
        </SwiperSlide>

        <SwiperSlide>
          <ProductCard />
        </SwiperSlide>

        <SwiperSlide>
          <ProductCard />
        </SwiperSlide>

        <SwiperSlide>
          <ProductCard />
        </SwiperSlide>

        <SwiperSlide>
          <ProductCard />
        </SwiperSlide>

        <SwiperSlide>
          <ProductCard />
        </SwiperSlide>

        <SwiperSlide>
          <ProductCard />
        </SwiperSlide>

        <SwiperSlide>
          <ProductCard />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default ProductCollection;

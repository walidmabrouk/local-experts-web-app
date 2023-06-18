import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import HomeIMG from "../../assets/media/dentiste.jpg";
import LeconsIMG from "../../assets/media/cabinet.jpg";
import clothes from "../../assets/media/sourire.jpeg";
// import required modules
import { Pagination, Navigation, Autoplay } from "swiper";


export default function App() {

  return (
    <>
      <Swiper
        slidesPerView={3}
        loop={true}
        centeredSlides={true}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide className="swiper">
          <img src={LeconsIMG} alt="" />
        </SwiperSlide>
        <SwiperSlide className="swiper">
          <img src={clothes} alt="" />
        </SwiperSlide>
        <SwiperSlide className="swiper">
          <img src={HomeIMG} alt="" />
        </SwiperSlide>
      </Swiper>
    </>
  );
}

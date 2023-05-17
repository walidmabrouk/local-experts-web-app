import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import HomeIMG from "../../assets/media/Home.png";
import LeconsIMG from "../../assets/media/image__3_-removebg-preview.png";
import clothes from "../../assets/media/plumber.jpg";
import BienEtreIMG from "../../assets/media/dj.jpg.webp";
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
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={HomeIMG} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={LeconsIMG} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={clothes} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={BienEtreIMG} alt="" />
        </SwiperSlide>

      </Swiper>
    </>
  );
}

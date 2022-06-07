import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";


// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "../stylesheets/carousel.css";
import "swiper/css/navigation";

// import required modules
import { Grid, Pagination, Navigation } from "swiper";

export default function Carousel(props) {
  return (
    <>
      <h1 className="title-carousel">Popular MYtineraries</h1>
      <Swiper
        slidesPerView={2}
        grid={{
          rows: 2,
        }}
        spaceBetween={10}
        slidesPerGroup={2}
        pagination={{
          clickable: true
        }}
        navigation={true}
        modules={[Grid, Pagination, Navigation]}
        className="mySwiper"
      >
        {props.data && props.data.map(item =>
          <SwiperSlide className="item-carousel"><img src={item.img} alt={item.city} className='img-carousel' /><p className="text-carousel">{item.city}</p></SwiperSlide>
        )}

      </Swiper>
    </>
  );
}

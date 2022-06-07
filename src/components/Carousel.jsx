// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";


// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "../stylesheets/carousel.css";
import "swiper/css/navigation";

// import required modules
import { Autoplay , Grid, Pagination, Navigation } from "swiper";

export default function Carousel(props) {
  return (
    <>
    <div className='carousel-container'>
      <h1 className="title-carousel">Popular MYtineraries</h1>
      <Swiper
        slidesPerView={2}
        grid={{
          rows: 2,
        }}
        spaceBetween={30}
        slidesPerGroup={2}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true
        }}
        navigation={true}
        modules={[Autoplay, Grid, Pagination, Navigation]}
        className="mySwiper"
      >
        {props.data && props.data.map(item =>
          <SwiperSlide key={item.id} className="item-carousel"><img src={process.env.PUBLIC_URL+`/assets/img/${item.img}`} alt={item.city} className='img-carousel' /><p className="text-carousel">{item.city}</p></SwiperSlide>
        )}

      </Swiper> 
      </div>
    </>
  );
}

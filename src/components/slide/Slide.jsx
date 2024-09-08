import React from "react";
import "./Slide.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const Slide = ({ title, children }) => {
  return (
    <div className="slide">
      {title && <p className="title">{title}</p>}
      <div className="container">
        <Swiper
          spaceBetween={0}
          slidesPerView={1} // Default view for very small screens
          breakpoints={{
            340: {
              slidesPerView: 2, // Mobile screens (below 640px)
            },

            640: {
              slidesPerView: 3, // Mobile screens (below 640px)
            },
            768: {
              slidesPerView: 3, // Tablet screens (640px - 1024px)
            },
            1024: {
              slidesPerView: 5, // Desktop screens (above 1024px)
            },
          }}
        >
          {children}
        </Swiper>
      </div>
    </div>
  );
};

export default Slide;

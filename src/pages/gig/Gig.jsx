import React, { useState } from "react";
import "./Gig.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import Userinfo from "../../components/gigUserInfoBox/Userinfo";
import ReviewCard from "../../components/reviewCard/ReviewCard";
import { reviews } from "../../data";
const Gig = () => {
  const [visibleReview, setVisibleReview] = useState("4");
  const handleShowMoreReview = () => {
    setVisibleReview(visibleReview + 4);
  };
  return (
    <div className="gig layout">
      <div className="container">
        <span className="breadcrumbs">Fiverr / Graphics & Design </span>
        <div className="main">
          <div className="left">
            <h1>
              I will do frontend web development, figma to html css react js php
              laravel with backend
            </h1>
            <Userinfo></Userinfo>
            <div className="slider_section">
              <Swiper
                className="slider"
                slidesPerView={1}
                modules={[Navigation, Pagination]}
                pagination={{ clickable: true }}
              >
                <SwiperSlide>
                  <img
                    src="https://images.pexels.com/photos/1074535/pexels-photo-1074535.jpeg?auto=compress&cs=tinysrgb&w=1600"
                    alt="Slide 1"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src="https://images.pexels.com/photos/1462935/pexels-photo-1462935.jpeg?auto=compress&cs=tinysrgb&w=1600"
                    alt="Slide 2"
                  />
                </SwiperSlide>
                {/* Add more SwiperSlide as needed */}
              </Swiper>
            </div>
          </div>
          <div className="right">
            <div className="price">
              <h3>2 to 3 Page Development</h3>
              <h2>PKR 29,320</h2>
            </div>
            <p>Build basic 3 pages, Convert figma into site</p>
            <div className="details">
              <div className="item">
                <img src="/img/clock.png" alt="" />
                <span>2 Days Delivery</span>
              </div>
              <div className="item">
                <img src="/img/recycle.png" alt="" />
                <span>3 Revisions</span>
              </div>
            </div>

            <div className="heading">
              <p>What's Included</p> <img src="/img/down.png" alt="down"></img>
            </div>
            <div className="features">
              <div className="item">
                <img src="/img/greencheck.png" alt="" />
                <span>Functional website</span>
              </div>
              <div className="item">
                <img src="/img/greencheck.png" alt="" />
                <span>2 pages</span>
              </div>
              <div className="item">
                <img src="/img/greencheck.png" alt="" />
                <span>Content upload</span>
              </div>
              <div className="item">
                <img src="/img/greencheck.png" alt="" />
                <span>E-commerce functionality</span>
              </div>
              <div className="item">
                <img src="/img/greencheck.png" alt="" />
                <span>Speed optimization</span>
              </div>{" "}
              <div className="item">
                <img src="/img/greencheck.png" alt="" />
                <span>Social media icons</span>
              </div>
              <button>Continue</button>
            </div>
          </div>
        </div>

        <div className="about">
          <h2>About this gig</h2>
          <p>
            As a certified React developer, I specialise in creating highly
            performant, functional, and user-friendly interfaces using React/PHP
            or any other platform like Webflow, Shopify or WordpressAs a
            certified React developer, I specialise in creating highly
            performant, functional, and user-friendly interfaces using React/PHP
            or any other platform like Webflow, Shopify or Wordpress
          </p>

          <Userinfo></Userinfo>

          <div className="box">
            <div className="items">
              <div className="item">
                <span className="title">From</span>
                <span className="desc">Pakistan</span>
              </div>
              <div className="item">
                <span className="title">Member Since</span>
                <span className="desc">Jul 2020</span>
              </div>
              <div className="item">
                <span className="title">Avg. response time</span>
                <span className="desc">4 hours</span>
              </div>
              <div className="item">
                <span className="title">Last delivery</span>
                <span className="desc">1 day</span>
              </div>
              <div className="item">
                <span className="title">Languages</span>
                <span className="desc">Urdu, English</span>
              </div>
            </div>
            <hr />
            <div className="detail">
              <span>
                Highly motivated Senior Full-Stack Developer with 7+ years of
                experience delivering 80+ successful projects across various
                industries (Retail, eCommerce, IT, Healthcare). Passionate
                about: Transforming business challenges into clean, scalable web
                applications/Websites using modern technologies. Exceeding
                client expectations through reliable, adaptable development
                practices. Platforms: ✔️ WordPress ✔️Shopify ✔️WebFlow
                ✔️Squarespace ✔️ReactJS ✔️NextJS ✔️Node
              </span>
            </div>
          </div>
          <div className="reviews">
            <h2>Reviews </h2>

            {reviews?.slice(0, visibleReview).map((item, index) => (
              <ReviewCard key={index} item={item}></ReviewCard>
            ))}
            {visibleReview < reviews.length && (
              <button className="reviewBtn" onClick={handleShowMoreReview}>
                Show more Review
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gig;

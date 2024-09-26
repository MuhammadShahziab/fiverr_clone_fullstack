import React from "react";
import "./Home.scss";
import Hero from "../../components/hero/Hero";
import Categories from "../../components/helperCategories/Categories";
import Slide from "../../components/slide/Slide";
import { cards, projects } from "../../data";
import CatCard from "../../components/catCard/CatCard";
import ProjectCard from "../../components/projectCard/ProjectCard";
import { SwiperSlide } from "swiper/react";

const Home = () => {
  return (
    <div className="layout">
      <Hero />
      {/* <Categories /> */}
      <Slide title="Popular Services">
        {cards.map((item, index) => (
          <SwiperSlide key={index}>
            <CatCard item={item} />
          </SwiperSlide>
        ))}
      </Slide>

      <div className="features">
        <div className="container">
          <div className="left">
            <p className="sub-heading">
              fiverr <span>pro.</span>
            </p>
            <h1>
              The <i>premium</i> freelance solution for businesses
            </h1>
            <div className="content">
              <div className="item">
                <div className="title">
                  <img src="./img/check.png"></img>
                  <h3>Dedicated hiring experts</h3>
                </div>
                <p className="des">
                  Count on an account manager to find you the right talent and
                  see to your project’s every need.
                </p>
              </div>
              <div className="item">
                <div className="title">
                  <img src="./img/check.png"></img>
                  <h3>Dedicated hiring experts</h3>
                </div>
                <p className="des">
                  Count on an account manager to find you the right talent and
                  see to your project’s every need.
                </p>
              </div>
              <div className="item">
                <div className="title">
                  <img src="./img/check.png"></img>
                  <h3>Dedicated hiring experts</h3>
                </div>
                <p className="des">
                  Count on an account manager to find you the right talent and
                  see to your project’s every need.
                </p>
              </div>{" "}
              <div className="item">
                <div className="title">
                  <img src="./img/check.png"></img>
                  <h3>Dedicated hiring experts</h3>
                </div>
                <p className="des">
                  Count on an account manager to find you the right talent and
                  see to your project’s every need.
                </p>
              </div>
            </div>
            <div className="button">
              <button>Try Now</button>
            </div>
          </div>
          <div className="right">
            <img src="./img/bannerr/fiverr-pro.png"></img>
          </div>
        </div>
      </div>

      <div className="video">
        <div className="container">
          <h1>What success on Fiverr looks like</h1>
          <p>
            Vontélle Eyewear turns to Fiverr freelancers to bring their vision
            to life.
          </p>

          <div className="video_add">
            <video
              controls
              src="https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/v1/video-attachments/generic_asset/asset/4934b0c8f6441211d97f83585a7c9c00-1722433273322/Vontelle%20Cutdown-%20Breakthrough%20V5"
            ></video>
          </div>
        </div>
      </div>

      <div className="advertise">
        <div className="container">
          <div className="left">
            <p className="sub-heading">
              fiverr <span>logo maker.</span>
            </p>
            <h1>
              Make an incredible logo <span>in seconds</span>
            </h1>
            <p>Pre-designed by top talent. Just add your touch.</p>
            <button className="">Try Fiverr Logo Maker</button>
          </div>
          <div className="right">
            <img src="./img/bannerr/logo-maker.png"></img>
          </div>
        </div>
      </div>
      <div className="test">
        <Slide>
          {projects.map((item, index) => (
            <SwiperSlide key={index} className="project_slide">
              <ProjectCard item={item} />
            </SwiperSlide>
          ))}
        </Slide>
      </div>

      <div className="advertise2">
        <div className="container">
          <h1>
            Freelance services at your <span>fingertips</span>
          </h1>
          <button> join fiverr</button>
        </div>
      </div>
    </div>
  );
};

export default Home;

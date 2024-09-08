import React from "react";
import "./Hero.scss";
const Hero = () => {
  return (
    <div className="hero">
      <div className="container">
        <div className="inner_div">
          <h1>
            Scale your professional workforce with <i>freelancers</i>
          </h1>
          <div className="search">
            <input type="text" placeholder="Search for any service..." />
            <button className="search_button">
              <img src="./img/search.png" alt="search icon" />
            </button>
          </div>

          <div className="trusted_by">
            <span>Trusted by:</span>
            <img
              src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/facebook2x.188a797.png"
              alt=""
            />
            <img
              src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/google2x.06d74c8.png"
              alt=""
            />
            <img
              src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/netflix2x.887e47e.png"
              alt=""
            />
            <img
              src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/pandg2x.6dc32e4.png"
              alt=""
            />
            <img
              src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/paypal2x.22728be.png"
              alt=""
            />
          </div>
        </div>

        <img src="./img/bannerr/girl1.jpg" className="image"></img>
        <img src="./img/bannerr/men1.png" className="image"></img>
        <img src="./img/bannerr/men5.png" className="image"></img>
        <img src="./img/bannerr/men3.jpg" className="image"></img>
      </div>
    </div>
  );
};

export default Hero;

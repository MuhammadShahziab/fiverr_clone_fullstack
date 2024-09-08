import React, { useState } from "react";
import "./Footer.scss";
import { footer } from "../../data";
import { Link } from "react-router-dom";
const Footer = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="footer layout">
      <div className="container">
        <div className="top">
          {footer?.map((item, index) => (
            <div className="item" key={index}>
              <div onClick={() => handleToggle(index)} className="title">
                <h1>{item?.title}</h1>
                <img src="/img/down.png" alt="down"></img>
              </div>

              <div
                className={`linkss ${activeIndex === index ? "active" : ""}`}
              >
                {item?.links?.map((link, index) => (
                  <Link key={index} to={link?.link} className="link">
                    <span key={index}>{link.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <hr></hr>
        <div className="bottom">
          <div className="left">
            <h2>fiverr </h2> <span>© Fiverr International Ltd. 2024</span>
          </div>
          <div className="right">
            <div className="social_icons">
              <span>
                <img src="/img/instagram.png" alt="instagram"></img>
              </span>
              <span>
                <img src="/img/linkedin.png" alt="linkedin"></img>
              </span>
              <span>
                <img src="/img/facebook.png" alt="facebook"></img>
              </span>
              <span>
                <img src="/img/pinterest.png" alt="pinterest"></img>
              </span>
              <span>
                <img src="/img/twitter.png" alt="twitter"></img>
              </span>
            </div>
            <div className="english">
              <div className="link">
                <img src="/img/language.png" alt="language"></img>
                <span>English</span>
              </div>
              <div className="link">
                <img src="/img/coin.png" alt="coin"></img>
                <span>PKR</span>
              </div>
              <span>
                <img src="/img/accessibility.png" alt="accessibility"></img>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

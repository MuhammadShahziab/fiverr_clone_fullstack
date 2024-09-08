import React, { useState } from "react";
import "./GigCard.scss";
import "swiper/css";
import { Link } from "react-router-dom";

const GigCard = ({ item }) => {
  const [imgIndex, setImgIndex] = useState(0);

  const nextImage = () => {
    if (item?.images.length - 1 > imgIndex) {
      setImgIndex(imgIndex + 1);
    } else {
      return;
    }
  };
  const prevImage = () => {
    if (imgIndex !== 0) {
      setImgIndex(imgIndex - 1);
    }
  };
  return (
    <div className="gig-card">
      <div className="img_box">
        <img
          src={item.images[imgIndex].img}
          alt="name"
          className="gig-card-image"
        ></img>
        <button
          onClick={nextImage}
          disabled={imgIndex === item?.images.length - 1}
          className="arrow next-arrow"
        >
          <img src="./img/next.png" alt="next"></img>
        </button>

        <button
          onClick={prevImage}
          disabled={imgIndex === 0}
          className="arrow prev-arrow"
        >
          <img src="./img/prev.png" alt="prev"></img>
        </button>
        <div className="pagination">
          {item?.images.map((_, index) => (
            <span
              key={index}
              className={`indicator ${imgIndex === index ? "active" : ""}`}
              onClick={() => setImgIndex(index)}
            ></span>
          ))}
        </div>
      </div>

      {/* Card Content */}
      <Link to={`/gig/${item.id}`} className="link">
        <div className="gig-card-content">
          <div className="info">
            <img
              src={item?.pp}
              alt={item?.username}
              className="profile-picture"
            />
            <span>{item?.username}</span>
          </div>
          <p className="desc">{item.desc}</p>

          <div className="review_div">
            <img src="./img/star.png" alt="star" />
            <span>{item?.star}</span>
            <span>(129)</span>
          </div>
          <p>
            From PKR <span>{item.price}</span>
          </p>
        </div>
      </Link>
    </div>
  );
};

export default GigCard;

import React from "react";
import "./ReviewCard.scss";
const ReviewCard = ({ item }) => {
  return (
    <>
      <div className="reviewCard">
        <div className="user">
          <img src={item?.user?.profileImage} alt="user" />
          <div className="info">
            <span>{item?.user?.username}</span>
            <div className="country">
              <img
                src="https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png"
                alt=""
              />
              <span>{item?.user?.country}</span>
            </div>
          </div>
        </div>
        <hr />
        <div className="stars">
          <img src="/img/star.png" alt="" />
          <img src="/img/star.png" alt="" />
          <img src="/img/star.png" alt="" />
          <img src="/img/star.png" alt="" />
          <img src="/img/star.png" alt="" />
          <span>{item?.rating}</span>
        </div>

        <p>{item?.comment}</p>
        <div className="price_duration">
          <div className="price">
            <span className="line1">{item?.projectPrice}</span>
            <span className="line2">Price</span>
          </div>
          <div className="price">
            <span className="line1">{item?.duration} days</span>
            <span className="line2">Duration</span>
          </div>
        </div>
      </div>
      <div className="helpful">
        <span>Helpful?</span>
        <img src="/img/like.png" alt="" />
        <span>Yes</span>
        <img src="/img/dislike.png" alt="" />
        <span>No</span>
      </div>
    </>
  );
};

export default ReviewCard;

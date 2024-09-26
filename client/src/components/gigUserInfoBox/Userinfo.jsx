import React from "react";
import "./Userinfo.scss";
import GetColor from "../GetColor";
const Userinfo = ({ gigInfo, userInfo }) => {
  return (
    <div className="user">
      {userInfo?.img ? (
        <img className="pp" src={userInfo?.img} alt="profile" />
      ) : (
        <p
          className="avatarr"
          style={{ backgroundColor: GetColor(userInfo?.username) }}
        >
          {userInfo?.username?.charAt(0)}
        </p>
      )}
      <div>
        <div className="aboutUser">
          <p className="username">{userInfo?.username}</p>
          <p className="fiverr">
            Fiverrs <span>Choice</span>
          </p>
        </div>
        <div className="review">
          {!isNaN(gigInfo?.totalStars / gigInfo?.starNumber) &&
            Array(Math.round(gigInfo.totalStars / gigInfo.starNumber))
              .fill()
              .map((item, i) => <img key={i} src="/img/star.png" alt="star" />)}

          <span>
            {!isNaN(gigInfo?.totalStars / gigInfo?.starNumber) &&
              Math.round(gigInfo?.totalStars / gigInfo?.starNumber)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Userinfo;

import React from "react";
import "./Userinfo.scss";
const Userinfo = () => {
  return (
    <div className="user">
      <img
        className="pp"
        src="https://fiverr-res.cloudinary.com/image/upload/t_profile_original,q_auto,f_auto/v1/attachments/profile/photo/65f3cb53eecd480981d1772dc34dece9-1716288233192/15ce55fe-b93e-437c-aa10-7629c55e579d.jpeg"
        alt="profile"
      />
      <div>
        <div className="aboutUser">
          <p className="username">Semantic Tribe</p>
          <p className="fiverr">
            Fiverrs <span>Choice</span>
          </p>
        </div>
        <div className="review">
          <img src="/img/star.png" alt="star" />
          <span>(4.5)</span>
        </div>
      </div>
    </div>
  );
};

export default Userinfo;

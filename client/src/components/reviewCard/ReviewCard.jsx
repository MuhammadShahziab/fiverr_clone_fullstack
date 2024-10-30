import React from "react";
import "./ReviewCard.scss";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newrequest";
import GetColor from "../GetColor";
const ReviewCard = ({ item, gigDeliveryTime, gigPrice }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: [item.userId],
    queryFn: () =>
      newRequest.get(`/users/${item?.userId}`).then((res) => {
        return res.data;
      }),
  });

  return (
    <>
      <div className="reviewCard">
        {isLoading ? (
          "Loading..."
        ) : error ? (
          "Something went wrong!"
        ) : (
          <div className="user">
            {data?.img ? (
              <div className="profile">
                <img
                  src={data?.img || "/img/noavatar.jpg"}
                  alt="user"
                  className="profile_img"
                />
              </div>
            ) : (
              <p style={{ backgroundColor: GetColor(data?.username) }}>
                {data?.username.charAt()}
              </p>
            )}

            <div className="info">
              <span>{data.username}</span>
              <div className="country">
                <img
                  src="https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png"
                  alt=""
                />
                <span>{data.country}</span>
              </div>
            </div>
          </div>
        )}

        <hr />
        <div className="stars">
          {Array(item?.star)
            .fill()
            .map((star, index) => (
              <img src="/img/star.png" alt="" key={index} />
            ))}
          <span>{item?.star}</span>
        </div>

        <p>{item?.desc}</p>
        <div className="price_duration">
          <div className="price">
            <span className="line1">PKR {gigPrice}</span>
            <span className="line2">Price</span>
          </div>
          <div className="price">
            <span className="line1">{gigDeliveryTime} days</span>
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

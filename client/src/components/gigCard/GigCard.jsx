import React, { useState } from "react";
import "./GigCard.scss";
import "swiper/css";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newrequest";
import GetColor from "../GetColor";
import FavListPopup from "../favListPopup/FavListPopUp";

const GigCard = ({ item }) => {
  const [imgIndex, setImgIndex] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const { isLoading, error, data } = useQuery({
    queryKey: [item.userId],
    queryFn: () =>
      newRequest.get(`/users/${item.userId}`).then((res) => {
        return res.data;
      }),
  });

  const {
    isLoading: favListLoading,
    error: favListError,
    data: favListData,
  } = useQuery({
    queryKey: ["favList"],
    queryFn: () => newRequest.get(`/favList`).then((res) => res.data),
  });

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
          src={item?.images[imgIndex]}
          alt="name"
          className="gig-card-image"
        ></img>
        {item?.images.length > 1 && (
          <>
            <button
              onClick={nextImage}
              disabled={imgIndex === item?.images.length - 1}
              className="arrow next-arrow"
            >
              <img src="/img/next.png" alt="next"></img>
            </button>

            <button
              onClick={prevImage}
              disabled={imgIndex === 0}
              className="arrow prev-arrow"
            >
              <img src="/img/prev.png" alt="prev"></img>
            </button>
          </>
        )}
        <span className="heart" onClick={() => setIsPopupOpen(true)}>
          {favListData?.find((fav) =>
            fav.gigs.find((fav) => fav._id === item._id)
          )
            ? "❤️"
            : "🤍"}
        </span>

        {isPopupOpen && (
          <FavListPopup
            onClose={() => setIsPopupOpen(false)}
            gigId={item._id}
          ></FavListPopup>
        )}

        <div className="pagination">
          {item?.images.map((_, index) => (
            <span
              key={index}
              className={`indicator ${imgIndex === index ? "active" : ""}`}
              onClick={() => setImgIndex(index)}
            ></span>
          ))}
        </div>
      </div>{" "}
      {/* Card Content */}
      <Link to={`/gig/${item._id}`} className="link">
        <div className="gig-card-content">
          <div className="info">
            {isLoading ? (
              "Loading"
            ) : error ? (
              "Something went wrong"
            ) : (
              <>
                {data?.img ? (
                  <img
                    src={data?.img}
                    alt={"profile"}
                    className="profile-picture"
                  />
                ) : (
                  <p
                    className="avatar"
                    style={{ backgroundColor: GetColor(data?.username) }}
                  >
                    {data?.username?.charAt(0)}
                  </p>
                )}

                <span>{data?.username}</span>
              </>
            )}
          </div>
          <p className="desc">{item?.desc.slice(0, 70)}...</p>

          <div className="review_div">
            <img src="/img/star.png" alt="star" />
            <span>
              {" "}
              {!isNaN(item.totalStars / item.starNumber) &&
                Math.round(item.totalStars / item.starNumber)}
            </span>
            <span>({item.totalStars ? item.totalStars : "0"})</span>
          </div>
          <p>
            From PKR <span> {item?.price}</span>
          </p>
        </div>
      </Link>
    </div>
  );
};

export default GigCard;

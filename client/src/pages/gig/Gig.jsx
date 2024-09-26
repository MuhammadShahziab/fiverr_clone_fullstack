import React from "react";
import "./Gig.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import Userinfo from "../../components/gigUserInfoBox/Userinfo";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newrequest";
import { useNavigate, useParams } from "react-router-dom";
import Reviews from "../../components/reviews/Reviews";
import getCurrentUser from "../../utils/getCurrentUser";
import moment from "moment";
import toast from "react-hot-toast";

const Gig = () => {
  const { id } = useParams();
  const currentUser = getCurrentUser();
  const navigate = useNavigate();
  const { isLoading, error, data } = useQuery({
    queryKey: ["gig"],
    queryFn: () =>
      newRequest.get(`/gigs/single/${id}`).then((res) => {
        return res.data;
      }),
  });
  const userId = data?.userId;

  const {
    isLoading: isLoadingUser,
    error: userError,
    data: userData,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      newRequest.get(`/users/${userId}`).then((res) => {
        return res.data;
      }),

    enabled: !!userId,
  });

  const handleCreateIntent = () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    if (currentUser.isSeller || currentUser?._id === data?.userId) {
      toast.error("Sellers cannot create an order for their own gig!");
      return;
    }
    navigate(`/pay/${id}`);
  };

  return (
    <div className="gig layout">
      {isLoading ? (
        "Loading..."
      ) : error ? (
        "Something went wrong"
      ) : (
        <div className="container">
          <span className="breadcrumbs">Fiverr / {data?.cat} </span>
          <div className="main">
            <div className="left">
              <h1>{data?.title}</h1>
              {isLoadingUser ? (
                "Loading..."
              ) : userError ? (
                "Something went wrong"
              ) : (
                <Userinfo gigInfo={data && data} userInfo={userData}></Userinfo>
              )}

              <div className="slider_section">
                <Swiper
                  className="slider"
                  slidesPerView={1}
                  modules={[Navigation, Pagination]}
                  pagination={{ clickable: true }}
                >
                  {data?.images?.map((img, index) => (
                    <SwiperSlide key={index}>
                      <img src={img} alt={`${index + 1} Slide`} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
            <div className="right">
              <div className="price_title">
                <h3 className="title">{data?.shortTitle}</h3>
                <h2 className="price">PKR {data?.price}</h2>
              </div>
              <p>{data?.shortDesc}</p>
              <div className="details">
                <div className="item">
                  <img src="/img/clock.png" alt="" />
                  <span>{data?.deliveryTime} Days Delivery</span>
                </div>
                <div className="item">
                  <img src="/img/recycle.png" alt="" />
                  <span>{data?.revisionNumber} Revisions</span>
                </div>
              </div>

              <div className="heading">
                <p>What's Included</p>{" "}
                <img src="/img/down.png" alt="down"></img>
              </div>
              <div className="features">
                {data?.features?.map((point, index) => (
                  <div className="item" key={index}>
                    <img src="/img/greencheck.png" alt="" />
                    <span>{point}</span>
                  </div>
                ))}

                <button onClick={handleCreateIntent} className="continuebtn">
                  Continue
                </button>
              </div>
            </div>
          </div>

          <div className="about">
            <h2>About this Gig</h2>
            <p>{data?.desc}</p>

            {isLoadingUser ? (
              "Loading..."
            ) : userError ? (
              "Something went wrong"
            ) : (
              <Userinfo gigInfo={data && data} userInfo={userData}></Userinfo>
            )}

            <div className="box">
              <div className="items">
                <div className="item">
                  <span className="title">From</span>
                  <span className="desc">{userData?.country}</span>
                </div>
                <div className="item">
                  <span className="title">Member Since</span>
                  <span className="desc">
                    {moment(userData?.createdAt).format("LL")}
                  </span>
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
                  {userData?.desc}
                  {/* Highly motivated Senior Full-Stack Developer with 7+ years of
                  experience delivering 80+ successful projects across various
                  industries (Retail, eCommerce, IT, Healthcare). Passionate
                  about: Transforming business challenges into clean, scalable
                  web applications/Websites using modern technologies. Exceeding
                  client expectations through reliable, adaptable development
                  practices. Platforms: ✔️ WordPress ✔️Shopify ✔️WebFlow
                  ✔️Squarespace ✔️ReactJS ✔️NextJS ✔️Node */}
                </span>
              </div>
            </div>
            <Reviews
              gigId={id}
              gigDeliveryTime={data?.deliveryTime}
              gigPrice={data?.price}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Gig;

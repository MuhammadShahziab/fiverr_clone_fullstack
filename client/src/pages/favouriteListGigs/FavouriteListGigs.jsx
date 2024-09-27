import React from "react";
import "./FavouriteListGigs.scss";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import newRequest from "../../utils/newrequest";
import GetColor from "../../components/GetColor";
import GigCard from "../../components/gigCard/GigCard";
const FavouriteListGigs = () => {
  const { id } = useParams();

  const { isLoading, error, data } = useQuery({
    queryKey: ["favListGigs"],
    queryFn: () => newRequest.get(`/favList/${id}`).then((res) => res.data),
  });

  console.log(data, "chwck gig");

  const favGigs = data && data[0];
  return isLoading ? (
    "Loading..."
  ) : error ? (
    "Something went Wrong!"
  ) : (
    <div className="favouriteGigs layout">
      <span className="breadcrumbs">
        <Link to="/" className="link">
          Fiverr{" "}
        </Link>{" "}
        /{" "}
        <Link to="/my_list" className="link">
          My Lists{" "}
        </Link>{" "}
      </span>

      <div className="heading">
        <h2 className="title">{favGigs?.name}</h2>

        <div className="user">
          {favGigs?.userId?.img ? (
            <img src="/img/noavatar.jpg" alt="pp" />
          ) : (
            <p
              className="avatar"
              style={{ backgroundColor: GetColor(favGigs?.userId?.username) }}
            >
              {favGigs?.userId?.username?.charAt(0)}
            </p>
          )}
          <p>
            Created by <span>{favGigs?.userId?.username}</span>
          </p>
        </div>

        <p>Gigs {favGigs?.gigs?.length} </p>
      </div>

      <div className="gigs">
        {favGigs?.gigs?.map((item) => (
          <GigCard item={item} card key={item?._id} />
        ))}
      </div>
    </div>
  );
};

export default FavouriteListGigs;

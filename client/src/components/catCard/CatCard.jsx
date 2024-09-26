import React from "react";
import "./CatCard.scss";
import { Link } from "react-router-dom";
function CatCard({ item }) {
  return (
    <Link className="link" to={`/gigs?cat=${item?.cat}`}>
      <div className="Card " style={{ backgroundColor: item?.backGround }}>
        <p>{item?.title}</p>
        <img src={item?.img}></img>
      </div>
    </Link>
  );
}

export default CatCard;

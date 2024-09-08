// Gigs.jsx
import React, { useState } from "react";
import "./Gigs.scss";
import { gigs } from "../../data"; // Assuming your data source
import GigCard from "../../components/gigCard/GigCard";

const Gigs = () => {
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("sales");

  const resort = (type) => {
    setSort(type);
    setOpen(false);
  };
  return (
    <div className="gigs layout">
      <div className="container">
        <span className="breadcrumbs">Fiverr / Graphics & Design </span>
        <h1>AI Artists</h1>
        <p>
          Explore the boundaries of art and technology with Liverr's AI artists
        </p>

        <div className="menu">
          <div className="left">
            <span>Budget</span> <input type="text" placeholder="min"></input>
            <input type="text" placeholder="max"></input>
            <button>Apply</button>
          </div>
          <div className="right">
            <span className="sortby">SortBy</span>
            <span className="sortType" onClick={() => setOpen(!open)}>
              {sort === "sales" ? "Best Sales" : "Newest"}
            </span>
            <img src="./img/down.png" onClick={() => setOpen(!open)}></img>
            {open && (
              <div className="rightMenu">
                <span onClick={() => resort("createdAt")}>Newest</span>
                <span onClick={() => resort("sales")}>Best Selling</span>
              </div>
            )}
          </div>
        </div>

        <div className="cards">
          {gigs?.map((data, index) => (
            <GigCard key={index} item={data} /> // Pass individual gig data as props if needed
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gigs;

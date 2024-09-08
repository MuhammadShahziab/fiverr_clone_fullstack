import React, { useState } from "react";
import "./Gigs.scss";
import { gigs } from "../../data"; // Assuming your data source
import GigCard from "../../components/gigCard/GigCard";
import { GoArrowRight } from "react-icons/go";
import { GoArrowLeft } from "react-icons/go";
import Pagination from "../../components/pagination/Pagination";

const Gigs = () => {
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("sales");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  const totalPages = Math.ceil(gigs.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, gigs.length);

  const currentData = gigs.slice(startIndex, endIndex);

  const resort = (type) => {
    setSort(type);
    setOpen(false);
  };

  // Handle page change
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
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
            <img
              src="./img/down.png"
              onClick={() => setOpen(!open)}
              alt="sort icon"
            />
            {open && (
              <div className="rightMenu">
                <span onClick={() => resort("createdAt")}>Newest</span>
                <span onClick={() => resort("sales")}>Best Selling</span>
              </div>
            )}
          </div>
        </div>

        <div className="cards">
          {currentData?.map((data, index) => (
            <GigCard key={index} item={data} />
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        ></Pagination>
      </div>
    </div>
  );
};

export default Gigs;

import React, { useEffect, useRef, useState } from "react";
import "./Gigs.scss";
import GigCard from "../../components/gigCard/GigCard";
import Pagination from "../../components/pagination/Pagination";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newrequest";
import { useLocation } from "react-router-dom";
import { cards } from "../../data";

const Gigs = () => {
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("sales");

  const minref = useRef();
  const maxref = useRef();
  const { search } = useLocation();

  const params = new URLSearchParams(search);
  const get = params.get("cat");

  const category = cards?.filter((item) => item.cat === get);

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["gigs"],
    queryFn: () =>
      newRequest
        .get(
          `/gigs${search}&min=${minref.current.value}&max=${maxref.current.value}&sort=${sort}`
        )
        .then((res) => res.data),
  });

  // paginations logic
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const totalPages = Math.ceil(data?.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, data?.length);

  const currentData = data?.slice(startIndex, endIndex);
  // paginations logic end
  const resort = (type) => {
    setSort(type);
    setOpen(false);
  };

  const apply = () => {
    refetch();
  };

  useEffect(() => {
    refetch();
  }, [sort]);

  return (
    <div className="gigs layout">
      <div className="container">
        <span className="breadcrumbs">Fiverr / {category[0]?.cat} </span>
        <h1>{category[0]?.title}</h1>
        <p>{category[0]?.desc} </p>

        <div className="menu">
          <div className="left">
            <span>Budget</span>{" "}
            <input type="text" ref={minref} placeholder="min"></input>
            <input
              type="text"
              name="max"
              ref={maxref}
              placeholder="max"
            ></input>
            <button className="applybtn" onClick={apply}>
              Apply
            </button>
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
          {isLoading
            ? "Loading"
            : error
            ? "something went wrong!"
            : currentData?.map((data, index) => (
                <GigCard key={index} item={data} />
                // <h1 key={data._id}>hello</h1>
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

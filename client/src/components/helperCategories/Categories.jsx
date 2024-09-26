import React from "react";
import "./Categories.scss";
import { helperCatgory } from "../../data";
const Categories = () => {
  return (
    <div className="categories">
      <div className="container">
        {helperCatgory?.map((item, index) => (
          <div className="card" key={index}>
            <img src={item?.icon} alt={item?.title}></img>
            <p>{item?.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;

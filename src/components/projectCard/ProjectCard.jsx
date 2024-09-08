import React from "react";
import "./ProjectCard.scss";
import { Link } from "react-router-dom";
const ProjectCard = ({ item }) => {
  return (
    <Link className="link" to="/">
      <div className="projectCard">
        <img src={item?.img} alt={item?.cat}></img>
        <div className="content">
          <img src={item?.pp} alt={item?.cat + 2}></img>
          <div className="info">
            <p>{item?.cat}</p>
            <span>{item?.username}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;

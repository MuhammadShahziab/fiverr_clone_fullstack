import React from "react";
import "./Message.scss";
import { Link } from "react-router-dom";
const Message = () => {
  return (
    <div className="message layout">
      <div className="container">
        <span className="breadcrumbs">
          <Link className="link" to="/messages">
            Fiverr / Message
          </Link>{" "}
          / shahzaib
        </span>

        <div className="messages">
          <div className="item">
            <img src="/img/bannerr/men1.png" alt="pp" />
            <p>Lorem ipsum dolor</p>
          </div>
          <div className="item owner">
            <img src="/img/bannerr/men3.jpg" alt="pp" />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
              odit fuga maxime!
            </p>
          </div>
          <div className="item owner">
            <img src="/img/bannerr/men3.jpg" alt="pp" />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
              odit fuga maxime! Ipsa vel
            </p>
          </div>{" "}
          <div className="item owner">
            <img src="/img/bannerr/men3.jpg" alt="pp" />
            <p>Lorem ipsum dolor sit amet consectetur</p>
          </div>
        </div>
        <div className="write">
          <textarea name="" placeholder="Write a message" id=""></textarea>
          <button>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Message;

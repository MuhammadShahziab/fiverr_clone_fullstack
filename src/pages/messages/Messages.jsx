import React from "react";
import "./Messages.scss";
import { Link } from "react-router-dom";
import Pagination from "../../components/pagination/Pagination";
const Messages = () => {
  const currentUser = {
    id: 1,
    username: "Shahzaib",
    isSeller: true,
  };

  const message =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint asperiores debitis id porro, suscipit optio natus libero, voluptatibus excepturi beatae recusandae ";
  return (
    <div className="messages layout">
      <div className="container">
        <div className="title">
          <h1>Messages</h1>
        </div>

        <table>
          <tr>
            <th>{currentUser?.isSeller ? "Buyer" : "Seller"}</th>
            <th>Last Message</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
          <tr className="active">
            <td>shahzaib</td>
            <td>{message.substring(0, 50)}...</td>
            <td>2 hours ago</td>
            <td>
              {" "}
              <Link to="/message/12">
                <button> Mark as Read</button>
              </Link>
            </td>
          </tr>
          <tr className="active">
            <td>shahzaib</td>
            <td>{message.substring(0, 50)}...</td>
            <td>2 hours ago</td>
            <td>
              {" "}
              <Link to="/message/12">
                <button> Mark as Read</button>
              </Link>
            </td>
          </tr>{" "}
          <tr>
            <td>shahzaib</td>
            <td>{message.substring(0, 50)}...</td>
            <td>2 hours ago</td>
            <td> </td>
          </tr>{" "}
          <tr>
            <td>shahzaib</td>
            <td>{message.substring(0, 50)}...</td>
            <td>2 hours ago</td>
            <td> </td>
          </tr>{" "}
          <tr>
            <td>shahzaib</td>
            <td>{message.substring(0, 50)}...</td>
            <td>2 hours ago</td>
            <td> </td>
          </tr>{" "}
          <tr>
            <td>shahzaib</td>
            <td>{message.substring(0, 50)}...</td>
            <td>2 hours ago</td>
            <td></td>
          </tr>{" "}
          <tr>
            <td>shahzaib</td>
            <td>{message.substring(0, 50)}...</td>
            <td>2 hours ago</td>
            <td> </td>
          </tr>{" "}
          <tr>
            <td>shahzaib</td>
            <td>{message.substring(0, 50)}...</td>
            <td>2 hours ago</td>
            <td> </td>
          </tr>
        </table>
      </div>
      <Pagination totalPages={6} currentPage={1} />
    </div>
  );
};

export default Messages;

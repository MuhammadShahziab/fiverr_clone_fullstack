import React, { useEffect } from "react";
import "./Notifications.scss";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newrequest";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import GetColor from "../GetColor";
import moment from "moment";
const Notifications = ({ setNotification, notification, data }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.put(`/notifications/${id}`); // Mark notification as read
    },
    onSuccess: () => {
      queryClient.invalidateQueries("notifications"); // Refetch notifications after marking as read
    },
  });

  const handleRead = (id) => {
    mutation.mutate(id);
  };
  return (
    <div className="notification_box">
      <div className="header">
        <IoMdNotificationsOutline size={20} />
        <p>Notifications {`(${data?.length || 0})`}</p>{" "}
      </div>
      <div className="notifications">
        {data.length > 0 ? (
          data.map((item, index) => (
            <Link
              onClick={() => setNotification(!notification)}
              className="link"
              to={`${
                item?.type === "order"
                  ? "/orders"
                  : `/message/${item?.conversationId}`
              }`}
              key={item._id}
            >
              <div
                onClick={() => handleRead(item?._id)} // Mark as read when clicked
                className={`${!item?.isRead && "active"} notification `}
              >
                <div className="user">
                  <div className="profileImage">
                    {item?.senderId?.img ? (
                      <img src={item?.senderId?.img} alt="pp"></img>
                    ) : (
                      <p
                        style={{
                          backgroundColor: GetColor(item?.senderId?.username),
                        }}
                        className="pp"
                      >
                        {item?.senderId?.username.charAt(0)}
                      </p>
                    )}
                  </div>

                  <div className="content">
                    <span className="name">{item?.senderId.username}</span>
                    <span className="message">{item?.message}</span>
                  </div>
                </div>

                <div className="otherInfo">
                  <span className="createdAt">
                    {" "}
                    {moment(item?.createdAt).fromNow()}
                  </span>
                  {item?.type !== "order" && !item?.isRead && (
                    <>
                      <span className="counter">{item?.messageCount}</span>
                    </>
                  )}
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="empty">
            <img src="/img/empty.png" alt="empty"></img>
            <p>No Notifications...yet</p>
            <p>The more you do out there, the more you'll see in here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;

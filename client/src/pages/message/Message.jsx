import React, { useEffect, useRef, useState } from "react";
import "./Message.scss";
import { Link, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newrequest";
import getCurrentUser from "../../utils/getCurrentUser";
import GetColor from "../../components/GetColor";
import { BsSend } from "react-icons/bs";

const Message = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const [message, setMessage] = useState("");

  const currentUser = getCurrentUser();
  const messagesContainerRef = useRef();

  // Fetching messages
  const { isLoading, error, data } = useQuery({
    queryKey: ["message", id],
    queryFn: () => newRequest.get(`/message/${id}`).then((res) => res.data),
    refetchInterval: 3000, // Polling every 3 seconds
  });

  // Fetching conversation details
  const {
    isLoading: userLoading,
    error: userError,
    data: userData,
  } = useQuery({
    queryKey: ["conversations"],
    queryFn: () =>
      newRequest.get(`/conversation/single/${id}`).then((res) => res.data),
  });

  // Mutation to send a message
  const mutation = useMutation({
    mutationFn: (message) => {
      return newRequest.post(`/message`, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["message", id]);
    },
  });

  // Handle message form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      conversationId: id,
      desc: message,
    });
    setMessage("");
  };

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [data?.length]);

  // const getUserProfile = (messageUserId) => {
  //   if (messageUserId === currentUser._id) {
  //     // Current user (sender)
  //     return currentUser?.img ? (
  //       <img src={currentUser.img} alt="pp" />
  //     ) : (
  //       <p
  //         className="avatar"
  //         style={{
  //           backgroundColor: GetColor(currentUser?.username),
  //         }}
  //       >
  //         {currentUser?.username?.charAt(0)}
  //       </p>
  //     );
  //   } else {
  //     // Receiver (other user in the conversation)
  //     const receiver = currentUser?.isSeller
  //       ? userData?.buyerId
  //       : userData?.sellerId;
  //     return receiver?.img ? (
  //       <img src={receiver.img} alt="PP" />
  //     ) : (
  //       <p
  //         className="avatar"
  //         style={{
  //           backgroundColor: GetColor(receiver?.username),
  //         }}
  //       >
  //         {receiver?.username?.charAt(0)}
  //       </p>
  //     );
  //   }
  // };
  const getUserProfile = (messageUserId) => {
    if (messageUserId === currentUser._id) {
      return currentUser?.img ? (
        <img src={currentUser.img} alt="pp" />
      ) : (
        <p
          className="avatar"
          style={{ backgroundColor: GetColor(currentUser?.username) }}
        >
          {currentUser?.username?.charAt(0)}
        </p>
      );
    } else {
      const receiver = currentUser?.isSeller
        ? userData?.buyerId
        : userData?.sellerId;

      return receiver?.img ? (
        <img src={receiver?.img} alt="pp"></img>
      ) : (
        <p
          className="avatar"
          style={{ backgroundColor: GetColor(receiver?.username) }}
        >
          {receiver?.username?.charAt(0)}
        </p>
      );
    }
  };

  return (
    <div className="message layout">
      <div className="container">
        {userLoading ? (
          "Loading..."
        ) : userError ? (
          "Something went wrong!"
        ) : (
          <span className="breadcrumbs">
            <Link className="link" to="/messages">
              Fiverr / Message
            </Link>{" "}
            /{" "}
            {currentUser?.isSeller
              ? userData?.buyerId?.username
              : userData?.sellerId?.username}
          </span>
        )}

        <div className="messages" ref={messagesContainerRef}>
          {isLoading
            ? "Loading..."
            : error
            ? "Something went wrong!"
            : data?.map((m) => (
                <div
                  className={` ${
                    m.userId === currentUser._id ? "item owner" : "item"
                  } `}
                  key={m._id}
                >
                  {getUserProfile(m.userId)}
                  <p>{m.desc}</p>
                </div>
              ))}
        </div>
        <form onSubmit={handleSubmit} className="write">
          <input
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write a message"
            id=""
          ></input>
          <button disabled={message === ""} type="submit" className="sendBtn">
            <BsSend></BsSend>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Message;

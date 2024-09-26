import React, { useState } from "react";
import "./Messages.scss";
import { Link } from "react-router-dom";
import Pagination from "../../components/pagination/Pagination";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newrequest";
import moment from "moment";
import getCurrentUser from "../../utils/getCurrentUser";
import GetColor from "../../components/GetColor";
const Messages = () => {
  const queryClient = useQueryClient();
  const currentUser = getCurrentUser();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { isLoading, error, data } = useQuery({
    queryKey: ["conversations"],
    queryFn: () => newRequest.get(`/conversation`).then((res) => res.data),
  });
  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.put(`/conversation/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("conversations");
    },
  });
  const handleRead = (id) => {
    mutation.mutate(id);
  };

  const totalPages = Math.ceil(data?.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, data?.length);

  const currentData = data?.slice(startIndex, endIndex);

  return (
    <div className="messages layout">
      {isLoading ? (
        "Loading..."
      ) : error ? (
        "Something went wrong !"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Messages</h1>
          </div>

          <table>
            <thead>
              <tr>
                <th>{currentUser?.isSeller ? "Buyer" : "Seller"}</th>
                <th>Last Message</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentData?.map((c) => (
                <tr
                  className={
                    (currentUser.isSeller && !c.readBySeller) ||
                    (!currentUser.isSeller && !c.readByBuyer)
                      ? "active"
                      : undefined
                  }
                  key={c.id}
                >
                  <td>
                    <div className="userInfo">
                      {currentUser?.isSeller ? (
                        <>
                          {c?.buyerId?.img ? (
                            <img src={c?.buyerId?.img} alt="pp"></img>
                          ) : (
                            <p
                              className="avatar"
                              style={{
                                backgroundColor: GetColor(c?.buyerId?.username),
                              }}
                            ></p>
                          )}
                          <p className="uname">{c?.buyerId?.username}</p>
                        </>
                      ) : (
                        <>
                          {c?.sellerId?.img ? (
                            <img src={c?.sellerId?.img} alt="pp"></img>
                          ) : (
                            <p
                              className="avatar"
                              style={{
                                backgroundColor: GetColor(
                                  c?.sellerId?.username
                                ),
                              }}
                            >
                              {c?.sellerId?.username?.charAt(0)}
                            </p>
                          )}
                          <p className="uname">{c?.sellerId?.username}</p>
                        </>
                      )}
                    </div>
                  </td>
                  <td>{c?.lastMessage?.substring(0, 50)}...</td>
                  <td>{moment(c?.updatedAt).fromNow()}</td>
                  <td>
                    {(currentUser.isSeller && !c.readBySeller) ||
                    (!currentUser.isSeller && !c.readByBuyer) ? (
                      <Link className="link" to={`/message/${c.id}`}>
                        <button onClick={() => handleRead(c?.id)}>
                          Mark as Read
                        </button>
                      </Link>
                    ) : (
                      <Link className="link" to={`/message/${c.id}`}>
                        <img src="/img/message.png"></img>
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      ></Pagination>{" "}
    </div>
  );
};

export default Messages;

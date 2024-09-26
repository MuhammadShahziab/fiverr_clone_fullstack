import React, { useState } from "react";
import "./Orders.scss";
import Pagination from "../../components/pagination/Pagination";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newrequest";
import { useNavigate } from "react-router-dom";
import getCurrentUser from "../../utils/getCurrentUser";

const Orders = () => {
  const currentUser = getCurrentUser();
  const queryClient = useQueryClient();

  // pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const navigate = useNavigate();

  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () => newRequest.get(`/orders`).then((res) => res.data),
  });

  // Mutation to update the order status
  const mutation = useMutation({
    mutationFn: (updatedOrder) => {
      return newRequest.put(`/orders/${updatedOrder.id}`, updatedOrder);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]);
    },
  });

  const totalPages = Math.ceil(data?.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, data?.length);

  const currentData = data?.slice(startIndex, endIndex);

  // Function to handle status change
  const handleStatusUpdate = (id, isCompleted) => {
    mutation.mutate({
      id,
      isCompleted,
    });
  };

  const handleContact = async (order) => {
    const sellerId = order.sellerId;
    const buyerId = order.buyerId;
    const id = sellerId + buyerId;

    try {
      const res = await newRequest.get(`/conversation/single/${id}`);
      navigate(`/message/${res.data.id}`);
    } catch (err) {
      if (err.response.status === 404) {
        const res = await newRequest.post(`/conversation`, {
          to: currentUser.isSeller ? buyerId : sellerId,
        });
        navigate(`/message/${res.data.id}`);
      }
    }
  };

  return (
    <div className="orders layout">
      <div className="container">
        <div className="title">
          <h1>Orders</h1>
        </div>

        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Status</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>
            {isLoading
              ? "Loading..."
              : error
              ? "Something went wrong"
              : currentData?.map((order) => (
                  <tr key={order._id}>
                    <td>
                      <img className="gigImg" src={order?.img} alt="" />
                    </td>
                    <td>{order?.title}</td>
                    <td>PKR {order?.price}</td>

                    {/* Status Checkboxes */}

                    {currentUser?.isSeller ? (
                      <td>
                        <label className="checkbox-container">
                          <input
                            type="checkbox"
                            checked={!order.isCompleted}
                            onChange={() =>
                              handleStatusUpdate(order._id, false)
                            }
                          />
                          <span className="custom-checkbox pending"></span>
                          Pending
                        </label>
                        <label className="checkbox-container">
                          <input
                            type="checkbox"
                            checked={order.isCompleted}
                            onChange={() => handleStatusUpdate(order._id, true)}
                          />
                          <span className="custom-checkbox completed"></span>
                          Completed
                        </label>
                      </td>
                    ) : (
                      <td>
                        {order?.isCompleted ? (
                          <span style={{ color: "green", fontWeight: "500" }}>
                            {" "}
                            Completed
                          </span>
                        ) : (
                          <span style={{ color: "orange", fontWeight: "500" }}>
                            {" "}
                            Pending!
                          </span>
                        )}
                      </td>
                    )}

                    <td>
                      <img
                        src="/img/message.png"
                        alt="contact"
                        className="message"
                        onClick={() => handleContact(order)}
                      />
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      ></Pagination>{" "}
    </div>
  );
};

export default Orders;

import React, { useEffect, useState } from "react";
import "./Success.scss"; // Import the SCSS file
import { useLocation, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newrequest";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const SuccessPage = () => {
  const { search } = useLocation();
  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const payment_intent = params.get("payment_intent");
  const gigId = params.get("gigId");

  const mutation = useMutation({
    mutationFn: ({ payment_intent, gigId }) => {
      return newRequest.post(`/orders`, { payment_intent, gigId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries("notifications");
      navigate("/orders");
    },
  });

  const makeRequest = async () => {
    mutation.mutate({ payment_intent, gigId });
  };

  return (
    <div className="success-page">
      <div className="success-container">
        <div className="container">
          <h3 className="congratulation">Congratulations!</h3>
          <p>
            Payment successfully completed! You are being redirected to the
            orders page. Please Clicked! .
          </p>
          <button className="confirmBtn" onClick={makeRequest}>
            Confirm
          </button>
          {/* Add more confetti */}
          {[...Array(200)].map((_, index) => (
            <div className="confetti" key={index}></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;

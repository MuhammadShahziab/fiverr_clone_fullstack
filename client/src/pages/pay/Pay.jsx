import React, { useEffect, useState } from "react";
import "./Pay.scss";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import newRequest from "../../utils/newrequest";
import { useParams } from "react-router-dom";
import CheckoutForm from "../../components/checkoutForm/CheckoutForm";
import { useQuery } from "@tanstack/react-query";
const stripePromise = loadStripe(
  "pk_test_51Pz4CUDRfNESodKgig2Kvy45CtfGKAGtMokH1CzIS2JgllSZuIqwsJHQ9ZEKFHzA52GS2K1BOgwhaqt7annJNw2600AJnHGDf5"
);

const Pay = () => {
  const [clientSecret, setClientSecret] = useState("");

  const { id } = useParams();
  const { isLoading, error, data } = useQuery({
    queryKey: ["gig"],
    queryFn: () =>
      newRequest.get(`/gigs/single/${id}`).then((res) => {
        return res.data;
      }),
  });
  const {
    isLoading: userLoading,
    error: userError,
    data: userData,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      newRequest.get(`/users/${data?.userId}`).then((res) => {
        return res.data;
      }),
  });

  useEffect(() => {
    const makePaymentIntent = async () => {
      try {
        const res = await newRequest.post(
          `/orders/create-payment-intent/${id}`
        );
        setClientSecret(res.data.clientSecret);
      } catch (error) {
        console.log(error);
      }
    };
    makePaymentIntent();
  }, [id]);
  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="pay layout">
      {clientSecret && (
        <div className="box">
          {isLoading ? (
            "Loading..."
          ) : error ? (
            "Something went wrong"
          ) : (
            <div className="left">
              <img src={data?.images[0]} />

              <div className="info">
                <div className="item">
                  <p>Seller</p> <p>{userData?.username}</p>
                </div>
                <div className="item">
                  <p>Country</p> <p>{userData?.country}</p>
                </div>
                <div className="item">
                  <p>Price</p> <p>RS:{data?.price}</p>
                </div>{" "}
                <div className="item">
                  <p>Fiverr Tax</p> <p>2%</p>
                </div>
                <div className="item">
                  <p>Total Price</p> <p>RS:{data?.price + 500}</p>
                </div>
              </div>
            </div>
          )}

          <div className="right">
            {" "}
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm gigId={id} />
            </Elements>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pay;

import React, { useState } from "react";
import "./CheckoutForm.scss";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { ClipLoader } from "react-spinners";
const CheckoutForm = ({ gigId }) => {
  const stripe = useStripe();
  const elements = useElements();

  //   const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `https://fiverr-clone-fullstack-1.onrender.com/success?gigId=${gigId}`,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" options={paymentElementOptions} />

      <button
        className="checkoutBtn"
        disabled={isLoading || !stripe || !elements}
        id="submit"
      >
        {isLoading ? (
          <>
            <ClipLoader color="white" size={20} />
            Processing...{" "}
          </>
        ) : (
          "Pay now"
        )}
      </button>
      {/* Show any error or success messages */}
    </form>
  );
};

export default CheckoutForm;

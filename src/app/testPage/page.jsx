"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import React from "react";
import CheckoutForm from "@/components/stripe/CheckoutForm";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
);

export default function TestPage() {
  const [clientSecret, setClientSecret] = React.useState("");
  const getClientSecret = async () => {
    const response = await axios.post("/api/user/payment_method", {
      amount: 1000,
    });
    console.log(response);
    setClientSecret(response.data.clientSecret);
  };
  const appearance = {
    theme: "stripe",
    variables: {
      colorPrimary: "#f79b45",
      colorText: "#7a7b85",
    },
  };
  const options = {
    clientSecret,
    appearance,
  };
  React.useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    getClientSecret();
  }, []);
  return (
    <div className="main">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}

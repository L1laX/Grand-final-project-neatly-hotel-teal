import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import PrimaryBtn from "@/components/common/PrimaryBtn";
import { Input } from "../ui/input";
import LoadingPage from "../common/LoadingPage";
import axios from "axios";
import { stripe } from "@/lib/stripe";
export default function CheckoutForm({
  prevStep,
  promotionCode,
  setPromotionCode,
  isPromotion,
  displayCode,
  setCurrentStep,
  values,
  request,
  setValues,
}) {
  const Stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");
  React.useEffect(() => {
    if (!Stripe) {
      return;
    }
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret",
    );
    if (!clientSecret) {
      return;
    }
  }, [Stripe, isPromotion]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!Stripe || !elements) {
      return;
    }
    setIsLoading(true);
    const data = await Stripe.confirmPayment({
      elements,
      redirect: "if_required",
      confirmParams: {},
    });
    if (data.error) {
      alert(data.error.message);
    }

    if (data.paymentIntent?.status === "succeeded") {
      toast.success("Payment succeeded!", {
        position: "top-center",
        autoClose: 2000,
      });
      const response = await stripe.paymentMethods.retrieve(
        data.paymentIntent.payment_method,
      );
      let paymentType;
      if (response.card) {
        paymentType = response.card.last4;
      } else {
        paymentType = response.type;
      }
      setValues({
        ...values,
        request: request,
        paymentType: paymentType,
        paymentStatus: data.paymentIntent.status,
      });
      const sendData = {
        ...values,
        request: request,
        paymentType: paymentType,
        paymentStatus: data.paymentIntent.status,
      };

      const result = await axios.post(`/api/user/customer_booking`, {
        ...sendData,
      });

      setCurrentStep(4);
    }
    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: {
      type: "accordion",
      defaultCollapsed: false,
      radios: false,
      spacedAccordionItems: true,
    },
  };

  return (
    <section className="ml-20 flex flex-col justify-center">
      <form id="payment-form" onSubmit={handleSubmit} className=" w-full">
        <PaymentElement id="payment-element" options={paymentElementOptions} />

        <div className="promotion-code-container pb-10">
          <label htmlFor="Promotion Code">
            Promotion Code
            <Input
              className="grid outline-none"
              type="text"
              name="Promotion Code"
              onChange={(e) => {
                setPromotionCode(e.target.value);
              }}
              value={promotionCode}
              placeholder="NEATLYNEW400"
            />
          </label>
          {displayCode && (
            <div className="mt-5">
              Promotion code applied :{" "}
              <span className="text-orange-500">
                {" "}
                {displayCode.toUpperCase()}
              </span>
            </div>
          )}
        </div>

        <div className=" flex flex-row justify-between">
          <button className="visitlink" onClick={prevStep}>
            Back
          </button>
          <span disabled={isLoading || !Stripe || !elements} id="submit">
            <span id="button-text">
              {isLoading ? (
                <PrimaryBtn
                  btnName="Confirm Booking"
                  isLoading={true}
                ></PrimaryBtn>
              ) : (
                <>
                  <PrimaryBtn btnName="Confirm Booking"></PrimaryBtn>
                </>
              )}
            </span>
          </span>
        </div>
        <ToastContainer position="top-center" />
      </form>
    </section>
  );
}

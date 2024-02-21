import React from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import PrimaryBtn from "@/components/common/PrimaryBtn";
import { Input } from "../ui/input";
import LoadingPage from "../common/LoadingPage";
export default function CheckoutForm({
  prevStep,
  promotionCode,
  setPromotionCode,
  isPromotion,
  displayCode,
  setCurrentStep,
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");
  React.useEffect(() => {
    if (!stripe) {
      return;
    }
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret",
    );
    if (!clientSecret) {
      return;
    }
  }, [stripe, isPromotion]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);
    const data = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
      confirmParams: {
        return_url: "http://localhost:3000/booking/success",
      },
    });
    console.log(data);
    if (data.error) {
      alert(data.error.message);
    }

    if (data.paymentIntent?.status === "succeeded") {
      alert("Payment succeeded!");
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
            <div>
              Promotion code applied !: <span>{displayCode}</span>
            </div>
          )}
        </div>

        <div className=" flex flex-row justify-between">
          <button className="visitlink" onClick={prevStep}>
            Back
          </button>
          <span disabled={isLoading || !stripe || !elements} id="submit">
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
      </form>
    </section>
  );
}

// import { useState } from "react";
// import { Input } from "@/components/ui/input";
// import DatePicker from "@/components/ui/DatePicker";
// import Country from "@/components/common/Country";
// import PrimaryBtn from "@/components/common/PrimaryBtn";
// import { Button } from "react-day-picker";

// // Step 3 : FormPayment

// const FormPayment = ({ prevStep }) => {
//   const [selectPayment, setSelectPayment] = useState("cardPayment");

//   const handleSelect = (paymentMtd) => {
//     setSelectPayment(paymentMtd);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//   };

//   return (
//     <form className="mr-6 rounded bg-white p-10" onSubmit={handleSubmit}>
//       {/* Payment Method */}
//       <div className="flex justify-evenly">
//         <button
//           className={` mb-10 h-20 w-48 rounded text-[#9AA1B9] shadow-lg ${
//             selectPayment === "cardPayment"
//               ? "border-2 border-[#e76b39]  text-[#e76b39]"
//               : ""
//           } `}
//           onClick={() => {
//             handleSelect("cardPayment");
//           }}
//         >
//           Credit Card
//         </button>

//         <button
//           className={` mb-10 h-20 w-48 rounded text-[#9AA1B9] shadow-lg ${
//             selectPayment === "qrPayment"
//               ? "border-2 border-[#e76b39]  text-[#e76b39]"
//               : ""
//           } `}
//           onClick={() => {
//             handleSelect("qrPayment");
//           }}
//         >
//           QR Code
//         </button>
//       </div>

//       {/* Credit Card */}
//       {selectPayment === "cardPayment" && (
//         <>
//           <h5 className="mb-10 text-[#9AA1B9]">Credit Card</h5>
//           <div className="card-number-container grid grid-cols-1 pb-10">
//             <label htmlFor="fullname">
//               Card Number
//               <Input
//                 className="grid outline-none"
//                 type="text"
//                 name="Card Number"
//                 onChange={(e) => {
//                   e.target.value;
//                 }}
//                 value=""
//                 placeholder="888 8888 8 88 88"
//               />
//             </label>
//           </div>
//           <div className=" card-owner-container pb-10">
//             <label htmlFor="email">
//               Card Owner
//               <Input
//                 className="grid outline-none"
//                 type="text"
//                 name="Card Owner"
//                 onChange={(e) => {
//                   e.target.value;
//                 }}
//                 value=""
//                 placeholder="Card Owner"
//               />
//             </label>
//           </div>
//           <div className="expiry-date-container pb-10">
//             <label htmlFor="Expiry Date">
//               Expiry Date
//               <div>
//                 <DatePicker
//                   selected=""
//                   onSelect={(e) => {
//                     e.target.value;
//                   }}
//                 />
//               </div>
//             </label>
//           </div>
//           <div className=" cvc-cvv-container pb-10">
//             <label htmlFor="cvc/cvv">
//               CVC/CVV
//               <Input
//                 className="grid outline-none"
//                 type="text"
//                 name="cvc/cvv"
//                 onChange={(e) => {
//                   e.target.value;
//                 }}
//                 value=""
//                 placeholder="cvc/cvv"
//               />
//             </label>
//           </div>

// <div className="promotion-code-container pb-10">
//   <label htmlFor="Promotion Code">
//     Promotion Code
//     <Input
//       className="grid outline-none"
//       type="text"
//       name="Promotion Code"
//       onChange={(e) => {
//         e.target.value;
//       }}
//       value=""
//       placeholder="NEATLYNEW400"
//     />
//   </label>
// </div>
//         </>
//       )}

//       {/* QR Code */}
//       {selectPayment === "qrPayment" && (
//         <>
//           <div className="qrcode-container grid grid-cols-1 pb-10">
//             <h5 className="mb-10 text-[#9AA1B9]">QR Code</h5>
//           </div>
//         </>
//       )}

//       {/* Booking Button */}
//       <div className=" flex flex-row justify-between">
//         <button className="visitlink" onClick={prevStep}>
//           Back
//         </button>
//         <PrimaryBtn
//           btnName="Confirm Booking"
//           handleClick={prevStep}
//         ></PrimaryBtn>
//       </div>
//     </form>
//   );
// };

// export default FormPayment;

"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import React from "react";
import CheckoutForm from "@/components/stripe/CheckoutForm";
import { v4 as uuidv4 } from "uuid";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
);

export default function FormPayment({
  prevStep,
  values,
  setValues,
  promotionCode,
  setPromotionCode,
  testtest,
  totalAdditionalPrice,
  setCurrentStep,
  request,
}) {
  const [clientSecret, setClientSecret] = React.useState("");
  const [isPromotion, setIsPromotion] = React.useState(false);
  const [displayCode, setDisplayCode] = React.useState("");
  const [paymentIntent_id, setPaymentIntent_id] = React.useState("");
  const [unique_key_number, setUnique_key_number] = React.useState(0);
  const getClientSecret = async (amount, istrue) => {
    const unique_key = uuidv4();
    console.log(amount);
    const response = await axios.post(
      "/api/user/payment_method/payment_intent",
      {
        amount: +amount || 1000,
        isPromotion: istrue || false,
        intent_id: paymentIntent_id || null,
        customer_id: values.payment_id || null,
      },
    );
    setClientSecret(response.data.clientSecret);
    setPaymentIntent_id(response.data.paymentIntent_id);
    setValues({
      ...values,
      payment_id: response.data.customer,
      order_id: response.data.paymentIntent_id,
    });
    setUnique_key_number(unique_key);
  };
  const checkPromotion = (promotion) => {
    if (promotion === "NEATLYNEW400") {
      setDisplayCode(promotion);
      setIsPromotion(true);
      return 400;
    }
    if (promotion === "NEATLYNEW500") {
      setDisplayCode(promotion);
      setIsPromotion(true);
      return 500;
    }
    setIsPromotion(false);
    setDisplayCode("");
    return values.amount;
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
    checkPromotion(promotionCode);
    if (promotionCode) {
      const newAmount = checkPromotion(promotionCode);
      setIsPromotion(true);
      if (newAmount) {
        getClientSecret(values.totalPrice + totalAdditionalPrice, true);
      }
    } else {
      console.log("test");
      getClientSecret(values.totalPrice + totalAdditionalPrice);
      setIsPromotion(false);
    }
  }, [promotionCode]);
  return (
    <div className="main mr-6 rounded bg-white p-10">
      {clientSecret && (
        <Elements
          key={unique_key_number}
          options={options}
          stripe={stripePromise}
        >
          <CheckoutForm
            prevStep={prevStep}
            promotionCode={promotionCode}
            setPromotionCode={setPromotionCode}
            isPromotion={isPromotion}
            displayCode={displayCode}
            setCurrentStep={setCurrentStep}
            setValues={setValues}
            values={values}
            request={request}
          />
        </Elements>
      )}
    </div>
  );
}

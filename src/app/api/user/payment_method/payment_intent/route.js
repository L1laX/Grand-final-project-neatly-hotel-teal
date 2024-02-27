import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(request, response) {
  const { amount, isUpdate, intent_id, customer_id } = await request.json();
  let customer = customer_id || null;
  if (!customer) {
    customer = await stripe.customers.create();
  }

  if (isUpdate && intent_id) {
    try {
      const paymentIntent = await stripe.paymentIntents.update(intent_id, {
        amount: +amount * 100,
        currency: "THB",
        customer: customer,
      });
      console.log(paymentIntent, "paymentIntent");
      return NextResponse.json({
        clientSecret: paymentIntent.client_secret,
        customer: customer.id,
        paymentIntent_id: paymentIntent.id,
      });
    } catch (e) {
      console.log(e);
    }
  }
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      customer: customer_id ? customer : customer.id,
      amount: +amount * 100,
      payment_method_types: ["card", "promptpay"],
      currency: "THB",
    });
    console.log(paymentIntent, "paymentIntent");
    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntent_id: paymentIntent.id,
      customer: customer.id,
    });
  } catch (e) {
    console.log(e);
  }
}

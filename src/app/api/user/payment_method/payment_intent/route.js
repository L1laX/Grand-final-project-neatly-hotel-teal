import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(request, response) {
  const { amount, isUpdate, intent_id, customer_id, name, email } =
    await request.json();
  console.log(customer_id, "customer_id");
  let customer = customer_id + "" || null;

  try {
    if (!customer) {
      customer = await stripe.customers.create({
        name: name,
        email: email,
      });
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }

  if (isUpdate && intent_id) {
    console.log(
      amount,
      "amount",
      +amount * 100,
      "amount*100",
      customer,
      "customer",
    );
    try {
      const paymentIntent = await stripe.paymentIntents.update(intent_id, {
        amount: +amount * 100,
        currency: "THB",
        customer: customer,
      });

      return NextResponse.json(
        {
          clientSecret: paymentIntent.client_secret,
          customer: customer.id,
          paymentIntent_id: paymentIntent.id,
        },
        { status: 200 },
      );
    } catch (e) {
      return NextResponse.json({ error: e.message }, { status: 500 });
    }
  }
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      customer: customer_id ? customer : customer.id,
      amount: +amount * 100,
      payment_method_types: ["card", "promptpay"],
      currency: "THB",
    });
    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntent_id: paymentIntent.id,
      customer_id: customer,
    });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

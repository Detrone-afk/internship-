import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
  apiVersion: null, // ✅ Kept as it was (no change)
});

export async function POST(request: Request) {  
  try {
    const data = await request.json();
    const amount = Number(data.amount);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, 
      currency: "usd", // ✅ Lowercase to follow Stripe standards
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret }, { status: 200 }); // ✅ Wrapped in object
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 }); // ✅ Proper error handling
  }
}

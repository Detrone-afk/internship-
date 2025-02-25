"use client";
import { loadStripe } from "@stripe/stripe-js";
import { useSearchParams } from "next/navigation";
import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptions } from "@stripe/stripe-js"; // ✅ Fix: Correct import
import React, { Suspense } from "react";
import CheckOutForm from "@/components/Payment/CheckOutForm";

function PaymentWrapper() {
  const searchParam = useSearchParams();
  const amount = Number(searchParam.get("amount")) || 80; // ✅ Fix: Convert `amount` to number

  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string | undefined); // ✅ Fix: Ensure correct type

  const options: StripeElementsOptions = {
    amount: amount * 100, //
    mode: "payment",
    currency: "usd",
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckOutForm amount={amount} />
    </Elements>
  );
}

export default function Payment() {
  return (
    <Suspense fallback={<div>Loading...</div>}> {/* ✅ Wrap with Suspense */}
      <PaymentWrapper />
    </Suspense>
  );
}

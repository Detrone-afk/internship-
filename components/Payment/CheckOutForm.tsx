import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CheckOutForm({ amount }: { amount: number }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false); // ✅ Button state added

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true); // ✅ Set button to processing state

    const { error: submitError } = await elements.submit();
    if (submitError) {
      toast.error("Payment Failed!", { position: "top-right", autoClose: 3000 });
      setIsProcessing(false);
      return;
    }

    const response = await fetch("/api/create-intent", {
      method: "POST",
      body: JSON.stringify({ amount }),
    });

    const { clientSecret } = await response.json(); // ✅ Extract clientSecret properly
    console.log("Generated Token:", clientSecret); // ✅ Log token

    if (clientSecret) {
      toast.success(" Payment Done!", {
        position: "top-right",
        autoClose: 5000,
        className: "bg-green-500 text-white font-bold text-center",
      });
    } else {
      toast.error(" Token Generation Failed!", {
        position: "top-right",
        autoClose: 3000,
      });
      setIsProcessing(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      clientSecret, // ✅ Use extracted clientSecret (string)
      elements,
      confirmParams: { return_url: "https://detrone.vercel.app/payment-success" },
    });

    if (error) {
      toast.error(" Payment Failed!", { position: "top-right", autoClose: 3000 });
    }

    setIsProcessing(false); // ✅ Reset button state after payment attempt
  };

  return (
    <div className="flex flex-col justify-center items-center w-full mt-6">
      <ToastContainer /> {/* ✅ Keep your toast as it was */}

      <h2 className="m-5 font-bold"> Amount to pay : {amount}₹</h2>
      <form onSubmit={handleSubmit} className="max-w-md">
        <PaymentElement />
        <button
          type="submit"
          className={`w-full p-2 rounded-lg mt-2 transition-all duration-200 ${
            isProcessing ? "bg-white text-green-500 border border-black" : "bg-green-500 text-white"
          }`}
          disabled={isProcessing}
        >
          {isProcessing ? "Processing..." : "Pay"}
        </button>
      </form>
    </div>
  );
}

export default CheckOutForm;

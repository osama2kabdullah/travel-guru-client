import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../App";
import Button from "../Common/Button";
import Header from "../Common/Header";

const stripePromise = loadStripe(
  "pk_test_51Lrk6ECWQr2AWNW60Q0xqteLAO2GxvVvgS7vqsoLDX0SZuoE1agWgRjqtpBZ87niJWjsT373Ly5QQPFUOkgmYUNt00HU7L2Viv"
);

const PayBookinng = () => {
  const { placeName } = useParams();
  const [cost, setCost] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/userbookings", {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("authorization_token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        data.forEach((element) => {
          if (element.toPlace === placeName) {
            setCost(element.hotel.Hotelcost);
          }
        });
      });
  }, [placeName]);

  return (
    <div>
      <Header black="black" />

      <Elements stripe={stripePromise}>
        <CheckoutForm cost={cost} placeName={placeName}/>
      </Elements>
    </div>
  );
};

//CheckoutForm
const CheckoutForm = ({ cost, placeName }) => {
  const stripe = useStripe();
  const [error, setError] = useState();
  const [success, setSuccess] = useState("");
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const currentUser = useContext(AppContext);
  const [transection, setTransection] = useState('');

  //update user data
  useEffect(() => {
    if (transection && currentUser) {
        const {id, currency, amount} = transection;
      fetch("http://localhost:5000/updateforpay/" + currentUser?.email + '/'+ placeName, {
        method: "PUT",
        headers: {
          authorization: `Bearer ${localStorage.getItem(
            "authorization_token"
          )}`,
          "content-type": "application/json",
        },
        body:JSON.stringify({id, amount, currency})
      }).then(res=>res.json()).then(data=>{
        console.log(data);
      })
    }
  }, [transection, currentUser, placeName]);

  //payment intent
  useEffect(() => {
    setSuccess("");
    if (cost) {
      fetch("http://localhost:5000/paymentIntent", {
        method: "POST",
        headers: {
          authorization: `Bearer ${localStorage.getItem(
            "authorization_token"
          )}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({ cost }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.clientSecret) {
            setClientSecret(data.clientSecret);
          }
        });
    }
  }, [cost]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
    }

    //confirm card payment
    const { paymentIntent, error: cardPayErr } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            email: currentUser?.email,
          },
        },
      });

    if (cardPayErr) {
      setError(cardPayErr.message);
      setSuccess("");
    } else {
      setTransection(paymentIntent);
      setSuccess("Congrates! Your payment is recived");
      setError("");
    }
  };

  return (
    <form
      className="max-w-md mx-auto p-5 rounded-xl border"
      onSubmit={handleSubmit}
    >
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />

      {error && <p className="py-12 text-red-500">{error}</p>}
      {success && <p className="py-12 text-green-500">{success}</p>}

      <button
        className="pt-5"
        type="submit"
        disabled={!stripe || !clientSecret || !currentUser}
      >
        <Button>Pay</Button>
      </button>
    </form>
  );
};

export default PayBookinng;

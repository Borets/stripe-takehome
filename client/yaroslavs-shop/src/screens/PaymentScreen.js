import React, { useEffect, useReducer } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

function PaymentScreen(props) {
  const stripe = useStripe();
  const elements = useElements();


  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  var orderData = {
    amount: 1099, 
    currency: "usd"
  };

  const fetchPaymentIntent = async ({ orderData }) => {
    
    return fetch('/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({orderData}),
    }).then((res) => res.json());
    
  };

  const clientsecret = async () => {
    const payintent = await fetchPaymentIntent(orderData)
    console.log(payintent);
    return payintent.clientSecret
  }

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    console.log("existing early");

    if (!stripe || !elements) {

      console.log("existing early");
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    console.log("things are fine");
    const result = await stripe.confirmCardPayment(await clientsecret(), {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: 'Jenny Rosen',
        },
      }
    });

    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      console.log(result.error.message);
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === 'succeeded') {
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
        props.history.push("/success");
      }
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      Card details
      <CardElement options={CARD_ELEMENT_OPTIONS} />
      <button type="submit">Submit</button>
    </form>
  );

}

export default PaymentScreen; 
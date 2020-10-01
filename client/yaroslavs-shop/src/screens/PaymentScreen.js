import React, { useRef } from 'react'
import { useSelector } from 'react-redux';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';


function PaymentScreen(props) {
  const stripe = useStripe();
  const elements = useElements();

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;
  const carttotal = cartItems.reduce((a, c) => a + c.price * c.qty, 0)

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

  const orderData = {
    amount: carttotal, 
    currency: "usd", 
    cart: cartItems
   };

  const nameForm = useRef(null)
 
  const fetchPaymentIntent = async (orderData) => {
  
    console.log("Order Data is")
    console.log(orderData)

    return fetch('/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData)
    }).then((res) => res.json());
    
  };

  const clientsecret = async () => {
    const payintent = await fetchPaymentIntent(orderData)

    return payintent.clientSecret
  }

  const SubmitOrderSuccess = async (result) => {
    
    const MsgBody = {
        date: new Date(result.created*1000).toLocaleString(),
        order_id: result.id,
        name: result.shipping.name,
        amount: (result.amount/100).toFixed(2), 
        receipt_email: result.receipt_email, 
        payment_status: result.status, 
        status: "to be fulfilled"
    } 

    return await fetch('/payment-success', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(MsgBody)
    
     }).then(props.history.push("/ordersuccess/"+result.id));

 }

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {

    // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    const form = nameForm.current

    const result = await stripe.confirmCardPayment(await clientsecret(), {
      receipt_email: form['email'].value,
      shipping: {
        address: {
          line1: form['address'].value,
          city:  form['city'].value,
          state: form['state'].value,
          postal_code: form['postal_code'].value
        },
        name: form['name'].value
      },
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: form['name'].value,
        },
      }
    });


    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      console.log(result.error.message);
      if (result.error.decline_code === 'insufficient_funds') {
      }

    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === 'succeeded') {
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
        console.log("Submitted Payment Intent")
        await SubmitOrderSuccess(result.paymentIntent);
        
      } 
    }
  };


  return ( <div className = "payment">
    
    <form onSubmit={handleSubmit} ref={nameForm}>
    <section>
          <h2>Shipping &amp; Billing Information</h2>
          <fieldset className="with-state">
            <label>
              <span>Name</span>
              <input name="name" className="field" placeholder="Jenny Rosen" required></input>
            </label>
            <label>
              <span>Email</span>
              <input name="email" type="email" className="field" placeholder="jenny@example.com" required></input>
            </label>
            <label>
              <span>Address</span>
              <input name="address" className="field" placeholder="185 Berry Street Suite 550"></input>
            </label>
            <label className="city">
              <span>City</span>
              <input name="city" className="field" placeholder="San Francisco"></input>
            </label>
            <label className="state">
              <span>State</span>
              <input name="state" className="field" placeholder="CA"></input>
            </label>
            <label className="zip">
              <span>ZIP</span>
              <input name="postal_code" className="field" placeholder="94107"></input>
              </label>
            <label className="country">
              <span>Country</span>
              <input name="country" className="field" placeholder="United States"></input>
                </label>
          </fieldset>
        </section>
        <section>
        <h2>Payment Information</h2>
        <fieldset className="with-state">
    
      <label className="credit-card">Credit Card </label>

      <CardElement options={CARD_ELEMENT_OPTIONS} />
     
      <button className = "payment" type="submit">Pay ${carttotal}</button>
      </fieldset>
      </section>
    </form>
    </div>
  );

}

export default PaymentScreen; 



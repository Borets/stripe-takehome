import express from 'express'; 
import data from './data'; 
import dotenv from 'dotenv';
import bodyParser from 'body-parser'


const { resolve } = require('path');

const app = express(); 

const config = dotenv.config()

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


function calculateOrderAmount (cart) {
  const cartvalue = cart.reduce((a, c) => a + c.price * c.qty, 0) 
  return cartvalue * 100
}

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.post("/create-payment-intent", async (req, res) => {
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount (JSON.parse(JSON.stringify(req.body.cart))),
    currency: 'usd',
    metadata: {integration_check: 'accept_a_payment'},
  });

  // Send publishable key and PaymentIntent details to client
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    clientSecret: paymentIntent.client_secret
  });
});


app.get("/api/products/:id", (req, res) => {
    const productId = req.params.id;
    const product = data.products.find(x => x._id === productId);
    if (product)
      res.send(product);
    else
      res.status(404).send({ msg: "Product Not Found." })
  });
  
app.get("/api/products", (req, res) => {
    res.send(data.products);
})

app.get('/secret', async (req, res) => {
  const intent = paymentIntent; 
  res.json({client_secret: intent.client_secret});
});

app.get('/config', async (req, res) => {
  const price = await stripe.prices.retrieve(process.env.PRICE);

  res.send({
    publicKey: process.env.STRIPE_PUBLISHABLE_KEY,
    unitAmount: price.unit_amount,
    currency: price.currency,
  
  });
});


app.get('/checkout-session', async (req, res) => {
  const { sessionId } = req.query;
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  res.send(session);
});

app.post('/create-checkout-session', async (req, res) => {
  const domainURL = process.env.DOMAIN;

  // const { locale } = req.body;
  // Create new Checkout Session for the order
  // Other optional params include:
  // [billing_address_collection] - to display billing address details on the page
  // [customer] - if you have an existing Stripe Customer ID
  // [customer_email] - lets you prefill the email input in the Checkout page
  // For full details see https://stripe.com/docs/api/checkout/sessions/create
  const session = await stripe.checkout.sessions.create({
    payment_method_types: process.env.PAYMENT_METHODS.split(', '),
    mode: 'payment',
    locale: 'auto',
    line_items: [
      {
        // price: process.env.PRICE,
        price_data: {
          currency: 'usd',
          unit_amount: 1200, 
          product_data: { 
            name: 'Great Pin',
            description: 'Better Pin',
          },
        },
        quantity: 1
      },
    ],
    // ?session_id={CHECKOUT_SESSION_ID} means the redirect will have the session ID set as a query param
    success_url: `http://localhost:3000`,
    cancel_url: `http://localhost:3000/cancel`,

  });

  res.send({
    sessionId: session.id,
  });
});


app.listen(5000, () => {console.log("Server started at http://localhost:5000")} )


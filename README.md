## stripe-takehome
This is take home from stripe that is currently in progress. 

## Know Issues 
* Original tutorials mentioned MongoDB but it is really hard '


## Next Steps
* Build a few extra steps in the checkout experience. 
    * Collect Shipping Information 
    * Evaluate if I need to connect a Real DB

* Connect Stripe + fulfill their requirements

* Create a friction log


## Stripe's Evaluation Criteria
*Evaluation Criteria*
* Your program is able to easily run through the test (https://stripe.com/docs/payments/accept-a-payment#web-test-integration) cases on Stripe.com.
* The integration should keep a registry of all the successful payments that you would need to fulfill. You can append a line to a log file for every successful payment. You can use the Stripe CLI to test that webhooks work.
* README on your app (please provide instructions for the reviewer of how they should set up and test your implementation -- assume your reviewer has no experience in the language / framework that you choose).
* Again, we are not evaluating the design of your website.
* And lastly, a reminder that the friction-log is even more important than the integration. We look forward to reading more of your feedback on the integration experience (again, with a focus on the PaymentIntents integration) and any thoughts you have on the product design.

\


## Run Locally

### 1. Clone repo

```
$ git clone git@github.com:/Borets/stripe-takehome.git
$ cd stripe-takehome
```

### 2. Run Backend

```
$ npm install
$ npm start
```

### 3. Run Frontend

```
# open new terminal
$ cd client/yaroslavs-shop/
$ npm install
$ npm start
```


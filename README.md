## stripe-take-home-exercise 
The repo contains references on how run the create app as well as descriptions for how to access the log with details of successful payments collected asynchronously 

## How to run the app locally

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

## How to test asynchronous order fulfillment   

### 1. Install Stripe CLI
```
brew install stripe/stripe-cli/stripe
```

### 2. Listen + forward events to the server

```
stripe listen --forward-to http://localhost:5000/webhook
```

### 3. Complete the checkout & pay 

1. Navigate to the app 
```
http://localhost:3000 
```

2. Add items to cart 

3. Complete the checkout process and fill out the payment form 
```
Credit card : 4242 4242 4242 4242
Exp: Any future date
Zip: Any 
```

4. Navigate to the link below or click `Past Orders` access the log of succesfull payments
```
http://localhost:5000/Successfulorders.log
```
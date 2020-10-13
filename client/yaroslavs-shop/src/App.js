import React from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import HomeScreen from './Screens/HomeScreen';
import PaymentScreen from './Screens/PaymentScreen';
import ProductScreen from './Screens/ProductScreen';
import OrderSuccessScreen from './Screens/OrderSuccesScreen'
import CartScreen from './Screens/CartScreen';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import './App.css';

const stripePromise = loadStripe('pk_test_QWyqYoftE0qNtrsi62EozHql');

function App() {

  // const openMenu = () =>{
  //   document.querySelector(".sidebar").classList.add("open");
  // }

  // const closeMenu = () => {
  //   document.querySelector(".sidebar").classList.remove("open");
  // }

  return (
    <Elements stripe={stripePromise}>
    <BrowserRouter>
    <div className="grid-container">
        <header className="header">
            <div className="brand">
                  {/* <button onClick={openMenu} >
                    &#9776;
                  </button> */}
                <Link to="/">My Pin Shop</Link> 
            </div>
                <div className="header-links">
                    <a href="/cart">Cart</a> 
                    <a href="http://localhost:5000/Successfulorders.log">Past Orders</a> 
                </div>
            </header>
        
            <main className="main">
                <div className="content">
                  <Route path="/" exact={true} component={HomeScreen} /> 
                  <Route path="/cart/:id?" component={CartScreen} />
                  <Route path="/product/:id" component={ProductScreen} />
                  <Route path="/details" component={PaymentScreen} />
                  <Route path="/ordersuccess/:clientsecret" component={OrderSuccessScreen} />
                </div>
            </main>
      <footer className="footer">
          All Rights Reserved
      </footer>
    </div>
    
    </BrowserRouter>
    </Elements>
  );
}

export default App;

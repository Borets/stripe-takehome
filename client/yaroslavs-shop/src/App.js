import React from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import PaymentScreen from './screens/PaymentScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import './App.css';

const stripePromise = loadStripe('pk_test_QWyqYoftE0qNtrsi62EozHql');

function App() {

  const openMenu = () =>{
    document.querySelector(".sidebar").classList.add("open");
  }

  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  }

  return (
    <Elements stripe={stripePromise}>
    <BrowserRouter>
    <div className="grid-container">
        <header className="header">
            <div className="brand">
                  <button onClick={openMenu} >
                    &#9776;
                  </button>
                <Link to="/">My Pin Shop</Link> 
            </div>
                <div className="header-links">
                    <a href="cart.html">Cart </a> 
                    <a href="signin.html">Sign In</a>
                </div>
            </header>
            <aside className="sidebar">
                <h3>Shopping Categories</h3>
                <button className="sidebar-close-button" onClick={closeMenu}>x</button>
                <ul>
                    <li>
                        <a href="index.html">Pins</a>
                    </li>
                    <li>
                        <a href="index.html">Not Pins</a>
                    </li>
                    <li>
                      
                    </li>
                </ul>
            </aside>
            <main className="main">
                <div className="content">
                  <Route path="/" exact={true} component={HomeScreen} /> 
                  <Route path="/cart/:id?" component={CartScreen} />
                  <Route path="/product/:id" component={ProductScreen} />
                  <Route path="/details" component={PaymentScreen} />
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

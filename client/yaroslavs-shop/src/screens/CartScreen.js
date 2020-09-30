import React, { useEffect } from 'react'
import { addToCart, removeFromCart } from '../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import { loadStripe } from '@stripe/stripe-js';

function CartScreen(props) {

    const cart = useSelector(state => state.cart);
  
    const { cartItems } = cart;
  
    const state = {
      quantity: 1,
      price: null,
      loading: false,
      error: null,
      stripe: null,
    };

    // const formatPrice = ({ amount, currency, quantity }) => {
    //   const numberFormat = new Intl.NumberFormat('en-US', {
    //     style: 'currency',
    //     currency,
    //     currencyDisplay: 'symbol',
    //   });
    //   const parts = numberFormat.formatToParts(amount);
    //   let zeroDecimalCurrency = true;
    //   for (let part of parts) {
    //     if (part.type === 'decimal') {
    //       zeroDecimalCurrency = false;
    //     }
    //   }
    //   amount = zeroDecimalCurrency ? amount : amount / 100;
    //   const total = (quantity * amount).toFixed(2);
    //   return numberFormat.format(total);
    // };
    

    const productId = props.match.params.id;
    const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1;
    const dispatch = useDispatch();
    const removeFromCartHandler = (productId) => {
      dispatch(removeFromCart(productId));
    }
    useEffect(() => {
      if (productId) {
        dispatch(addToCart(productId, qty));
      }
    }, []);
  
    const checkoutHandler = () => {
      props.history.push("/details");
    }
    
    // const fetchCheckoutSession = async ({ quantity }) => {
    //   return fetch('/create-checkout-session', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       quantity,
    //     }),
    //   }).then((res) => res.json());
    // };
  
    // const handleClick = async (event) => {
    //   const stripe = await loadStripe('pk_test_QWyqYoftE0qNtrsi62EozHql')
    //   // Call your backend to create the Checkout session.
    //   dispatch({ type: 'setLoading', payload: { loading: true } });
    //   const { sessionId } = await fetchCheckoutSession({
    //     quantity: state.quantity,
        
    //     // quantity: state.quantity,
    //   });
    //   // When the customer clicks on the button, redirect them to Checkout.
    //   const { error } = await stripe.redirectToCheckout({
    //     sessionId,
    //   });
    //   // If `redirectToCheckout` fails due to a browser or network
    //   // error, display the localized error message to your customer
    //   // using `error.message`.
    //   if (error) {
    //     dispatch({ type: 'setError', payload: { error } });
    //     dispatch({ type: 'setLoading', payload: { loading: false } });
    //   }
    // };


    return <div className="cart">
      <div className="cart-list">
        <ul className="cart-list-container">
          <li>
            <h3>
              Shopping Cart
            </h3>
            <div>
              Price
            </div>
          </li>
          {
            cartItems.length === 0 ?
              <div>
                Cart is empty
            </div>
              :
              cartItems.map(item =>
                <li>
                  <div className="cart-image">
                    <img src={item.image} alt="product" />
                  </div>
                  <div className="cart-name">
                    <div>
                      <Link to={"/product/" + item.product}>
                        {item.name}
                      </Link>
  
                    </div>
                    <div>
                      Qty:
                    <select value={item.qty} onChange={(e) => dispatch(addToCart(item.product, parseInt(e.target.value)))}>
                        {[...Array(item.countInStock).keys()].map(x =>
                          <option key={x + 1} value={x + 1}>{x + 1}</option>
                        )}
                      </select>
            
                      <button type="button" className="delete-button" onClick={() => removeFromCartHandler(item.product)} >
                       Delete
                      </button>
                    </div>
                  </div>
                  <div className="cart-price">
                    ${item.price}
                  </div>
                </li>
              )
          }
        </ul>
  
      </div>
      <div className="cart-action">
        <h3>
          Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items)
          :
           $ {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
        </h3>
        <button onClick={checkoutHandler} className="button primary full-width" disabled={cartItems.length === 0}>
          Proceed to Checkout
        </button>
  
      </div>
  
    </div>
  }
  
  export default CartScreen;
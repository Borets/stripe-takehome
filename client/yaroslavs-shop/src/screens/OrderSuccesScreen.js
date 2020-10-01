import React, { useEffect, useReducer } from 'react'
import {useStripe} from '@stripe/react-stripe-js';
import { Link } from 'react-router-dom';

function OrderSuccessScreen(props) {

  const ClientSecret = props.match.params.clientsecret

  return <div>
            <div className="back-to-result"> 
            <Link to="/">Take Me Home</Link>
        </div>
            <h1>Order Successful</h1>
            <p>Order ID {ClientSecret}</p>
    </div>    

  }
  export default OrderSuccessScreen;
import React, { useEffect, useReducer } from 'react'

import { Link } from 'react-router-dom';

function OrderSuccessScreen(props) {

  return <div>
            <div className="back-to-result"> 
            <Link to="/">Take Me Home</Link>
        </div>
            <h1>Order Successful</h1>
            <h1></h1>
    </div>    

  }
  export default OrderSuccessScreen;
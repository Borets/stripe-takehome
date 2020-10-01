import React, { useEffect, useReducer } from 'react'
import { Link } from 'react-router-dom';

function OrderSuccessScreen(props) {

  const ClientSecret = props.match.params.clientsecret

  return <div>
            <div className="back-to-result"> 
              <Link to="/">Take Me Home</Link>
            </div>
  
            <div className="orderSucess">  
              <h1>Order Successful!</h1>
              <h3>Your pins will be arriving shortly! </h3>
              <p>Order ID {ClientSecret}</p>
              <p>Follow the link below to be redirected to a log file with a full history</p>
              <div className="past-orders-link"> 
                  <a href="http://localhost:5000/Successfulorders.log">View Past Orders</a>
              </div>
            

            </div>    
            
            

         
         </div>
  }
  
  
  export default OrderSuccessScreen;
import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import StripeCheckout from "react-stripe-checkout";
import Swal from "sweetalert2";
import Loader from "../components/Loader";
import Error from "../components/Error";
import STRINGS from "../constant";
import {useCart} from 'react-use-cart'
import Test from "./test";
import { Checkbox, Divider } from 'antd';
import 'antd/dist/antd.css';


function CartCard({ bookingDetails }) {

  
  return (
    <div className="m-5">
      <div className="row justify-content-center mt-5 bs">

          <div className="col-md-6">
            <div style={{ textAlign: "left" }}>
              <h1><b>Booking Details</b></h1>
              {/* <hr /> */}
              
                <p>
                  Branch Name : {bookingDetails.name}
                </p>
                <p>Check In Date : {bookingDetails.from}</p>
                <p>Check Out Date : {bookingDetails.to}</p>
               
             
                <p>Total Days : {bookingDetails.totaldays}</p>
                <b><p>Total Amount : ${bookingDetails.price}</p></b>
              
              
            </div>

            
          </div>
        </div>
    </div>
  );
}

export default CartCard;

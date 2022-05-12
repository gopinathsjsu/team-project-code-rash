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

          <div className="col-md-12">
            <div style={{ textAlign: "left" }}>
              <h1 style={{textAlign:"center"}}><b>Booking Details</b></h1>
              <hr />
              
                <p>
                  <b>Branch Name : </b>{bookingDetails.room_details.name}
                </p>
                <p><b>Check In Date : </b>{bookingDetails.from}</p>
                <p><b>Check Out Date : </b>{bookingDetails.to}</p>
                <p><b>Total Days : </b>{bookingDetails.totaldays}</p>
                <p><b>Total Amount : </b>${bookingDetails.price}</p>
              
            </div>

            
          </div>
        </div>
    </div>
  );
}

export default CartCard;

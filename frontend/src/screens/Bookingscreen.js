import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import StripeCheckout from "react-stripe-checkout";
import Swal from "sweetalert2";
import Loader from "../components/Loader";
import Error from "../components/Error";
import STRINGS from "../constant";
import Test from "./test";
import { Checkbox, Divider } from 'antd';
import 'antd/dist/antd.css';


function Bookingscreen({ match }) {

  const CheckboxGroup = Checkbox.Group;
  const plainOptions = ['Continental Breakfast', 'Fitness Room', 'Swimming Pool/Jacuzzi', 'Parking', 'meals  (Breakfast, Lunch, Dinner)'];
  const defaultCheckedList = [];

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [room, setRoom] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalDays, setTotalDays] = useState(0);
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);

  

  const roomid = match.params.roomid;
  const fromdate = moment(match.params.fromdate, "DD-MM-YYYY");
  const todate = moment(match.params.todate, "DD-MM-YYYY");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) {
      window.location.href = "/login";
    }
    async function fetchMyAPI() {
      try {
        setError("");
        setLoading(true);
        const data = (
          await axios.post(STRINGS.url + "/api/rooms/getroombyid", {
            roomid: match.params.roomid,
          })
        ).data;
        //console.log(data);
        setRoom(data);
      } catch (error) {
        console.log(error);
        setError(error);
      }
      setLoading(false);
    }

    fetchMyAPI();
  }, []);

  useEffect(() => {
    const totaldays = moment.duration(todate.diff(fromdate)).asDays() + 1;
    setTotalDays(totaldays);
    setTotalAmount(totalDays * room.rentperday);
  }, [room]);

  const onToken = async (token) => {
    console.log(token);
    const bookingDetails = {
      room,
      userid: JSON.parse(localStorage.getItem("currentUser"))._id,
      fromdate,
      todate,
      totalAmount,
      totaldays: totalDays,
      amenities: checkedList
    };

    console.log(bookingDetails);

    try {
      setLoading(true);
      const result = await axios.post(STRINGS.url + "/api/bookings/bookroom", bookingDetails);
      setLoading(false);
      Swal.fire(
        "Congratulations",
        "Your booking has been done successfully!!",
        "success"
      ).then((result) => {
        window.location.href = "/home";
      });
    } catch (error) {
      setError(error);
      Swal.fire("Opps", "Error:" + error, "error");
    }
    setLoading(false);
    //TESTING CARD
    //https://stripe.com/docs/testing
    //https://www.npmjs.com/package/react-stripe-checkout
    // fetch("/save-stripe-token", {
    //   method: "POST",
    //   body: JSON.stringify(token),
    // }).then((response) => {
    //   response.json().then((data) => {
    //     alert(`We are in business, ${data.email}`);
    //   });
    // });
  };

  const onChange = (list) => {
    setTotalAmount(totalAmount + (list.length - checkedList.length)*100);
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < plainOptions.length);
    setCheckAll(list.length === plainOptions.length);
  };

  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
    if(e.target.checked)
      setTotalAmount(totalAmount + 500);
    else 
    setTotalAmount(totalAmount - 500);
  };

  return (
    <div className="m-5">
      {loading ? (
        <Loader></Loader>
      ) : error.length > 0 ? (
        <Error msg={error}></Error>
      ) : (
        <div className="row justify-content-center mt-5 bs">

          <div className="col-md-4">
            <h1><b>{room.name}</b></h1>
            <img src={room.imageurls[0]} alt="" className="bigimg" />
          </div>
          
          <div className="col-md-6">
            <div style={{ textAlign: "left" }}>
              <h1><b>Booking Details</b></h1>
              {/* <hr /> */}
              
                <p>
                  Branch Name : {JSON.parse(localStorage.getItem("currentUser")).name}
                </p>
                <p>Check In Date : {match.params.fromdate}</p>
                <p>Check Out Date : {match.params.todate}</p>
                <p>Max Count : {room.maxcount}</p>
                <p>Add Amenities</p>
            </div>
            <div>
              <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
                Check all
              </Checkbox>
              <CheckboxGroup style={{display: "flex", "flex-direction": "column"}} options={plainOptions} value={checkedList} onChange={onChange} />
            </div>
            <div style={{ textAlign: "right" }}><br/>
              <h1>Amount</h1>
              <hr />
              <b>
                <p>Total Days : {totalDays}</p>
                <p>Rent per day : {room.rentperday}</p>
                <p>Total Amount : {totalAmount}</p>
              </b>
            </div>

            <div style={{ float: "left" }}>
              {/* <StripeCheckout
                amount={totalAmount * 100}
                currency="USD"
                token={onToken}
                stripeKey="YOUR PUBLIC STRIP API KEY"
              > */}
                <button className="button2 loginButton" onClick={onToken}>Pay Now</button>
              {/* </StripeCheckout> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Bookingscreen;

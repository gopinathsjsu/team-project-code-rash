import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";
import Swal from "sweetalert2";
import { Tag } from "antd";

import Loader from "../components/Loader";
import Error from "../components/Error";
import STRINGS from "../constant";
import { modify } from "../actions";

function MyBookingScreen() {
  const dispatch = useDispatch();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("currentUser"));

  async function fetchMyAPI() {
    setError("");
    setLoading(true);
    try {
      const data = (
        await axios.post(STRINGS.url +  "/api/bookings/getbookingbyuserid", {
          userid: user._id,
        })
      ).data;
      setBookings(data);
    } catch (error) {
      console.log(error);
      setError(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchMyAPI();
  }, []);

  async function cancelBooking(bookingid, roomid) {
    setError("");
    setLoading(true);
    try {
      const data = (
        await axios.post(STRINGS.url + "/api/bookings/cancelbooking", {
          bookingid,
          roomid,
        })
      ).data;
      setLoading(false);
      Swal.fire(
        "Congratulations!!",
        "Your booking has been cancelled successfully!",
        "success"
      ).then((result) => {
        fetchMyAPI();
      });
    } catch (error) {
      console.log(error);
      //setError(error);
      Swal.fire("Oops", "" + error, "error");
    }
    setLoading(false);
  }


  async function modifyBooking(bookingid, roomid, booking) {
    setError("");
    dispatch(modify(booking));
    window.location.href = "/home";
    try {
      const data = (
        await axios.post(STRINGS.url + "/api/bookings/modifybooking", {
          bookingid,
          roomid,
        })
      ).data;
      setLoading(false);
    } catch (error) {
      console.log(error);
      //setError(error);
      Swal.fire("Oops", "" + error, "error");
    }
    setLoading(false);
  }

  return (
    <div>
      {loading ? (
        <Loader></Loader>
      ) : error.length > 0 ? (
        <Error msg={error}></Error>
      ) : (
        <div className="row">
          <div className="col-md-12  ml-7">
            {bookings &&
              bookings.map((booking) => {
                return (
                  <div className="bs">
                    <h1>{booking.room}</h1>
                    <p>
                      <b>Booking ID : </b> {booking._id}
                    </p>
                    <p>
                      <b>Check In Date : </b> {booking.fromdate}
                    </p>
                    <p>
                      <b>Check Out Date : </b> {booking.todate}
                    </p>
                    {booking.amenities.length > 0 && <p>
                    <b>Amenities : </b> 
                    {/* {JSON.stringify(booking.amenities)} */}
                    {booking.amenities.toString()}
                    </p>}
                    <p>
                      <b>Amount Paid: </b> ${booking.totalamount}
                    </p>
                    <p>
                      <b>Status : </b>{" "}
                      {booking.status === "booked" ? (
                        <Tag color="green">CONFIRMED</Tag>
                      ) : (
                        <Tag color="red">CANCELLED</Tag>
                      )}
                    </p>

                    {booking.status === "booked" && (
                      <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end"}}>
                      <div className="text-right" style={{ marginRight:"5px", marginLeft:"5px"}}>
                      <button
                        className="button2 cancelButton"
                        onClick={() => {
                          modifyBooking(booking._id, booking.roomid, booking);
                        }}
                      >
                        Modify Booking
                      </button>
                    </div>
                      <div className="text-right"  style={{ marginRight:"5px", marginLeft:"5px"}}>
                        <button
                          className="button2 cancelButton"
                          onClick={() => {
                            cancelBooking(booking._id, booking.roomid);
                          }}
                        >
                          Cancel Booking
                        </button>
                      </div>
                      </div>
                    )}

                    {/* {booking.status === "booked" && (
                      
                    )} */}

                  </div>
                  
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}

export default MyBookingScreen;

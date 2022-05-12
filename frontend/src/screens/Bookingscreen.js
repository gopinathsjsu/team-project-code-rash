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
import { useSelector, useDispatch } from "react-redux";
import { modify } from "../actions";


function Bookingscreen({ match }) {

  const CheckboxGroup = Checkbox.Group;
  const plainOptions = ['Continental Breakfast', 'Fitness Room', 'Swimming Pool/Jacuzzi', 'Parking', 'meals  (Breakfast, Lunch, Dinner)'];
  const defaultCheckedList = [];

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [room, setRoom] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalDays, setTotalDays] = useState(0);
  const { isEmpty,totalUniqueItems,items, updateItemQuantity,removeItem} = useCart();
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);
  const [rentperday, setrentperday] = useState(0);
  const [rewards,setrewards] = useState(0);

  const modifyData = useSelector(state => state.modifyData);

  const roomid = match.params.roomid;
  const fromdate = moment(match.params.fromdate, "DD-MM-YYYY");
  const todate = moment(match.params.todate, "DD-MM-YYYY");
  const [rewardsChecked,setrewardsChecked] = useState(false)
  const [rewardsused,setRewardsUsed]=useState(0)
  const [orders,setorders]=useState(0)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    console.log(items)
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
    let totalprice
    //console.log("**********************>",match.params)
      let roomType = match.params.type

      async function getPrices(){
      let totalPrice =  await axios.post(STRINGS.url + "/api/bookings/getprices",{from:fromdate,to:todate,room_type:roomType},res=>{return res})
      console.log("Price--------------->",totalPrice["data"]["totalPrice"])
     // setTotalAmount(totalPrice["data"]["totalPrice"]*totalDays)
     //setrentperday(totalPrice["data"]["totalPrice"]) 
     setTotalAmount(totalPrice["data"]["totalPrice"])
     let userId =  JSON.parse(localStorage.getItem("currentUser"))._id
     let totalRewards = await axios.post(STRINGS.url + "/api/bookings/getRewards",{userid:userId},res=>{return res})
     //let neworder = await axios.post(STRINGS.url + "/api/bookings/modifyRewards",{userid:userId},res=>{return res})

     console.log("Rewards--------------->",totalRewards["data"]["totalRewards"])
     console.log("Orders--------------->",totalRewards["data"]["totalOrders"])

     setrewards(totalRewards["data"]["totalRewards"])
     setorders(totalRewards["data"]["totalOrders"])
     return totalPrice
    }



    //const price = await getPrices()
    let prices = getPrices()

    
  }, []);

  useEffect(() => {
    const totaldays = moment.duration(todate.diff(fromdate)).asDays() + 1;
    setTotalDays(totaldays);
    //setTotalAmount(totalDays * room.rentperday);
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
      amenities: checkedList,
      rewards_used:rewardsused,
      totalOrders:orders+1

    };

    console.log(bookingDetails);

    try {
      setLoading(true);
      const result = await axios.post(STRINGS.url + "/api/bookings/bookroom", bookingDetails);
      dispatch(modify({}))
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
      Swal.fire("Oops", "" + error, "error");
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
    console.log()
    setTotalAmount(totalAmount + (list.length - checkedList.length)*totalDays*10);
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < plainOptions.length);
    setCheckAll(list.length === plainOptions.length);
  };
  const onrewardChanged =(e)=>{
    setrewardsChecked(!rewardsChecked)
    if (rewardsChecked){
        setrewards(rewards+rewardsused)
        setRewardsUsed(0)
        setTotalAmount(rewardsused+totalAmount)
      console.log("checked")

    }
    else{

      if (totalAmount<rewards){
        let diff =rewards-totalAmount
        setrewards(diff)
        setRewardsUsed(totalAmount)
        setTotalAmount(0)
      }
      else{
        let diff =totalAmount-rewards
        setrewards(0)
        setRewardsUsed(rewards)
        setTotalAmount(diff)
      }
      console.log("not checked")
      
    }
  }

  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
    if(e.target.checked)
      setTotalAmount(totalAmount + 50*totalDays);
    else 
    setTotalAmount(totalAmount - 50*totalDays);
  };

  return (
    <div className="m-5">
      {loading ? (
        <Loader></Loader>
      ) : error.length > 0 ? (
        <Error msg={error}></Error>
      ) : (
        <div className="row justify-content-center mt-5 bs">

          <div className="col-md-6">
            <h1><b>{room.name}</b></h1>
            <img src={room.imageurls[0]} alt="" className="bigimg" />
          </div>
          
          <div className="col-md-3">
              <div style={{ textAlign: "left" }}>
              <h1>{modifyData.totalamount ? <b>Modify Details</b> :<b>Booking Details</b>}</h1>
              {/* <hr /> */}
                <br></br>
                <p>
                <b>Branch Name : </b>{JSON.parse(localStorage.getItem("currentUser")).name}
                </p>
                <p><b>Check In Date : </b>{match.params.fromdate}</p>
                <p><b>Check Out Date : </b>{match.params.todate}</p>
                <p><b>Maximum Guests : </b>{room.maxcount}</p><br></br>
                <p><b>Add Amenities</b></p>
            </div>
            <div style={{ textAlign: "left" }}>
              <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
                Check all
              </Checkbox>
              <CheckboxGroup style={{display: "flex", "flex-direction": "column", textAlign: "right"}} options={plainOptions} value={checkedList} onChange={onChange} />
            </div>
          </div>

          {!modifyData.totalamount ?
          <div className="col-md-3">
            <div style={{ textAlign: "right" }}>
              <h1><b>Charges</b></h1>
              {/* <hr /> */}
              <br></br>
              
                <p><b>Total Days of Stay : </b>{totalDays}</p>
                <p><b>Total Amount : </b>${totalAmount}</p>
                <p><b>Rewards Available : </b>${rewards}</p>
                <Checkbox  onChange={onrewardChanged} checked={rewardsChecked}>
                Use Rewards
              </Checkbox>
              
            </div>

            <div style={{ float: "right" }}>
              {/* <StripeCheckout
                amount={totalAmount * 100}
                currency="USD"
                token={onToken}
                stripeKey="YOUR PUBLIC STRIP API KEY"
              > */}
              <br></br>
                <button className="button2 loginButton" onClick={onToken}>Pay Now</button>
              {/* </StripeCheckout> */}
            </div>
          </div> :
          <div className="col-md-3">
            <div style={{ textAlign: "right" }}>
              <h1><b>Changed Amount</b></h1>
              {/* <hr /> */}
                
                <p>Total Days : {totalDays}</p>
                <b><p>Amount Paid : ${modifyData.totalamount}</p></b>
                <b><p>Total Current Amount : ${totalAmount}</p></b>
            </div>
            {totalAmount > modifyData.totalamount ? 

              <div style={{ float: "right" }}>
                  <button className="button2 loginButton" onClick={onToken}>Pay And Modify</button>
              </div> : 

              <div style={{ float: "right" }}>
                <p>addition amount will be added to your accout</p>
                <button className="button2 loginButton" onClick={onToken}>Modify Booking</button>
              </div>
            }
          </div>
          }
        </div>
      )}
    </div>
  );
}

export default Bookingscreen;

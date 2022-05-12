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
import CartCard from "./CartCard";

function CartScreen({ match }) {

  //const CheckboxGroup = Checkbox.Group;
  const plainOptions = ['Continental Breakfast', 'Fitness Room', 'Swimming Pool/Jacuzzi', 'Parking', 'meals  (Breakfast, Lunch, Dinner)'];
  const defaultCheckedList = [];

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

  const roomid = match.params.roomid;
  const fromdate = moment(match.params.fromdate, "DD-MM-YYYY");
  const todate = moment(match.params.todate, "DD-MM-YYYY");
  const [rewardsChecked,setrewardsChecked] = useState(false)
  const [rewardsused,setRewardsUsed]=useState(0)
  const [orders,setorders]=useState(0)

const {cartTotal}  = useCart();
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
            

            {items.map((item) => (

                <CartCard bookingDetails = {item} />


            ))}

            <div style={{ float: "left" }}>
                <h1><b>Amount</b></h1><br></br>
                <b><p>Total Amount : ${cartTotal}</p></b><br></br>
              
                  <Checkbox  onChange={onrewardChanged} checked={rewardsChecked}>
                      <b>Use Rewards</b>
                  </Checkbox>
             </div> 

             <div style={{ float: "right" }}>
              <div style={{ float: "right" }}>
                  <button className="button2 loginButton" onClick={onToken}>Pay Now</button>
                  <br></br>
                  <button className="button2 loginButton" onClick={onToken}>Book More</button>
                  
                {/* </StripeCheckout> */}
              </div>
            </div>

          </div>
        
      )}
    </div>
  );
}

export default CartScreen;

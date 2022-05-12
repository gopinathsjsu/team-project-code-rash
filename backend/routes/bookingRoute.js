const express = require("express");
const moment = require("moment");
const stripe = require("stripe")("YOUR PRIVATE STRIP API KEY"); //
const { v4: uuidv4 } = require("uuid"); //https://www.npmjs.com/package/uuid
const HolidayController = require("../dynamic_pricing_scripts/Holidays")
const router = express.Router();

const Booking = require("../models/booking");
const Room = require("../models/room");
const User = require("../models/user");

router.post("/getallbookings", async (req, res) => {
  try {
    const bookings = await Booking.find();
    // const data = await Booking.aggregate([{
    //   $lookup:
    //   {
    //   from: 'room',
    //   localField: 'roomid',
    //   foreignField: '_id',
    //   as: 'room'
    //   }
    //  }])
    //  console.log(data);
     
    res.send(bookings);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error });
  }
});


router.post("/modifybooking", async (req, res) => {
  const { bookingid, roomid } = req.body;
  try {
    const booking = await Booking.findOneAndDelete({ _id: bookingid });

    // booking.status = "cancelled";
    // await booking.save();
    const room = await Room.findOne({ _id: roomid });
    const bookings = room.currentbookings;
    const temp = bookings.filter((x) => x.bookingid.toString() !== bookingid);
    room.currentbookings = temp;
    await room.save();

    res.status(200).send("Your booking modify successfully");
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error });
  }
});

router.post("/cancelbooking", async (req, res) => {
  const { bookingid, roomid } = req.body;
  try {
    const booking = await Booking.findOne({ _id: bookingid });

    booking.status = "cancelled";
    await booking.save();
    const room = await Room.findOne({ _id: roomid });
    const bookings = room.currentbookings;
    const temp = bookings.filter((x) => x.bookingid.toString() !== bookingid);
    room.currentbookings = temp;
    await room.save();

    res.send("Your booking cancelled successfully");
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error });
  }
});

router.post("/getbookingbyuserid", async (req, res) => {
  const { userid } = req.body;
  try {
    const bookings = await Booking.find({ userid: userid });

    res.send(bookings);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error });
  }
});
router.post("/getRewards",async(req,res)=>{

  try {
    const { userid } =
      req.body;
   

  let user = await User.find({_id:userid})
  //console.log(user)
  //console.log(user[0]["rewards"])
  let rewards= 0
  let current = new Date()
  let credit_orders=0
  //console.log(user[0]["rewards"])
  for(let obj of user[0]["rewards"]){
    
    if (obj["todate"]!=undefined){
      //console.log("her is the date",obj["todate"])
    let date_comps=obj["todate"].split("-")
    //console.log(date_comps)
    to_date_mod=new Date(date_comps[2]+"-"+date_comps[1]+"-"+date_comps[0])
    current.setHours(0,0,0,0)
    to_date_mod.setHours(0,0,0,0)
    //console.log(to_date_mod,current)
    if(to_date_mod>=current){
     // console.log(obj["type"],obj["points"])
     
    if(obj["type"]!=undefined && obj["type"]=="debit"){
      rewards=rewards-obj["points"]
    }
    else{
      credit_orders+=1
      rewards=rewards+obj["points"]
    }
  }
  }
  
  }
  
  console.log("here are the total rewards",rewards)
  return res.status(200).json({ totalRewards: +(Math.round(rewards + "e+2")  + "e-2") ,totalOrders:credit_orders});
} catch (error) {
  console.log(error)
  return res.status(400).json({ message: error });
}
})
router.post("/bookroom", async (req, res) => {

  console.log("booking request received")
  try {
    const { room, userid, from, to, totalAmount, totaldays, amenities, rewards_used,totalOrders } =
      req.body;
    //console.log("booking details are as follows",req.body)
    let fromdate=from
    let todate=to
    try {
      if (true) {
        try {
          const newBooking = new Booking({
            room: room.name,
            roomid: room._id,
            userid,
            fromdate: moment(fromdate).format("DD-MM-YYYY"),
            todate: moment(todate).format("DD-MM-YYYY"),
            totalamount: totalAmount,
            totaldays,
            transactionid: uuidv4(),
            amenities
          });

          const booking = await newBooking.save();
          console.log(userid)
          const roomTmp = await Room.findOne({ _id: room._id });
          //console.log(roomTmp)
          roomTmp.currentbookings.push({
            bookingid: booking._id,
            fromdate: moment(fromdate).format("DD-MM-YYYY"),
            todate: moment(todate).format("DD-MM-YYYY"),
            userid: userid,
            status: booking.status,
          });

          await roomTmp.save();
          console.log
          if(rewards_used>0){
            await User.findOneAndUpdate({_id:userid},{$push : {
              rewards :  {
                bookingid:booking._id,
                fromdate: moment(fromdate).format("DD-MM-YYYY"),
                todate: moment(todate).format("DD-MM-YYYY"),
                points: rewards_used,
                type:"debit"
                     } //inserted data is the object to be inserted 
            }}) 
  
          }
          console.log("reached here 1")
          
          await User.findOneAndUpdate({_id:userid},{$push : {
            rewards :  {
              bookingid:booking._id,
              fromdate: moment(fromdate).format("DD-MM-YYYY"),
              todate: moment(todate).format("DD-MM-YYYY"),
              points: Math.round(totalAmount*0.1*(1+(totalOrders/100))),
              type:"credit"
                   } //inserted data is the object to be inserted 
          }})
      //    let user =User.find({_id:userid})
          console.log("updated the rewards")
          // await User.findByIdAndUpdate({ _id: userid }, { $inc: {'user.rewards': price/10 } });


          res.send("Payment Successful, Your Room is booked");
        } catch (error) {
          console.log(error)
          return res.status(400).json({ message: error });
        }
      }
    } catch (error) {
      console.log(error)
          
      return res.status(400).json({ message: error });
    }
  } catch (error) {
    console.log(error)
          
    return res.status(400).json({ message: error });
  }
});


router.post("/getprices", async (req, res) => {
  try {
    const { from, to ,room_type} =
      req.body;
    
    
    try {
      let holidaysList = HolidayController.generateHolidays()
      
      //console.log("holidayList",holidaysList)
      console.log(room_type)
      let basePrice=30
      if (room_type=="Single Room"){
        basePrice=30
      }
      else if(room_type=="Double Room"){
        basePrice=50
      }
      else{
        basePrice=70
      }
      let total = HolidayController.checkDates(new Date(from),new Date(to),holidaysList,basePrice)
     // console.log("reached here",total)
      return res.status(200).json({ totalPrice: total });
      
    } catch (error) {
      console.log(error)
    
      return res.status(400).json({ message: error });
    }
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/modifyRewards", async (req, res) => {
  try {
    const { user, order ,neworder} =
      req.body;
    let newtotal=0
     
    User.updateOne({'_id':user._id,"rewards.bookingid": order._id}, {'$set': {
      'rewards.$.bookingid': neworder._id,
      'rewards.$.fromdate': neworder.fromdate,
      'rewards.$.todate': neworder.todate,
      'rewards.$.points': Math.round(neworder.total*0.1),
    
  }})

  return res.status(200).json({ message: "order updated successfully" });
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: error });
  }
});



module.exports = router;

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

router.post("/bookroom", async (req, res) => {
  try {
    const { room, userid, fromdate, todate, totalAmount, totaldays, amenities, token } =
      req.body;

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

          const roomTmp = await Room.findOne({ _id: room._id });
          roomTmp.currentbookings.push({
            bookingid: booking._id,
            fromdate: moment(fromdate).format("DD-MM-YYYY"),
            todate: moment(todate).format("DD-MM-YYYY"),
            userid: userid,
            status: booking.status,
          });

          await roomTmp.save();

          // await User.findByIdAndUpdate({ _id: userid }, { $inc: {'user.rewards': price/10 } });


          res.send("Payment Successful, Your Room is booked");
        } catch (error) {
          return res.status(400).json({ message: error });
        }
      }
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});


router.post("/getprices", async (req, res) => {
  try {
    const { from, to } =
      req.body;
    const basePrice =25
    
    try {
      let holidaysList = HolidayController.generateHolidays()
      
      //console.log("holidayList",holidaysList)
      console.log(from)
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

module.exports = router;

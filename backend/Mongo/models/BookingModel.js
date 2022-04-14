
var mongoose=require("mongoose")
const Schema= mongoose.Schema



const BookingModel = new Schema ({
    userID:{type:String,required:true},
    branchID:{type:String,required:true},
    roomNum:{type:Number,required:true},
    bookingStartDate:{type:Date,required:true},
    bookingEndDate:{type:Date,required:true},
    createdOn:{type:Date,required:true},
    updatedOn:{type:Date,required:true},
    bookingAmount:{type:Number,required:true},
     
})
const bookingsmodel = mongoose.model('room',BookingModel)
module.exports=bookingsmodel;
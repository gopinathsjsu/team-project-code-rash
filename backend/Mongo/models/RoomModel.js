
var mongoose=require("mongoose")
const Schema= mongoose.Schema



const RoomsModel = new Schema ({
    
    branchID:{type:String,required:true},
    roomType:{type:String,required:true},
    roomNum:{type:Number,required:true},
    status:{type:String,required:true}
     
})
const roomsmodel = mongoose.model('room',RoomsModel)
module.exports=roomsmodel;
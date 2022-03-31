var mongoose=require("mongoose")
const Schema= mongoose.Schema
const BranchModel = new Schema ({
    branchName:{type:String,required:true},
    address:{type:String,required:true},
    zipcode:{type:String,required:true},
    contact:{type:String,required:true},
    email:{type:String,required:false},
    city:{type:String,required:true},
    state:{type:String,required:true},
    country:{type:String,required:true},
    ownerID:{type:String,required:true},
    singleRooms:{type:Number,required:true},
    doubleRooms:{type:Number,required:true},

})

const restomodel = mongoose.model('Branch',BranchModel)
module.exports=restomodel;
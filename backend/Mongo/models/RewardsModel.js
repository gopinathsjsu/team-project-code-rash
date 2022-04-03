
var mongoose=require("mongoose")
const Schema= mongoose.Schema



const RewardsModel = new Schema ({
    userID:{type:String,required:true},
    visits:{type:Number,required:true,default:0},
    points:{type:Number,required:true,default:0},
    createdOn:{type:Date,required:true},
    updatedOn:{type:Date,required:false},
    redeemedOn:{type:Date,required:false}
     
})
const rewardsmodel = mongoose.model('rewards',RewardsModel)
module.exports=rewardsmodel;
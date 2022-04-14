var mongoose=require("mongoose")
const Schema= mongoose.Schema
const UserModel = new Schema ({
    email:{type:String,required:true},
    fullname:{type:String,required:true},
    address:{type:String,required:true},
    city:{type:String,required:true},
    state:{type:String,required:true},
    country:{type:String,required:true},
    zipcode:{type:String,required:true},
    contact:{type:String,required:true},
    pwd:{type:String,required:true},

    usertype:{type:String,required:true},//this will tell us if the current user is a branch owner or customer
},
{
    versionKey:false
}
);

const customermodel = mongoose.model('customer',UserModel)
module.exports=customermodel;
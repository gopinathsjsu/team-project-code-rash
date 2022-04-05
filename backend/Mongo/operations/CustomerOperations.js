
var User = require("../models/UserModel")

exports.login=async function(req,res){
    
    
    console.log("login request received")
    let user=req.body
    
    User.findOne({email:user.email,pwd:user.password},async (err,dummy)=>{
        if (err){
            res.writeHead(500,{
                'Content-Type' : 'text/plain'
            })
            res.end("error")
        }
      
        if(dummy){
            res.cookie('cookie',"admin",{maxAge: 1000000, httpOnly: false, path : '/'});
            res.writeHead(200,{
                'Content-Type' : 'text/plain'
            })
            res.end("account exists")
        }
        else{
            res.writeHead(202,{
                'Content-Type' : 'text/plain'
            })
            res.end("account does not exist")
        }
    })
  }

  exports.signup = async function(req,res){
    console.log("signup request received")
    let user=JSON.parse(req.body.data)
    user = new Customer(user)
    Customer.findOne({email:user.email},async (err,dummy)=>{
        if (err){
            res.writeHead(500,{
                'Content-Type' : 'text/plain'
            })
            res.end("error")
        }
        if(dummy){
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("account already exists")
        }
        else{
            user.save((err,data)=>{
                if (err){
                    res.writeHead(500,{
                        'Content-Type' : 'text/plain'
                    })
                    res.end("error in inserting")
                }
                else{
                    res.writeHead(200,{
                        'Content-Type' : 'text/plain'
                    })
                    res.end("successfully inserted the user")
                    }
                })
             }
    })
}
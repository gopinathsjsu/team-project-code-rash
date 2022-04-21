//start your server on port 3001
var express = require('express');
var app = express();
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var host="http://localhost"
var bodyParser = require('body-parser');
var Customer = require('./Mongo/models/UserModel')
var router = express.Router()
app.set('view engine', 'ejs');
const roomsRoute = require("./routes/roomRoute");
const usersRoute = require("./routes/userRoute");
const bookingRoute = require("./routes/bookingRoute");

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

const { default: connectMongoDB } = require('./utils/dbConnection');
//use cors to allow cross origin resource sharing
app.use(cors({ origin: host+':3000', credentials: true }));

//use express session to maintain session data
app.use(session({
    secret              : 'cmpe_202_team_project',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000
}));

// app.use(bodyParser.urlencoded({
//     extended: true
//   }));

//Allow Access Control
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', host+':3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });


//login api
app.post('/api/login',userController.login);

//customer signup request
app.post('/api/signup',userController.signup);

//get the predicted prices
app.get('/api/getPrices/discount',priceController.getprices);

app.listen(3001);
connectMongoDB();
console.log("Server Listening on port 3001");
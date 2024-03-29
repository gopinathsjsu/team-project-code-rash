//start your server on port 3001
var express = require('express');
var app = express();
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var host="http://localhost"
var bodyParser = require('body-parser');
var router = express.Router()
app.set('view engine', 'ejs');
const dbConfig = require("./db");
const roomsRoute = require("./routes/roomRoute");
const usersRoute = require("./routes/userRoute");
const bookingRoute = require("./routes/bookingRoute");

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

//use cors to allow cross origin resource sharing

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
// app.use(function(req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', host+':3000');
//     res.setHeader('Access-Control-Allow-Credentials', 'true');
//     res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
//     res.setHeader('Cache-Control', 'no-cache');
//     next();
//   });

  var corsOptions = {
    // origin: "http://team7-1-3-2103565225.us-west-1.elb.amazonaws.com",
    // origin: "http://54.183.182.209:3000",
    origin: "http://localhost:3000",
    "Access-Control-Allow-Origin": "*",
    credentials: "true",
  };
  app.use(cors(corsOptions));


  app.use(express.json());
  app.get("/checkHealth", (req, res) => {
    res.status(200).send("Up and Running from CMPE202");
  });
  app.use("/api/rooms", roomsRoute);
  app.use("/api/users", usersRoute);
  app.use("/api/bookings", bookingRoute);
  
  const port = process.env.PORT || 3001;
  app.get("/", (req, res) => res.send("Hello from Team Code Rash!"));
  app.listen(port, () => console.log(`Node app listening on ${port} port!`));
import './App.css';
import { BrowserRouter, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import LandingScreen from "./screens/LandingScreen";
import Homescreen from './screens/Homescreen';
import Bookingscreen from './screens/Bookingscreen';
import ProfileScreen from './screens/ProfileScreen';
import AdminScreen from './screens/AdminScreen';

//App Component
export default function App() {
  return (
    <div className="App">
     <Navbar />
      <BrowserRouter>
        <Route path="/" exact component={LandingScreen} />
        <Route path="/home" exact component={Homescreen} />
        <Route
          path="/book/:roomid/:fromdate/:todate"
          exact
          component={Bookingscreen}
        />
        <Route path="/register" exact component={RegisterScreen} />
        <Route path="/login" exact component={LoginScreen} />
        <Route path="/profile" exact component={ProfileScreen} />
        <Route path="/bookings" exact component={ProfileScreen} />
        <Route path="/admin" exact component={AdminScreen} />
      </BrowserRouter>
    </div>
  );
}

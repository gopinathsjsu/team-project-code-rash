import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import { Tag } from "antd";

import MyBookingScreen from "./MyBookingScreen";
import axios from "axios";
import STRINGS from "../constant";

function ProfileScreen() {
  const { TabPane } = Tabs;
const [pending_rewards,setpending_rewards]=useState(0)
const [claimed_rewards,setclaimed_rewards]=useState(0)
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    async function fetchapi(){
    let totalRewards = await axios.post(STRINGS.url + "/api/bookings/getRewards",{userid:user._id},res=>{return res})
    console.log(totalRewards)
    setpending_rewards(totalRewards["data"]["pendingRewards"])
    setclaimed_rewards(totalRewards["data"]["totalRewards"])
    
    }
    fetchapi()
    if (!user) {
      window.location.href = "/login";
    }
  }, []);

  function callback(key) {
    console.log(key);
  }

  return (
    <div className="ml-3 mt-3">
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="PROFILE" key="1">
          <div className="row">
            <div className="col-xs-12 ml-5 mb-5">
              <div className="bs2">
                {/* <b>My Profile</b> */}
                <b>Name : </b>{user.name}<br></br><br></br>
                <b>Email : </b>{user.email}<br></br><br></br>
                
                {/* {{pending_rewards} && {pending_rewards}} */}

                <b>Rewards Pending : </b>${pending_rewards}<br></br><br></br>
                <b>Rewards Available : </b>${claimed_rewards}<br></br>

                {/* <p>
                  IsAdmin :{" "}
                  {user.isAdmin ? (
                    <Tag color="green">YES</Tag>
                  ) : (
                    <Tag color="red">NO</Tag>
                  )}
                </p> */}
              </div>
            </div>
          </div>
        </TabPane>
        <TabPane tab="MY BOOKINGS" key="2">
        <div className="bs2">
          <MyBookingScreen></MyBookingScreen>
        </div>
        </TabPane>
      </Tabs>
      {/* <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br> */}

      
    </div>
  );
}

export default ProfileScreen;

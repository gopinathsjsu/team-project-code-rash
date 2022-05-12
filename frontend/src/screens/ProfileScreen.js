import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import { Tag } from "antd";

import MyBookingScreen from "./MyBookingScreen";
const { TabPane } = Tabs;

function ProfileScreen() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
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
                <b>Rewards Available : </b>${}<br></br>
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

import React, { useState, useEffect } from "react";

import { Tabs } from "antd";
import AdminBookingScreen from "./AdminBookingScreen";
import AdminRoomScreen from "./AdminRoomScreen";
import AdminUserScreen from "./AdminUserScreen";
import AdminAddRoomScreen from "./AdminAddRoomScreen";
const { TabPane } = Tabs;
function callback(key) {
  console.log(key);
}
function AdminScreen() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (!user || user.isAdmin == false) {
      window.location.href = "/home";
    }
  }, []);

  return (
    <div className="ml-3 mt-3 mr-3 bs">
      <h1 className="text-center">ADMIN PANEL</h1>
      <Tabs defaultActiveKey="1" onChange={callback}>
      <TabPane tab="USERS" key="1">
          <AdminUserScreen></AdminUserScreen>
        </TabPane>
        <TabPane tab="BOOKINGS" key="2">
          <AdminBookingScreen></AdminBookingScreen>
        </TabPane>
        <TabPane tab="ROOMS" key="3">
          <AdminRoomScreen></AdminRoomScreen>
        </TabPane>
        <TabPane tab="ADD ROOM" key="4">
          <AdminAddRoomScreen></AdminAddRoomScreen>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default AdminScreen;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Tag, Space } from "antd";

import Loader from "../components/Loader";
import Error from "../components/Error";
import STRINGS from "../constant";

function AdminRoomScreen() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const columns = [
    {
      title: "Room ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Branch Name",
      dataIndex: "name",
      key: "name",
    },
    { title: "Maximum Guests", dataIndex: "maxcount", key: "maxcount" },
    { title: "Phone Number", dataIndex: "phonenumber", key: "phonenumber" },
    { title: "Rent per day", dataIndex: "rentperday", key: "rentperday" },
    { title: "Type", dataIndex: "type", key: "type" },
  ];

  async function fetchMyData() {
    setError("");
    setLoading(true);
    try {
      const data = (await axios.post(STRINGS.url + "/api/rooms/getallrooms")).data;
      setRooms(data);
    } catch (error) {
      console.log(error);
      setError(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchMyData();
  }, []);

  return (
    <div className="row">
      {loading ? (
        <Loader></Loader>
      ) : error.length > 0 ? (
        <Error msg={error}></Error>
      ) : (
        <>
          <div className="col md-12 text-right">
            <button className="btn btn-success" onClick={fetchMyData}>
            {/* <i class="fa-solid fa-arrows-rotate"></i> */}
              Refresh
            </button>
          </div>
          <div className="col-md-12">
            <Table columns={columns} dataSource={rooms} />
          </div>
        </>
      )}
    </div>
  );
}

export default AdminRoomScreen;

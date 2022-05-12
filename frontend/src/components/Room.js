import React, { useState, useEffect } from "react";
import { Modal, Button, Carousel } from "react-bootstrap";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { CartProvider, useCart } from "react-use-cart";
function Room({ room, fromDate, toDate }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { addItem } = useCart();

  
  return (
    <div className="row bs">
      <div className="col-md-4">
        <img src={room.imageurls[0]} className="smallimg" alt="" />
      </div>
      <div className="col-md-8">
        <h1>{room.name}</h1>
          <p><b>Room Type : </b> {room.type}</p>
          <p><b>Maximum Guests : </b> {room.maxcount}</p>
          <p><b>Contact Number : </b> {room.phonenumber}</p>

        <div style={{ float: "left" }}>
          {fromDate && toDate && (
            <Link to={`/book/${room.type}/${room._id}/${fromDate}/${toDate}`}>
              <button className="button2 loginButton" >Book Now</button>
            </Link>
          )}
        </div>
        
        <div style={{ float: "right" }}>
          <button className="button2 loginButton" onClick={handleShow}>
            View Detail
          </button>
        </div>

      </div>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header>
          <Modal.Title>{room.name}</Modal.Title>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Header>
        <Modal.Body>
        <p>{room.description}</p>
          <Carousel prevLabel="" nextLabel="">
            {room.imageurls.map((url) => {
              return (
                <Carousel.Item>
                  <img
                    className="d-block w-100 bigimg"
                    src={url}
                    alt="First slide"
                  />
                </Carousel.Item>
              );
            })}
          </Carousel>
          {/* <p>{room.description}</p> */}
        </Modal.Body>
        
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer> */}
      </Modal>
    </div>
  );
}

export default Room;

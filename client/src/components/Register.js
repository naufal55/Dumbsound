import React from "react";
import { Modal, Button, Form, DropdownButton, Dropdown } from "react-bootstrap";

export default function Register(props) {
  const inputStyle = {
    color: "white",
    backgroundColor: "#474747",
    border: "2px solid white",
  };

  return (
    <Modal
      className="rounded-5"
      show={props.show}
      onHide={props.handleClose}
      centered
    >
      <Modal.Body className="text-light bg-dark">
        {props.message}
        {/* use submit.mutate */}
        <Form className="m-4" onSubmit={(e) => props.submit.mutate(e)}>
          <h2 className="fw-bold my-3">Register</h2>
          <div className="my-4">
            <Form.Control
              className="mx-auto my-3"
              style={inputStyle}
              onChange={props.handleOnChange}
              value={props.email}
              name="email"
              type="email"
              placeholder="Email"
            />
            <Form.Control
              className="mx-auto my-3"
              style={inputStyle}
              onChange={props.handleOnChange}
              value={props.password}
              name="password"
              type="password"
              placeholder="Password"
            />
            <Form.Control
              className="mx-auto my-3"
              style={inputStyle}
              onChange={props.handleOnChange}
              value={props.fullname}
              name="fullname"
              type="text"
              placeholder="fullname"
            />
            <Form.Select
             className="mx-auto my-3"
             style={inputStyle}
             onChange={props.handleOnChange}
             value={props.gender}
             name="gender"
            >
              <option>Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Form.Select>
            <Form.Control
              className="mx-auto my-3"
              style={inputStyle}
              onChange={props.handleOnChange}
              value={props.phone}
              name="phone"
              type="number"
              placeholder="Phone"
            />
            <Form.Control
              className="mx-auto my-3"
              style={inputStyle}
              onChange={props.handleOnChange}
              value={props.address}
              name="address"
              type="text"
              placeholder="Address"
            />
          </div>
          <Button className="w-100" type="submit" variant="danger">
            Register
          </Button>
          <p className="mt-3 text-center">
            Already have an account? Click
            <span
              className="fw-bold"
              style={{ cursor: "pointer" }}
              onClick={props.handleHere}
            >
              {" "}
              Here
            </span>
          </p>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

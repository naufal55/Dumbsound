import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";

export default function Login(props) {
  // let navigate = useNavigate();

  // const title = 'Login';
  // document.title = 'DumbMerch | ' + title;

  // const [message, setMessage] = useState(null);
  // const [form, setForm] = useState({
  //   email: '',
  //   password: '',
  // });
  // const { email, password } = form;

  // const handleChange = (e) => {
  //   setForm({
  //     ...form,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // const handleSubmit = useMutation(async (e) => {

  // });

  // const handleDelete = () => {
  //     props.setConfirmDelete(true)
  // }
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
        {/* {message && message} */}
        {props.message}
        <Form className="m-4" onSubmit={(e) => props.submit.mutate(e)}>
          <h2 className="fw-bold my-3">Login</h2>
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
          </div>
          <Button className="w-100" type="submit" variant="danger">
            Login
          </Button>
          <p className="mt-3 text-center">
            Dont have any account? Click
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

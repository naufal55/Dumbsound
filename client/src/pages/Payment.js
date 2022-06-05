import React, {useContext, useState } from "react";
import { FiPaperclip } from "react-icons/fi";
import {
  Button,
  Form,
  Container,
  Col,
  Alert,
} from "react-bootstrap";
import { MainNavbar } from "../components";
import { useNavigate } from "react-router-dom";
import { API } from '../config/api';
import { UserContext } from '../context/userContext';
import { useMutation } from "react-query";

export default function Payment(props) {
  const [state, dispatch] = useContext(UserContext);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate()
  
  document.title = "Payment";
  const [form, setForm] = useState({
    bukti: ''
  });

  const inputStyle = {
    color: "white",
    backgroundColor: "#474747",
    border: "2px solid white",
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
    console.log(form);
    // console.log(e.target.files[0].name);
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      };

      // Store data with FormData as object
      const formData = new FormData();
      formData.set('bukti', form.bukti[0], form.bukti[0].name);

      console.log(form.bukti[0]);

      // Insert product data
      const response = await API.post('/transaction', formData, config);
      if(response.data.status === "success"){
        const alert = (
          <Alert variant="success" className="py-1">
            Add Transaction Success
          </Alert>
        );
        setMessage(alert)
        setForm({
          bukti: ''
        })
        navigate('/')
      }else{
        const alert = (
          <Alert variant="danger" className="py-1">
            Failed
          </Alert>
        );
        setMessage(alert)
      }  

      console.log(response);

    } catch (error) {
      console.log(error);
    }
  });

  return (
    <>
      <MainNavbar
         isLogin={state.isLogin}
         profile={state?.user?.fullname?.slice(0,1).toUpperCase()}
          title={state.user.fullname}
      />
      <Container className="text-white pt-4 mt-5">
        <Form onSubmit={(e) => handleSubmit.mutate(e)}>
          <div className="my-4 text-center">
            <h4 className="mb-5">Premium</h4>
            <p>
              Bayar sekarang dan nikmati straming music yang kekinian dari{" "}
              <span className="text-danger fw-bold">DUMB</span>
              <span className="fw-bold">SOUND</span>
            </p>
            <p className="fw-bold">
              <span className="text-danger">DUMB</span>SOUND : 0981312323
            </p>
          </div>
          <Col md={4} sm={12} className="mx-auto">
            {/* <Form.Control
              className="mx-auto mt-4"
              style={inputStyle}
              onChange={props.handleOnChange}
              value={props.name}
              name="name"
              type="text"
              placeholder="Input Your Account Number"
            /> */}
            {message&&message}
            <div
              className="rounded-3 border-white pt-1 pb-2 px-2 mt-4"
              style={inputStyle}
            >
              <label className="col-10" htmlFor="bukti">
              {form?.bukti[0]?.name||'Attach Proof of Transfer'}
              </label>
              <span className="col-2 ps-3">
                <FiPaperclip color="red" />
              </span>
            </div>
            <input
              style={inputStyle}
              onChange={handleChange}
              name="bukti"
              type="file"
              id="bukti"
              hidden="hidden"
            />
            <Button
              className="w-100 text-white mt-5 text-center"
              type="submit"
              variant="warning"
            >
              Add Song
            </Button>
          </Col>
        </Form>
      </Container>
    </>
  );
}

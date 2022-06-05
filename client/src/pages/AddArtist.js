import React, {useContext, useState } from "react";
import { Button, Form, Container, Col, Alert } from "react-bootstrap";
import { useMutation } from "react-query";
import { MainNavbarAdmin } from "../components";
import { API } from '../config/api';
import { UserContext } from '../context/userContext';

export default function AddArtist() {
  document.title = "Add Artist";
  const [state, dispatch] = useContext(UserContext);
  const [message, setMessage] = useState(null);

  const inputStyle = {
    color: "white",
    backgroundColor: "#474747",
    border: "2px solid white",
  };
  const [form, setForm] = useState({
    name: "",
    old: 0,
    solo: "",
    startCareer: 0,
  });

  const handleSubmit= useMutation(async(e)=>{
    try {
      e.preventDefault();
  
      // Configuration Content-type
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
  
      // Data body
      const body = JSON.stringify(form);
  
      // Insert data user to database
      const response = await API.post('/artist', body, config);

      if(response.data.status === "success"){
        const alert = (
          <Alert variant="success" className="py-1">
            Add Artist Success
          </Alert>
        );
        setMessage(alert)
        setForm({
          name: "",
          old: 0,
          solo: "",
          startCareer: 0,
        })
        
      }else{
        const alert = (
          <Alert variant="danger" className="py-1">
            Failed
          </Alert>
        );
        setMessage(alert)
      }  

      console.log(response);

      if(response.data.status === "success"){
        const alert = (
          <Alert variant="success" className="py-1">
            Add Artist Success
          </Alert>
        );
        setMessage(alert)
        setForm({
          name: "",
          old: 0,
          solo: "",
          startCareer: 0,
        })
        
      }else{
        const alert = (
          <Alert variant="danger" className="py-1">
            Failed
          </Alert>
        );
        setMessage(alert)
      }  
      // Handling response here
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Failed
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
    // 
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    console.log(form);
  };

  return (
    <>
      <MainNavbarAdmin
        profile={state?.user?.fullname?.slice(0,1).toUpperCase()}
        title={state.user.fullname}
       />
      <Container className="text-white pt-5 mt-5">
        <Form onSubmit={(e) => handleSubmit.mutate(e)}>
          <h3 className="fw-bold">Add Artist</h3>
          <div className="my-4">
            {message&&message}
            <Form.Control
              className="mx-auto mt-4"
              style={inputStyle}
              onChange={handleChange}
              value={form.name}
              name="name"
              type="text"
              placeholder="Name"
            />

            <Form.Control
              className="mx-auto my-4"
              style={inputStyle}
              onChange={handleChange}
              value={form.old}
              name="old"
              type="number"
              placeholder="old"
            />
            <Form.Select
              className="mx-auto my-4"
              style={inputStyle}
              onChange={handleChange}
              value={form.solo}
              name="solo"
            >
              <option>Singer Type</option>
              <option value="soloist">Soloist</option>
              <option value="band">Band</option>
            </Form.Select>
            <Form.Control
              className="mx-auto my-4"
              style={inputStyle}
              onChange={handleChange}
              value={form.startCareer}
              name="startCareer"
              type="number"
              placeholder="Start a Career"
            />
          </div>
          <Col md={4} sm={12} className="mx-auto">
            <Button
              className="w-100 text-white "
              type="submit"
              variant="success"
            >
              Add Artist
            </Button>
          </Col>
        </Form>
      </Container>
    </>
  );
}

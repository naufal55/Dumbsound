import React, {useContext, useEffect, useState } from "react";
import { useMutation } from "react-query";

import { FiPaperclip } from "react-icons/fi";
import {
  Button,
  Form,
  Container,
  Row,
  Col,
  Alert,
} from "react-bootstrap";
import { MainNavbarAdmin } from "../components";
import { API } from '../config/api';
import { UserContext } from '../context/userContext';

export default function AddMusic(props) {
  document.title = "Add Music";
  const [state, dispatch] = useContext(UserContext);
  const [message, setMessage] = useState(null);

  const [artists, setArtists] = useState([]); //Store all category data


  const [form, setForm] = useState({
    title: '',
    song: '',
    year: 0,
    idArtist: 0,
    filesong: '',
  });

  const getArtist = async () => {
    try {
      const response = await API.get('/artists');
      setArtists(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(artists[0]);
  
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
      formData.set('song', form.song[0], form.song[0].name);
      formData.set('title', form.title);
      formData.set('year', form.year);
      formData.set('idArtist', form.idArtist);
      formData.set('filesong', form.filesong[0], form.filesong[0].name);

      console.log(form.song[0]);

      // Insert product data
      const response = await API.post('/music', formData, config);
      if(response.data.status === "success"){
        const alert = (
          <Alert variant="success" className="py-1">
            Add Music Success
          </Alert>
        );
        setMessage(alert)
        setForm({
          title: '',
          song: '',
          year: 0,
          idArtist: 0,
          filesong: '',
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

    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    getArtist();
  }, []);


  const inputStyle = {
    color: "white",
    backgroundColor: "#474747",
    border: "2px solid white",
  };

  return (
    <>
    <MainNavbarAdmin
        profile={state?.user?.fullname?.slice(0,1).toUpperCase()}
        title={state.user.fullname}
       />
    <Container className="text-white pt-5 mt-5">
      <Form onSubmit={(e) => handleSubmit.mutate(e)}>
        <h3 className="fw-bold">Add Music</h3>
        {message&&message}
        <div className="my-4">
          <Row>
            <Col md={9}>
              <Form.Control
                className="mx-auto mt-4"
                style={inputStyle}
                onChange={handleChange}
                value={form.title}
                name="title"
                type="text"
                placeholder="title"
              />
            </Col>
            <Col md={3}>
              <div
                className="rounded-3 border-white pt-1 pb-2 px-2 mt-4"
                style={inputStyle}
              >
                <label className="col-10" htmlFor="song">
                  {form?.song[0]?.name||'Attach thumbnail'}
                </label>
                <span className="col-2 ps-2">
                  <FiPaperclip color="red" />
                </span>
              </div>
              <input
                className="mx-auto my-4"
                style={inputStyle}
                onChange={handleChange}
                name="song"
                type="file"
                id="song"
                hidden="hidden"
              />
            </Col>
          </Row>

          <Form.Control
            className="mx-auto my-4"
            style={inputStyle}
            onChange={handleChange}
            value={form.year}
            name="year"
            type="number"
            placeholder="year"
          />
 
          <Form.Select
            className="mx-auto my-4"
            style={inputStyle}
            onChange={handleChange}
            value={form.idArtist}
            name="idArtist"
          >
          <option>Singer Name</option>
          {artists.map((item, index) => (
            <option key={index} value={item.id}>{item.name}</option>
          ))}

          </Form.Select>
          <Col md={3}>
            <div
              className="rounded-3 border-white pt-1 pb-2 px-2 mt-4"
              style={inputStyle}
            >
              <label className="col-10" htmlFor="filesong">
              {form?.filesong[0]?.name||'Attach music'}
              </label>
              <span className="col-2 ps-2">
                <FiPaperclip color="red" />
              </span>
            </div>
            <Form.Control
              className="mx-auto my-4"
              style={inputStyle}
              onChange={handleChange}
              name="filesong"
              type="file"
              id="filesong"
              hidden="hidden"
            />
          </Col>
        </div>
        <Col md={4} sm={12} className="mx-auto">
        <Button className="w-100 text-white " type="submit" variant="success">
          Add Song
        </Button>
        </Col>
      </Form>
    </Container>
    </>
  );
}

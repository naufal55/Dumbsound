import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { thumbnail } from "../assets";

export default function CardMusic(props) {
  return (
      <Card onClick={props.handleSong} className="bg-dark my-3" style={{ cursor: "pointer" }}>
        <Card.Img
          className="img-fluid p-2"
          variant="top"
          src={props.image}
          alt={props.title}
          style={{ width:"180px",height:"180px", objectFit:"cover" }}
        />
        <Card.Body className="text-white p-2">
          <Row >
            <Col md={7} xs={7} className="text-truncate">
              <div className="fw-bold text-light" style={{ fontSize:14 }}>{props.title}</div>
              <div style={{ fontSize:12 }}>{props.artist}</div>
            </Col>
            <Col md={5} xs={5}>
              <div className="my-1 text-end" style={{ fontSize:12 }}>{props.year}</div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
  );
}

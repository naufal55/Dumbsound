import React, {useContext} from 'react'
import {HiChatAlt2,HiLogout} from 'react-icons/hi'

import {
  Button,
  Container,
  Nav,
  Navbar,
  Dropdown,
  InputGroup,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from '../context/userContext'


export default function MainNavbar(props) {
  const [state, dispatch] = useContext(UserContext)

  const handleLogout = () => {
      
    console.log(state)
    dispatch({
        type: "LOGOUT"
    })
    navigate("/")
  }

  const navigate = useNavigate()
  return (
    <Navbar
      className="fixed-top"
      collapseOnSelect
      expand="lg"
      bg="transparant"
      variant="dark"
    >
      <Container>
        <Navbar.Brand onClick={props.handleHome} style={{ cursor: "pointer" }}>
          <span className="text-danger">DUMB</span>
          <span>SOUND</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto gap-3 ">
            {props.isLogin ? (
              <InputGroup>
                <div className='text-white fw-bold me-4 mt-2'>Hello, {props.title}</div>
                <label
                  htmlFor="button profil"
                  className="border border-light rounded-circle"
                  style={{ width: 50, height: 50, cursor: "pointer" }}
                >
                  <div className="text-center text-light mt-2 zIndex-1 fw-bold fs-5" data-toggle="tooltip" data-placement="top" title={props.title}>
                    {props.profile}
                  </div>
                </label>

                <Dropdown>
                  <Dropdown.Toggle
                    variant="transparant"
                    align="end"
                    id="button profil"
                    hidden="hidden"
                  ></Dropdown.Toggle>
                  <Dropdown.Menu 
                    style={{ backgroundColor: "#3A3A3A" }}
                  >
                    <Dropdown.Item className="text-light" onClick={()=>navigate('/')} eventKey="3"><HiChatAlt2 color="red"/> Chat Complain</Dropdown.Item>
                    <Dropdown.Divider className="text-light" />
                    <Dropdown.Item className="text-light" onClick={handleLogout} eventKey="4"><HiLogout color="red"/> Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </InputGroup>
            ) : (
              <>
              <Button
                variant="outline-light px-4"
                onClick={props.handleLogin}
              >
                Login
              </Button>
              <Button variant="danger px-3" onClick={props.handleRegister}>
                Register
              </Button>
            </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

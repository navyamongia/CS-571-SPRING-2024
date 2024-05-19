import React, { useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";

import crest from '../../assets/uw-crest.svg'
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";

function BadgerLayout(props) {

    // let [loginStatus, setLoginStatus] =useState(Boolean(sessionStorage.getItem("loggedUser")));
    let [loginStatus, setLoginStatus] = useState();
    if(sessionStorage.getItem("loggedUser")){
        [loginStatus, setLoginStatus] = useState(true)
    }
    else{
        [loginStatus, setLoginStatus] = useState(false)
    }

console.log(sessionStorage.getItem("loggedUser"))
//    console.log(Boolean(sessionStorage.getItem("loggedUser")))
    // const [loginStatus, setLoginStatus] = useState(undefined)
    function display_login(){
        return <>
            <Nav.Link as={Link} to="logout">Logout</Nav.Link>
        </>                   
    }
    function display_logout(){
        return <>
           <Nav.Link as={Link} to="login">Login</Nav.Link>
           <Nav.Link as={Link} to="register">Register</Nav.Link> 
        </>
    }

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        <img
                            alt="BadgerChat Logo"
                            src={crest}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        BadgerChat
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        {
                            loginStatus ? display_login() : display_logout()
                        }

                           
                        <NavDropdown title="Chatrooms">
                            {
                                /* TODO Display a NavDropdown.Item for each chatroom that sends the user to that chatroom! */
                                props.chatrooms.map(c => {
                                    return <NavDropdown.Item as={Link} to={`chatrooms/${c}`} key={c}>
                                        {c}
                                    </NavDropdown.Item>
                                })
                            }
                        </NavDropdown>
                    </Nav>
                </Container>
            </Navbar>
            <div style={{ margin: "1rem" }}>
                <BadgerLoginStatusContext.Provider value={[loginStatus, setLoginStatus]}>
                    <Outlet />
                </BadgerLoginStatusContext.Provider>
            </div>
        </div>
    );
}

export default BadgerLayout;
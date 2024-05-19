import React from 'react';
import { useRef, useState} from "react";
import { useNavigate } from 'react-router';
import { Button, Form } from "react-bootstrap";
import { useContext } from 'react';
import BadgerLoginStatusContext from '../contexts/BadgerLoginStatusContext';
export default function BadgerLogin() {
    const usernameRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();
    const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);
    // TODO Create the login component.
    function handleLoginSubmit(e){
        e?.preventDefault();
        if(usernameRef.current.value && passwordRef.current.value){
            fetch("https://cs571.org/api/s24/hw6/login", {
            method: "POST",
            credentials: "include",
            headers:{
                "X-CS571-ID" : "bid_f1b2b24aab28bd2a2f7852d3b2631b258e7a3e587be609c19a027beb3117e513",
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
               

                username: usernameRef.current.value,
                password: passwordRef.current.value
            })
        })
        .then(res=>{
            console.log(res.status);
           if(res.status === 200){
            setLoginStatus(true);
            sessionStorage.setItem('loggedUser', usernameRef.current.value);
            alert("Login was successful!")
            navigate("/")
           }
           if(res.status=== 401){
            alert( "Incorrect username or password!")
           }
        })
        }
        else{
            alert("You must provide both a username and password!")
        }
        
    }
    return <>
        <h1>Login</h1>
        <Form >
            <Form.Label htmlFor="usernameInput">Username</Form.Label>
            <Form.Control id="usernameInput" ref={usernameRef}></Form.Control>
            
            <Form.Label htmlFor="passwordInput">Password</Form.Label>
            <Form.Control id="passwordInput" type="password" ref={passwordRef}></Form.Control>
            
            <br/>
            <Button type="submit" onClick={handleLoginSubmit}>Login</Button>
        </Form>
    </>
}

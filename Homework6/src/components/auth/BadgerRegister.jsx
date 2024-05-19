 import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useContext } from 'react';
import BadgerLoginStatusContext from '../contexts/BadgerLoginStatusContext';
export default function BadgerRegister() {
    const [username, setUsername] = useState('');
    const[password,setPassword] = useState("");
    const[repeat_password, setrepeatPassword] = useState("");
    const navigate = useNavigate();
    const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);
    
    function handleRegisterSubmit(e) {
        e?.preventDefault(); 
        if(username ==="" || password ==="" || repeat_password==="") {
            alert("You must provide both a username and password!")
        }
        if( password !== repeat_password){
            alert("Your passwords do not match!")
        }
        else{
            fetch("https://cs571.org/api/s24/hw6/register", {
                method: "POST",
                credentials: "include",
                headers:{
                    "X-CS571-ID" : "bid_f1b2b24aab28bd2a2f7852d3b2631b258e7a3e587be609c19a027beb3117e513",
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    
    
                    username: username,
                    password: password
                })
            })
            .then(res=>{
                console.log(res.status);
                if(res.status === 409 ){
                    alert("That username has already been taken!")
                }
                if(res.status === 200){
                    alert("Registration was successful!")
                    setLoginStatus(true)
                    sessionStorage.setItem("loggedUser", username)
                    navigate("/")
                }
                // if(res.status === 200){
                //     setIsLoggedIn(true);
                // }
                // else{
                //     setIsLoggedIn(false);
                //     alert("your username password not correct");
                // }
            })
        }
        }
       


    return <>
        <h1>Register</h1>
        <Form>
            <Form.Label htmlFor="usernameInput">Username</Form.Label>
            <Form.Control id="usernameInput" value={username} onChange={(e) => setUsername(e.target.value)}></Form.Control>

            <Form.Label htmlFor="passwordInput">Password</Form.Label>
            <Form.Control id="passwordInput" value={password} type="password" onChange={(e) => setPassword(e.target.value)}></Form.Control>

            <Form.Label htmlFor ="repeatpasswordInput">Repeat Password</Form.Label>
            <Form.Control id="repeatpasswordInput" value={repeat_password} type="password" onChange={(e) => setrepeatPassword(e.target.value)}></Form.Control>
            <br></br>
        <Button type='submit'onClick={handleRegisterSubmit}>
            Register
        </Button>
        </Form>
       
           

    </>
}

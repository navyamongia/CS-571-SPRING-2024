import React from "react"
import { Card, Button} from "react-bootstrap";
import { useContext } from "react";
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";
function BadgerMessage(props) {
    const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);
    let username = sessionStorage.getItem("loggedUser")
    // console.log(username)
    const dt = new Date(props.created);
    function delete_post(id){
            
            fetch(`https://cs571.org/api/s24/hw6/messages?id=${props.id}` ,{
            method: "DELETE",
                credentials: "include",
                headers:{
                    "X-CS571-ID" : "bid_f1b2b24aab28bd2a2f7852d3b2631b258e7a3e587be609c19a027beb3117e513",
                    "Content-Type" : "application/json"
                }
                
           
         })
         .then(res=>{
            console.log(res.status)
            if(res.status === 200){
                // props.loadMessages();
                alert("Successfuly deleted the post!")
                
                 props.loadMessages();
            }
         })
        
    }
    function delete_btn(){
        if(loginStatus === true && props.poster === username){
             console.log(props.id)
            return <>
                <Button variant="danger" onClick={()=>delete_post(props.id)}>
                    delete 
                </Button>
            </>
        }
        else{
            return; 
        }
    }

    return <Card style={{margin: "0.5rem", padding: "0.5rem"}}>
        <h2>{props.title}</h2>
        <p>Posted on {dt.toLocaleDateString()} at {dt.toLocaleTimeString()}</p>
        <br/>
        <i>{props.poster}</i>
        <p>{props.content}</p>
        {delete_btn()}
    </Card>
}

export default BadgerMessage;
import React, { useEffect, useState } from "react"
import BadgerMessage from "./BadgerMessage";
import { Row, Col, Pagination } from "react-bootstrap";
import { Form , Button} from "react-bootstrap";
import { useContext } from "react";
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";
export default function BadgerChatroom(props) {
    const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);
    const [messages, setMessages] = useState([]);
    const[page, setPage] = useState(1);
    const[inputTitle, setinputTitle] = useState("");
    const[inputContent, setinputContent] = useState("")
    
    const loadMessages = () => {
        fetch(`https://cs571.org/api/s24/hw6/messages?chatroom=${props.name}&page=${page}`, {
            headers: {
                "X-CS571-ID": " bid_f1b2b24aab28bd2a2f7852d3b2631b258e7a3e587be609c19a027beb3117e513"
            }
        }).then(res => res.json()).then(json => {
            setMessages(json.messages)
        })
    };

    function set_pages(){
        let items =[];
        const num_pages = 4;
       
        for(let i = 1; i<= num_pages; i++){
           items.push(
            <Pagination.Item key ={i} active = { page === i} onClick={() => setPage(i)} >
                {i}
                </Pagination.Item>
            
           ) ;
    
        
                
            
        }
        return items;
    }

    
    function display_post(e){
        e?.preventDefault();
        if(inputTitle === "" || inputContent === ""){
         alert("You must provide both a title and content!")
        }
        else{
         fetch(`https://cs571.org/api/s24/hw6/messages?chatroom=${props.name}` ,{
            method: "POST",
                credentials: "include",
                headers:{
                    "X-CS571-ID" : "bid_f1b2b24aab28bd2a2f7852d3b2631b258e7a3e587be609c19a027beb3117e513",
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                  title: inputTitle,
                  content: inputContent
                })
           
         })
         .then(res=>{
            console.log(res.status)
            if(res.status === 200){
                alert("Successfully posted!")
                loadMessages();
            }
         })
        
        }
      }
   
    function create_post(){
         return <>
            <Form>
               
            
                <Form.Label htmlFor="postTitleInput"> Post Title </Form.Label>
                <Form.Control  id="postTitleInput" value={inputTitle} onChange={(e) => setinputTitle(e.target.value)}></Form.Control>
                <Form.Label htmlFor="postContentInput">Post Content</Form.Label>
                <Form.Control id="postContentInput" value={inputContent} onChange={(e) => setinputContent(e.target.value)}></Form.Control>
                <br></br>
                <Button type="submit" onClick={display_post}>
                    Create Post
                </Button>
            </Form>
            
         </>
        
    }

    


    // Why can't we just say []?
    // The BadgerChatroom doesn't unload/reload when switching
    // chatrooms, only its props change! Try it yourself.
    useEffect(loadMessages, [props, page]);
    console.log(messages)

   
    return <>
        <h1>{props.name} Chatroom</h1>
        <hr/>
        {
            /* TODO: Allow an authenticated user to create a post. */
            loginStatus? create_post() : <h2> You must be logged in to post! </h2>
        }
       
        <Row>

        
        {
            messages.length > 0 ?
                messages
                // .slice((page-1) * 25 , page*25)
                .map(m =>{
                    return <Col xs ={12} sm={12} md={6} lg={4} xl={3} key={m.id}>
                    <BadgerMessage
                    {...m}
                    loadMessages ={loadMessages}
                    />
                    </Col>
                })
                :
                <>
                    <p>There are no messages on this page yet!</p>
                </>
        }
        </Row>
        <Pagination>
            {set_pages()}
        </Pagination>
    </>
}

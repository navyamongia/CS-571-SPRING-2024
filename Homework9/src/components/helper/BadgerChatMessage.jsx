import { Text, Button } from "react-native";
import BadgerCard from "./BadgerCard"
import { Alert } from "react-native";
import * as SecureStore from 'expo-secure-store';
function BadgerChatMessage(props) {
  
    const dt = new Date(props.created);
    function deletePost(id){
        SecureStore.getItemAsync('jwt').then(token =>{
             fetch(`https://cs571.org/api/s24/hw9/messages?id=${id}`,{
            method:'DELETE',
            headers:{
                "Authorization" : `Bearer ${token}`,
                "X-CS571-ID" : "bid_f1b2b24aab28bd2a2f7852d3b2631b258e7a3e587be609c19a027beb3117e513",
                "Content-Type" : "application/json",
                


            }
        })
        .then(res=>{
            if(res.status===200){
                Alert.alert("Alert", "Successfully deleted the post!")
                props.loadMessages();
            }
        })
    })
}

    return <BadgerCard style={{ marginTop: 16, padding: 8, marginLeft: 8, marginRight: 8 }}>
        <Text style={{fontSize: 28, fontWeight: 600}}>{props.title}</Text>
        <Text style={{fontSize: 12}}>by {props.poster} | Posted on {dt.toLocaleDateString()} at {dt.toLocaleTimeString()}</Text>
        <Text></Text>
        <Text>{props.content}</Text>

        {
            props.poster === props.currentUser && props.checkUser === true ? <Button title="delete " onPress={() => deletePost(props.id)}> </Button> : <Text></Text>
        }
    </BadgerCard>
}

export default BadgerChatMessage;
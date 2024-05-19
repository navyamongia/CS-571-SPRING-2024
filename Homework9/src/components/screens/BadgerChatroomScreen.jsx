import { FlatList, StyleSheet, ScrollView, Text, View, Button, TextInput } from "react-native";
import { Modal } from "react-native";
import BagderChatMessage from "../helper/BadgerChatMessage"
import { useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';
import { Alert } from "react-native";
function BadgerChatroomScreen(props) {
    // console.log(props.name);
    const[currentUser,  setCurrentUser] = useState(null);
    const[inputTitle, setinputTitle] = useState("");
    const[inputContent, setinputContent] = useState("")
    const[checkUser, setCheckUser] = useState(false)
    const[messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const[modalVisible, setModalVisible] = useState(false)
    
    const loadMessages = ()=>{
      
        // whoAmI();
        setIsLoading(true)
        SecureStore.getItemAsync('jwt').then(token =>{
            fetch(`https://cs571.org/api/s24/hw9/messages?chatroom=${props.name}`, {
            method: "GET",
            headers:{
                "Authorization" : `Bearer ${token}`,
                "X-CS571-ID": " bid_f1b2b24aab28bd2a2f7852d3b2631b258e7a3e587be609c19a027beb3117e513"
                

            }
            
        })
        
        .then(res => res.json())
        .then(json => {
            setMessages(json.messages)
            // console.log(token)
            setIsLoading(false)

        })
        })
       
    }
    
    
    useEffect(loadMessages, [props]);
    useEffect(()=>{
        whoAmI();
    },[])
    function displayPost(){
        setModalVisible(false)
        SecureStore.getItemAsync('jwt').then(token =>{
            fetch(`https://cs571.org/api/s24/hw9/messages?chatroom=${props.name}`, {
            method: "POST",
            headers:{
                "Authorization" : `Bearer ${token}`,
                "X-CS571-ID": " bid_f1b2b24aab28bd2a2f7852d3b2631b258e7a3e587be609c19a027beb3117e513",
                "Content-Type" : "application/json"
                

            },
            body: JSON.stringify({
                title: inputTitle,
                content: inputContent
            })
            
        })
        
       .then(res=>{
        if(res.status === 200){
           Alert.alert("Successfully Posted!", "Successfully Posted!") 
           loadMessages();
           setinputTitle('');
           setinputContent('')
        }
       })
        })

       

    }
    function whoAmI(){
        SecureStore.getItemAsync('jwt').then(token =>{
            fetch("https://cs571.org/api/s24/hw9/whoami", {
            method: "GET",
            headers:{
                "Authorization" : `Bearer ${token}`,
                "X-CS571-ID": " bid_f1b2b24aab28bd2a2f7852d3b2631b258e7a3e587be609c19a027beb3117e513",
                "Content-Type" : "application/json"
                

            }
            
            
        })
        
       .then(res=> res.json())
       .then(data => {

         //console.log(data.user.username)
            if(data.isLoggedIn === true){
               setCheckUser(true)
              setCurrentUser(data.user.username);
                // // // console.log(data)
                // console.log(currentUser);
            }
            else{
                setCheckUser(false)
                setCurrentUser(null)
            }
       })
    })

    }
   function cancelPost(){
    setinputContent('');
    setinputTitle('');
    setModalVisible(false)
   }
//    const _renderitem =({item}) =><BagderChatMessage {...item} currentUser={currentUser} checkUser={checkUser}  loadMessages={loadMessages}/>
    

    return <View style={{ flex: 1 }}>
        
         {/* <Text style={{margin: 100}}>This is a chatroom screen!</Text> */}
        <FlatList 
          data={messages}
          onRefresh={loadMessages}
          refreshing={isLoading}
          keyExtractor={m => m.id}
          renderItem={m => <BagderChatMessage {...m.item} currentUser={currentUser} checkUser={checkUser}  loadMessages={loadMessages}/>}
        //   renderItem={_renderitem}
       
        />
        <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={()=>setModalVisible(false)} >
            <View style={styles.modalView}>
            <Text> Create A Post </Text>
            <Text>Title</Text>
            <TextInput style={{  height: 40,margin: 12, borderWidth: 1, padding: 10,width: '80%'}} value={inputTitle} onChangeText={setinputTitle} autoCapitalize= 'none'></TextInput>

            <Text>Body</Text>
            <TextInput style={{  height: 40,margin: 12, borderWidth: 1, padding: 10,width: '80%'}} value={inputContent} onChangeText={setinputContent} autoCapitalize="none"></TextInput>

            <Button title="CREATE POST" disabled={inputTitle==='' || inputContent ==="" ? true: false } onPress={displayPost}></Button>
            <Button title="CANCEL"   onPress={cancelPost}></Button>

            </View>
           

        </Modal>
        
        {
            checkUser ?  <Button title="Add post" onPress={()=>setModalVisible(true)}> </Button>  :<Text> </Text>
        }
        
       
        
        
    </View>

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalView: {
        marginTop:'50%',
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      }
});

export default BadgerChatroomScreen;
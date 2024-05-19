import { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Alert } from 'react-native';
import CS571 from '@cs571/mobile-client'
import * as SecureStore from 'expo-secure-store';
import BadgerChatroomScreen from './screens/BadgerChatroomScreen';
import BadgerRegisterScreen from './screens/BadgerRegisterScreen';
import BadgerLoginScreen from './screens/BadgerLoginScreen';
import BadgerLandingScreen from './screens/BadgerLandingScreen';
import BadgerLogoutScreen from './screens/BadgerLogoutScreen';
import BadgerConversionScreen from './screens/BadgerConversionScreen';


const ChatDrawer = createDrawerNavigator();

export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false);
  const [chatrooms, setChatrooms] = useState([]);
  const[isGuest, setIsGuest] = useState(false);
  useEffect(() => {
    // hmm... maybe I should load the chatroom names here
   fetch("https://cs571.org/api/s24/hw9/chatrooms",{
    method:"GET",
    credentials: 'include',
    headers:{
      "X-CS571-ID" : "bid_f1b2b24aab28bd2a2f7852d3b2631b258e7a3e587be609c19a027beb3117e513"

    }

   })
   .then(res=>res.json())
   .then(data => setChatrooms(data))
    //setChatrooms(["Hello", "World"]) // for example purposes only!
  }, []);
  // function handleLogout(){

  // }
  function handleLogin(username, password) {
    // hmm... maybe this is helpful!
    fetch("https://cs571.org/api/s24/hw9/login", {
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
      if(res.status === 200){
       
        return res.json().then(data =>{
          SecureStore.setItemAsync('jwt', data.token).catch(error=>{
            console.error("error", error);
          })
            setIsLoggedIn(true); 
    
        })

      }
      else{
        return res.json().then(data =>{
          Alert.alert("Error", data.msg);
        })
      }
     
    })
    

    
  }

  function handleSignup(username, password) {
    fetch("https://cs571.org/api/s24/hw9/register", {
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
      if(res.status === 200){
       
        return res.json().then(data =>{
          SecureStore.setItemAsync('jwt', data.token)
            setIsLoggedIn(true); 
    
        })

      }
      else{
        return res.json().then(data =>{
          Alert.alert("Error", data.msg);
        })
      }
     
    })

    // hmm... maybe this is helpful!
   // setIsLoggedIn(true); // I should really do a fetch to register first!
  }

  if (isLoggedIn) {
    return (
      <NavigationContainer>
        <ChatDrawer.Navigator>
          <ChatDrawer.Screen name="Landing" component={BadgerLandingScreen} />
          {
            chatrooms.map(chatroom => {
              return <ChatDrawer.Screen key={chatroom} name={chatroom}>
                {(props) => <BadgerChatroomScreen name={chatroom} /> 
               
                }
                
              </ChatDrawer.Screen>
            })
          }
          <ChatDrawer.Screen name ="Logout">
            {() => <BadgerLogoutScreen setIsLoggedIn={setIsLoggedIn} setIsRegistering={setIsRegistering}/> }
            </ChatDrawer.Screen> 
        </ChatDrawer.Navigator>
      </NavigationContainer>
    );
  } else if (isRegistering) {
    return <BadgerRegisterScreen handleSignup={handleSignup} setIsRegistering={setIsRegistering} setIsGuest={setIsGuest}/>
  } 

  else if(isGuest){
    return (
      <NavigationContainer>
        <ChatDrawer.Navigator>
          <ChatDrawer.Screen name="Landing" component={BadgerLandingScreen} />
          {
            chatrooms.map(chatroom => {
              return <ChatDrawer.Screen key={chatroom} name={chatroom}>
                {(props) => <BadgerChatroomScreen name={chatroom} /> 
               
                }
                
              </ChatDrawer.Screen>
            })
          }
           
            <ChatDrawer.Screen name="SignUp">
              {() => <BadgerConversionScreen setIsRegistering={setIsRegistering}/>}
            </ChatDrawer.Screen>
        </ChatDrawer.Navigator>
      </NavigationContainer>
    );
    
  }
  // else if(isGuest === true && isRegistering=== false){
  //   return <BadgerLoginScreen handleLogin={handleLogin} setIsRegistering={setIsRegistering} setIsGuest={setIsGuest}/>
  // }
  
  else {
    return <BadgerLoginScreen handleLogin={handleLogin} setIsRegistering={setIsRegistering} setIsGuest={setIsGuest}/>
  }
  
}
import { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";

function BadgerLoginScreen(props) {
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');
    function checkLogin(username, password){


    }

    return <View style={styles.container}>
        <Text style={{ fontSize: 36 }}>BadgerChat Login</Text>
        {/* <Text>Hmmm... I should add inputs here!</Text> */}
        <Text>Username</Text>
        <TextInput style={{  height: 40,margin: 12, borderWidth: 1, padding: 10,width: '80%'}}  value={username} onChangeText ={setUsername} autoCapitalize="none"/>
        <Text>Password</Text>
        <TextInput style={{  height: 40,margin: 12,borderWidth: 1,padding: 10, width: '80%'}} value= {password} onChangeText={setPassword} autoCapitalize="none" secureTextEntry={true}>

        </TextInput>
        <Button color="crimson" title="Login" onPress={() => {
            // Alert.alert("Hmmm...", "I should check the user's credentials!");
            // checkLogin(username, password);
            props.handleLogin(username, password)
        }} />
        <Text>New here?</Text>
        <Button color="grey" title="Sign Up" onPress={() => props.setIsRegistering(true)} />
        <Button color= "grey" title="Continue As Guest" onPress={()=>{props.setIsGuest(true)}}></Button>
    </View>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default BadgerLoginScreen;
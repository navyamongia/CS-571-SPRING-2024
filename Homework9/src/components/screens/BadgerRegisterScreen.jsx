import { Alert, Button, StyleSheet, Text, View, TextInput } from "react-native";
import { useState } from "react";
function BadgerRegisterScreen(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    function checkRegistration(username, password, confirmPassword){
        if(username ===''|| password === '' || confirmPassword==='')
        {
            Alert.alert('Error', 'Please enter all fields!')
            return;
        }
        if(password !== confirmPassword){
            Alert.alert("Error", "passwords don't match")
            return;
        }
        else{
            props.handleSignup(username, password);
        }
        

    }
    function onPressHandle(){
        props.setIsRegistering(false);
        props.setIsGuest(false)
    }
    return <View style={styles.container}>
        <Text style={{ fontSize: 36 }}>Join BadgerChat!</Text>
        {/* <Text>Hmmm... I should add inputs here!</Text> */}
        <Text>Username</Text>
        <TextInput style={{  height: 40,margin: 12, borderWidth: 1, padding: 10,width: '80%'}}  value={username} onChangeText ={setUsername} autoCapitalize="none"/>
        <Text>Password</Text>
        <TextInput style={{  height: 40,margin: 12,borderWidth: 1,padding: 10, width: '80%'}} value= {password} onChangeText={setPassword} autoCapitalize="none" secureTextEntry={true}>

        </TextInput>
        <Text>Confirm Password</Text>
        <TextInput style={{  height: 40,margin: 12,borderWidth: 1,padding: 10, width: '80%'}} value= {confirmPassword} onChangeText={setConfirmPassword} autoCapitalize="none" secureTextEntry={true}>

        </TextInput>
        <Button color="crimson" title="Signup" onPress={() => checkRegistration(username, password, confirmPassword)} />
        <Button color="grey" title="Nevermind!" onPress={() => onPressHandle()} />
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

export default BadgerRegisterScreen;
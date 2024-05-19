import { useNavigation } from '@react-navigation/native';
import { Pressable } from "react-native";
import { StyleSheet } from "react-native";
import { View, Text, Image } from "react-native";
export default function BadgerNewsItemCard(props){
    let img = props.img;
    const navigation = useNavigation();
    const visit = () =>{
        navigation.navigate("Article",{
           id: props.fullArticleId,
           title: props.title,
           Imguri: `https://raw.githubusercontent.com/CS571-S24/hw8-api-static-content/main/${img}`
        })
    }
   
    return <Pressable onPress={visit}>
        <View style = {styles.card}>
            <Image style={{width: '100%', height: 200}} source ={{uri: `https://raw.githubusercontent.com/CS571-S24/hw8-api-static-content/main/${img}`}}>

            </Image>
       <Text style={{marginTop: 10, fontWeight: 600, fontSize: 15}}> {props.title}</Text> 
    </View>
</Pressable>
}
const styles = StyleSheet.create({
    card:{
        alignItems: 'center',
    justifyContent: 'center',
        padding: 16,
        margin: 10,
        elevation:5,
        borderRadius:10,
        backgroundColor: "white",
    }
})
import { Text, ScrollView,Image, Pressable, Linking } from "react-native"
import { StyleSheet, Animated } from "react-native"
import { useEffect, useState, useRef } from "react";
export default function SpecificArticleScreen(props){
    let id = props.route.params.id;
    const[specificArticle, setSpecificArticle] = useState([]);
    const[load, setLoad] = useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    useEffect(()=>{
        fetch(`https://cs571.org/api/s24/hw8/article?id=${id}`, {
            headers:{
                "X-CS571-ID" : "bid_f1b2b24aab28bd2a2f7852d3b2631b258e7a3e587be609c19a027beb3117e513"
            }
        })
        .then( res => res.json())
        .then(data =>{
            setSpecificArticle(data);
            setLoad(true);
        })
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 6000,
            useNativeDriver: true,
          }).start();
    }, [])

   function openLink(url){
    Linking.openURL(url);
   }

        return <ScrollView style = {styles.card}>
        <Image style={{width: '100%', height: 200}} source ={{uri: props.route.params.Imguri}}/>
       <Text style={{fontWeight: 600, fontSize: 20, marginTop: 10}}> {props.route.params.title}</Text> 
       {


        load ?   <Animated.View
        style={[
         
          {
            opacity: fadeAnim,
          },
        ]}>
        <Text style={{fontSize: 13, marginTop: 10,  fontWeight: 500}}> By {specificArticle.author} on {specificArticle.posted} </Text>
        <Pressable onPress={()=>openLink(specificArticle.url)}> 
            
        <Text style={{fontSize: 13, marginBottom: 10,  fontWeight: 500, color:'blue'}}> Read Full Article Here. </Text> 
        
        </Pressable>
       {
        specificArticle.body.map((p,i)=> <Text key={i} style={{fontSize: 15, marginTop: 5, fontWeight: 500 }}> {p} </Text>)
       }
      </Animated.View> : <Text style={{fontSize: 15, marginTop: 10, fontWeight: 500}}> The Content is Loading ... </Text>
       }
       
       
      
</ScrollView>

    
   
}
const styles = StyleSheet.create({
card:{
    flex:1 ,
    padding: 16,
    margin: 10,
    elevation:5,
    borderRadius:10,
    backgroundColor: "white",
}
})

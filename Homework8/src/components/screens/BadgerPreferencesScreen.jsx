import { Text, View, Switch } from "react-native";
import ArticleContext from "../ArticleContext";
import { useContext, useState, useEffect } from "react";
import { StyleSheet } from "react-native";
function BadgerPreferencesScreen(props) {
   
    const [prefs, setPrefs] = useContext(ArticleContext);
    const[tags,setTags] = useState([]);
    
  
    useEffect(()=>{
        
        fetch("https://cs571.org/api/s24/hw8/articles" , {
          headers:{
            "X-CS571-ID" : "bid_f1b2b24aab28bd2a2f7852d3b2631b258e7a3e587be609c19a027beb3117e513"
          }
        })
        .then(res=>res.json())
        .then(data=>{
         
        let uniqueTags = [];
          data.forEach(a =>{
              a.tags.forEach(e =>{
                  if(!uniqueTags.includes(e)){
                      uniqueTags.push(e)
                  }
              })
          })
          console.log(uniqueTags)
          setTags(uniqueTags)
          
      
         
        
        
        
        
        })
       
        
        
        
    }, [])
    
   
   
    // function changePrefs(x){
   
    //   let y =  Object.keys(x).filter( a => x[a] === true )
    // //   console.log(...y)
    // // setPrefs( ...prefs, ...y)
    // // console.log(prefs)
    

    // }
 
   
    function changeValue(a){
        
        setPrefs({...prefs, [a] : !prefs[a]})
        
        

    }
   
   
    return <View>
        {/* <Text style={{paddingTop: 128}}>I should put some switches here!</Text> */}
       {
        tags? tags.map((a) => {

             return <View style = {styles.card} key={a}> 
               {
                prefs[a] ? <Text> Currently showing <Text style ={{fontWeight: 700}}>{a}</Text> articles. </Text> : <Text> Currently NOT showing <Text style ={{fontWeight: 700}}>{a}</Text> articles. </Text>
               }
                <Switch value ={prefs[a]} style={{margin: 10}} onValueChange={() => {changeValue(a)}  }></Switch> 
           </View> 
        }) : <View> </View>
       } 
        
    </View>
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


export default BadgerPreferencesScreen;
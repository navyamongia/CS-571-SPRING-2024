import { Text, View, ScrollView } from "react-native";
import { useContext, useEffect, useState } from "react";
import BadgerNewsItemCard from "../BadgerNewsItemCard";
import ArticleContext  from "../ArticleContext";

function BadgerNewsScreen(props) {
    const[articles, setArticles] = useState([]);
    const[prefArticles, setPrefArticles] = useState([]);
    const[prefs, setPrefs] = useContext(ArticleContext)
   
  useEffect(()=>{
      fetch("https://cs571.org/api/s24/hw8/articles" , {
        headers:{
          "X-CS571-ID" : "bid_f1b2b24aab28bd2a2f7852d3b2631b258e7a3e587be609c19a027beb3117e513"
        }
      })
      .then(res=>res.json())
      .then(data=>{
        setArticles(data);
        
    
       
        
      })
      .catch((error) => { 
        // Handle any errors that occur 
        console.error(error); 
    }); 
      
  }, [])
  useEffect(()=>{
  const arr =   articles.filter(a => a.tags.every(tag => prefs[tag] !== false));
  setPrefArticles(arr);
  },[prefs])
  
  
    return <ScrollView>

        
       
        {
            prefArticles.length === 0 ? <Text style={{fontSize: 30, marginTop: 20, alignSelf: 'center'}}> No Articles for these preferences!  </Text> :

             prefArticles.map(a =>{
                return <BadgerNewsItemCard 
                {...a}
                key ={a.id}/>
            }) 
            
        }
    </ScrollView>
}

export default BadgerNewsScreen;
import { NavigationContainer } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import ArticleContext from './ArticleContext';
import BadgerTabs from './navigation/BadgerTabs';
import CS571 from '@cs571/mobile-client';

export default function BadgerNews(props) {

  // Just a suggestion for Step 4! Maybe provide this to child components via context...
  const [prefs, setPrefs] = useState({});
 
  useEffect(()=>{
      fetch("https://cs571.org/api/s24/hw8/articles" , {
        headers:{
          "X-CS571-ID" : "bid_f1b2b24aab28bd2a2f7852d3b2631b258e7a3e587be609c19a027beb3117e513"
        }
      })
      .then(res=>res.json())
      .then(data=>{
        let newPrefs;
        let uniqueTags = [];
        data.forEach(a =>{
            a.tags.forEach(e =>{
                if(!uniqueTags.includes(e)){
                    uniqueTags.push(e)
                }
            })
        })
    
       
      //  setPrefs(uniqueTags);
      //  console.log(prefs)
      // console.log(uniqueTags)
      for(let i = 0; i< uniqueTags.length ; i++){
        newPrefs = {...newPrefs, [uniqueTags[i]] : true}
      }
      setPrefs(newPrefs)
      
      
      
      })
      .catch((error) => { 
        // Handle any errors that occur 
        console.error(error); 
    }); 
      
  }, [])
  // console.log(prefs)
  // console.log(tags);
  return (
    <>
    <ArticleContext.Provider value={[prefs, setPrefs]}>
      <NavigationContainer>
        <BadgerTabs/>
      </NavigationContainer>
    </ArticleContext.Provider>
    </>
  );
}
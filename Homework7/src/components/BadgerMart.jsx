import { Text, View , Button, StyleSheet} from "react-native";
import { useState, useEffect } from "react";
import BadgerSaleItem from "./BadgerSaleItem";
import BadgermartContext from "../contexts/BadgermartContext";
import CS571 from '@cs571/mobile-client'

export default function BadgerMart(props) {
    const [saleItems, setSaleItems] = useState({});
    const[currentItemIndex, setCurrentItemIndex] = useState(0);
    const[Prev_dis, setPrev_dis] = useState(true);
    const[Next_dis, setNext_dis] = useState(false);
    const[pageLoad, setPageLoad] = useState(false)
    const[cart, setCart] = useState({});
    let Newcart; 

    useEffect(() => {
        fetch("https://cs571.org/api/s24/hw7/items", {
            headers: {
                "X-CS571-ID": "bid_f1b2b24aab28bd2a2f7852d3b2631b258e7a3e587be609c19a027beb3117e513"
            }
        })
        .then(res => res.json())
        .then(data => {
           
            setSaleItems(data);
            setPageLoad(true)
            
            
           
        })
        
        

    }, [])

    useEffect(()=>{
        for(let i = 0 ; i<saleItems.length; i++){
            if(Newcart){
                Newcart = {...Newcart, [saleItems[i].name]: 0}
            }
            else{
                Newcart = {[saleItems[i].name]: 0}
            }
            
            
        }
        setCart(Newcart)
        // console.log(cart);
    }, [saleItems])

    function handlePrev(){
        setCurrentItemIndex(currentItemIndex => currentItemIndex -1 )
        
    }
    function handleNext(){
        setCurrentItemIndex(currentItemIndex=> currentItemIndex+1 )
       
    }
    
   useEffect(()=>{
        if(currentItemIndex === 0){
            setPrev_dis(true);
        }
        else{
            setPrev_dis(false);
        }
   }, [handleNext, handlePrev])
   useEffect(()=>{
    if(currentItemIndex === 4){
        setNext_dis(true);
    }
    else{
        setNext_dis(false);
    }
}, [handleNext, handlePrev])

if(pageLoad === false){
    return <Text> Loading .....</Text>
}


const saleItem = saleItems[currentItemIndex];
const price_arr = saleItems.map(s => s.price);
// console.log(price_arr)


  
    return <View>
       
    
       
        
        <Text style={{fontSize: 28}}>Welcome to Badger Mart!</Text>

        <View style={styles.btn_grp}>
        <Button title="PREVIOUS" onPress={handlePrev} disabled= {Prev_dis}  ></Button>
        <Button title="NEXT" onPress={handleNext} disabled={Next_dis} ></Button>
        </View>
       
       

           
            
        <BadgermartContext.Provider value={[cart, setCart]}>
           
        <BadgerSaleItem
                {...saleItem}
                price_arr = {price_arr}
                setCurrentItemIndex = {setCurrentItemIndex}
               
                 
        />
        </BadgermartContext.Provider>
        
                 

        
       
       
        
    </View>
    
}
const styles = StyleSheet.create({
    btn_grp:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
       
    }
})
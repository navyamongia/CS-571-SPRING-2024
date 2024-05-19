import { Text, View, Image, StyleSheet, Button } from "react-native";
import { useContext, useEffect, useState } from "react";
import BadgermartContext from "../contexts/BadgermartContext";
import { Alert } from "react-native";
export default function BadgerSaleItem(props) {
   const [cart, setCart] = useContext(BadgermartContext);
   const [ dec_dis, setDec_dis] = useState(true);
   const[inc_dis, setInc_dis] = useState(false);
   const[total_items, setTotal_items] = useState(0);
   const[total_price, setTotal_price] = useState(0);
  
   
   function decrease_quantity(){
    const newQuantity = cart[props.name] - 1;
    setCart({...cart, [props.name] : newQuantity})
    
    
   }
   function increase_quantity(){
        const newQuantity = cart[props.name] + 1;
        setCart({...cart, [props.name] : newQuantity})
   }
   useEffect(()=>{
    
    if(cart[props.name] == props.upperLimit){
        setInc_dis(true);
    }
    else{
        setInc_dis(false)
    }
   
    
   }, [ increase_quantity])

   useEffect(()=>{
    
   
    if(cart[props.name] > 0){
        setDec_dis(false);
    }
    else{
        
        setDec_dis(true);
    }
    // calc_total_items();
    // calc_total_price();
   }, [decrease_quantity])

useEffect(()=>{
    calc_total_items();
    calc_total_price()

})

function calc_total_items(){
    let arrLen = Object.keys(cart).length;
    let Newtotal_items = 0;
  
    
    for(let i = 0; i< arrLen ; i++){
       
        Newtotal_items = Newtotal_items + Object.values(cart)[i]
        // console.log(Newtotal_items);
      
        
        
    }
    
    setTotal_items(Newtotal_items)
    
}
function calc_total_price(){
    let arrLen = Object.keys(cart).length;
    let Newtotal_price = 0;
    for(let i =0; i< arrLen; i++ ){
        Newtotal_price = Newtotal_price + Object.values(cart)[i] * props.price_arr[i]
    }
    setTotal_price(Newtotal_price)
    // console.log(Newtotal_price)
}
function check_dis(){
    if(total_items === 0){
        return true;
    }
    else{
        return false;
    }
}
function place_order(){
    Alert.alert("Order confirmed!", `Your Order Contains ${total_items} and would have cost $${total_price.toFixed(2)}! `)
   let Newcart; 
        for(let i = 0 ; i<Object.keys(cart).length; i++){
            if(Newcart){
                Newcart = {...Newcart, [Object.keys(cart)[i]]: 0}
            }
            else{
                Newcart = {[Object.keys(cart)[i]] : 0}
            }
            
            
        }
        setCart(Newcart)
        props.setCurrentItemIndex(0); 
   

}


       return <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Image style ={{width: 200, height: 200}} source ={{uri: props.imgSrc}}>
            
        </Image>
        <Text style={{fontWeight: 500}}>{props.name}</Text>
        <Text style={{fontWeight: 500}}> ${props.price.toFixed(2)} each </Text>
        <Text style={{fontWeight: 500}}> You can order up to {props.upperLimit} units!</Text>
        <Button title="-" onPress={decrease_quantity} disabled ={dec_dis}></Button>
        <Text style={{fontWeight: 500}}>{cart[props.name]} </Text>
        <Button title="+" onPress={increase_quantity} disabled={inc_dis}></Button>
        <Text style={{fontWeight: 500, fontSize: 15}}>You have {total_items} item(s) ${total_price.toFixed(2)} in your cart!</Text>
        <Button title="Place Order "  onPress={place_order} disabled= {check_dis()} > </Button>
    </View>
}



const createChatAgent = () => {

    const CS571_WITAI_ACCESS_TOKEN = "XTKFDADIBLSMPLCN6KTD5CBYBS25PQ7K"; // Put your CLIENT access token here.

    let availableItems = [];
    let cart ={};
    const handleInitialize = async () => {
        const resp = await fetch("https://cs571.org/api/s24/hw10/items" , {
            headers: {
                "X-CS571-ID" : "bid_f1b2b24aab28bd2a2f7852d3b2631b258e7a3e587be609c19a027beb3117e513"
            }
        })
        const data = await resp.json();
        availableItems = data;
        for(let i =0; i< availableItems.length; i++){
            cart = {...cart , [availableItems[i].name] : 0}
        }
        // console.log(cart)
        
        
        return "Welcome to BadgerMart Voice! :) Type your question, or ask for help if you are lost!"
    }

    const handleReceive = async (prompt) => {
        // TODO: Replace this with your code to handle a user's message!
        const resp = await fetch("https://api.wit.ai/message?q=" + encodeURIComponent(prompt), {
            headers: {
                "Authorization": "Bearer " + CS571_WITAI_ACCESS_TOKEN
            }
        })
        const data = await resp.json();
        if(data.intents.length > 0){
            switch(data.intents[0].name){
                case "get_help" : return get_help();
                case "get_items" : return get_items();
                case "get_price" : return get_price(data);
                case "add_item" : return add_item(data);
                case "remove_item": return remove_item(data);
                case "view_cart" : return view_cart();
                case "checkout" : return checkout();
            }
            
        }
        else{
            return "Sorry, I didn't get that. Type 'help' to see what you can do!"
        }
       
    }
   
    const get_help = async() =>{
        return "In BadgerMart Voice, you can get the list of items, the price of an item, add or remove an item from your cart, and checkout!"
    }
    const get_items = async() =>{
        let items_array =[];
        let pretty_items_array =[];
        Object.keys(availableItems).forEach((key) =>{
            items_array[key] = Object.values(availableItems)[key].name
        })   

        pretty_items_array[0] = items_array[0];
        let len = items_array.length;
        for(let i = 1; i< len -1; i++){
            pretty_items_array = pretty_items_array + "," + items_array[i]
        }
        
        return "We have " + pretty_items_array +", and " + items_array[len-1] + " for sale!"
       
    }

    const get_price = async (promptData) =>{
    
    const itemExists = promptData.entities["item_name:item_name"] ? true : false;

    if(itemExists){
        let item_name = promptData.entities["item_name:item_name"][0].value ;
        for(let i =0 ; i< availableItems.length; i++){
            if(availableItems[i].name.toLowerCase() == item_name.toLowerCase()){
                return availableItems[i].name+"s cost $"+availableItems[i].price +" each.";
            }
        }
       
    }
    else{
        return "This item is not in stock!"
    }
   
 
   
        
       
    }

        
    const add_item = async (promptData) =>{
        const itemExists = promptData.entities["item_name:item_name"] ? true : false;
        const hasSpecifiedNumber = promptData.entities["wit$number:number"] ? true : false;
        const numItems = hasSpecifiedNumber === true ? Math.floor(promptData.entities["wit$number:number"][0].value) : 1;
        let item_name ;
        if(itemExists === false){
            return "This item is not in stock!"
        }
        if( hasSpecifiedNumber && promptData.entities["wit$number:number"][0].value <= 0){
            return "The specified quantity is invalid!"
        }
        for(let i =0; i< availableItems.length; i++){
            if(availableItems[i].name.toLowerCase() ===promptData.entities["item_name:item_name"][0].value.toLowerCase() ){
                item_name = availableItems[i].name;
            }
        }
       
        console.log(promptData.entities["wit$number:number"])
        if(itemExists && numItems > 0){
            const newQuantity = cart[item_name] + numItems;
            cart={...cart, [item_name]: newQuantity}
            // console.log(cart)
            return "Sure, adding " + numItems + " "+item_name + " to your cart!"
            
        }
        
    }
    const remove_item = async (promptData) => {
        const itemExists = promptData.entities["item_name:item_name"] ? true : false;
        const hasSpecifiedNumber = promptData.entities["wit$number:number"] ? true : false;
        const numItems = hasSpecifiedNumber === true ? Math.floor(promptData.entities["wit$number:number"][0].value) : 1;
        let item_name ;
        if(itemExists === false  ){
            return "This item is not in stock!"
        }
        if( hasSpecifiedNumber && promptData.entities["wit$number:number"][0].value <= 0){
            return "The specified quantity is invalid!"
        }
        
        for(let i =0; i< availableItems.length; i++){
            if(availableItems[i].name.toLowerCase() ===promptData.entities["item_name:item_name"][0].value.toLowerCase() ){
                item_name = availableItems[i].name;
            }
        }
        if(cart[item_name] === 0){
            return "You don't have any " +item_name+" in your cart!"
        }
        
        if(itemExists && numItems > 0){
            if(numItems > cart[item_name]){
                cart={...cart, [item_name]: 0}
                console.log(cart)
                return "Sure, removing all "+item_name+" from your cart!"
            }
            else{
                const newQuantity = cart[item_name] - numItems;
                cart={...cart, [item_name]: newQuantity}
                console.log(cart)
                return "Sure, removing " + numItems + " "+item_name + " from your cart!"
            }
            
            
           
            
        }


    }
    const view_cart = async() =>{
        let total = 0;
        let return_string_part1 = "You have ";  
        let return_string_part2;
        let return_string =""; 
        if(Object.values(cart).every((c) => c <= 0)){
            return "You have nothing in your cart, totalling $0.00"
        } 
         else{
            for(let i = 0 ; i< Object.keys(cart).length; i++){

                total = total + Object.values(cart)[i] * availableItems[i].price;
                // console.log(total)
               
           }
           return_string_part2 =Object.entries(cart).filter(([key,value]) => value > 0)
           return_string = return_string_part2[0][1]+" " + return_string_part2[0][0];
           for(let i = 1; i< return_string_part2.length; i++){
             return_string = return_string + "," + return_string_part2[i][1] + " "+ return_string_part2[i][0];
           }
           console.log(cart)
           return return_string_part1 + return_string +" in your cart totalling $"  +total.toFixed(2);

         }
       
       
       
   
    }
    const checkout= async()=>{
        if(Object.values(cart).every((c) => c <= 0)){
            return "You don't have any item in your cart to checkout"
        } 
        else{
            const resp = await fetch("https://cs571.org/api/s24/hw10/checkout" , {
                method : "POST",
                headers: {
                    "X-CS571-ID" : "bid_f1b2b24aab28bd2a2f7852d3b2631b258e7a3e587be609c19a027beb3117e513",
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(cart)
            })
            const data = await resp.json();
            cart ={};
            return "Success! Your confirmation ID is "+ data.confirmationId;
        }
    }

    return {
        handleInitialize,
        handleReceive
    }
}

export default createChatAgent;
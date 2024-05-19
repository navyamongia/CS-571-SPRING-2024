import { useEffect, useState } from "react"





export default function BadgerSaleItem(props) {
    
    const [quantity, setquantity] =useState(0);
    
    const[dis_val , setdis] = useState(false);

  useEffect(()=>{
          if(quantity<=0){
            setdis(true)
          }
          else{
            setdis(false)
          }
  }, [quantity])
   
    
    function decreaseQuantity(){
       
        setquantity(quantity - 1);
               
             

    }
        
       

    function increaseQuantity(){
       
        // check_dis()
        setquantity(quantity + 1); 
        
       
    }

  

  
   

     return <div className ="rows" style={props.featured? {backgroundColor: "#52B788" } : {backgroundColor: "#95D5B2"}}> 
        <h2 style={{fontWeight: 800}}>{props.name}</h2>
        <div>
            {props.description} <br/>
            <br/>

            <p className="price_row">
            ${props.price.toFixed(2)}<br/>
              
            </p>
            
        
            <button className="inline decrease_btn" 
            
                onClick= {decreaseQuantity}
                disabled = {dis_val} 
                
               
            
                
            >-</button>
            <p className="inline">{quantity}</p>
            <button className="inline increase_btn"
               onClick={increaseQuantity}
              
            >+</button>
        </div>
    </div>
}
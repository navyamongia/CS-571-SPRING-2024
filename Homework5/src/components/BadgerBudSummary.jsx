import { useContext, useState, useEffect } from "react";
import BadgerBudsDataContext from "../contexts/BadgerBudsDataContext";
import { Button, ButtonGroup, Carousel, CarouselItem } from "react-bootstrap";
import { Card } from "react-bootstrap";

export default function BadgerBudSummary({saveCat, b}){
   
  const buds = useContext(BadgerBudsDataContext);
    const[btn_text, setBtnText] = useState('Show More');
    const[show, setShow] = useState(false);
    const [savedCatIds, setSavedCatIds] = useState(JSON.parse(sessionStorage.getItem('savedCatIds') || "[]"));
    
    useEffect(()=>{
        if(btn_text === "Show Less"){
            setShow(true);
        }
        else{
            setShow(false);
        }
    }, [btn_text])
    
    function display_many_img(ids){
       return <Carousel >
         {
            ids.map((id)=>{
                return <CarouselItem key={id}>
                        <img src= {`https://raw.githubusercontent.com/CS571-S24/hw5-api-static-content/main/cats/${id}`} id ="cat_img" alt="image of cat"></img>
                </CarouselItem>
            })
        } 
       </Carousel>

       
       
      
    }
    const display_one_img = () =>{
        return <img src= {get_img()}  alt ={`a pic of ${b.name}`} id="cat_img"/>
        
    }

    let CAT_IMG_ID = b.imgIds[0];
    
    const get_img = () =>(
       
         `https://raw.githubusercontent.com/CS571-S24/hw5-api-static-content/main/cats/${CAT_IMG_ID}`
    )
   


   const handleClick = ()=>{
    setBtnText(btn_text === "Show More" ? "Show Less" : "Show More")
   
   };

    
    
  
    return <Card>
        {
            show ? display_many_img(b.imgIds) : display_one_img()
            
        }

             
        
        {/* <img src= {get_img()}  alt ={`a pic of ${b.name}`} id="cat_img"/> */}
        
        <h2 className="cat_info_box">{b.name}</h2>    
        
       { show ? (
            <div className="cat_info_box">
                <p>{b.gender}</p>
                <p> {b.breed} </p>
                <p> {b.age} old </p>
                {b.description ? <p>{b.description}</p> : null}
            </div>
       ) : null }
        
        <div id ="btn_grp">
        <Button id="show_btn" onClick={handleClick} >{btn_text}</Button>
        <Button id = "save_btn" onClick={() => saveCat(b.id, b.name)}> <span id="heart">&hearts; </span> Save </Button>
        </div>

    </Card>

}
 
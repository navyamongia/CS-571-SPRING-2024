import { useContext, useState, useEffect } from "react";
import BadgerBudSummary from "../../BadgerBudSummary";
import BadgerBudsAdoptable from "./BadgerBudsAdoptable";
import BadgerBudsDataContext from "../../../contexts/BadgerBudsDataContext";
import { Row , Col, Card, Button} from "react-bootstrap";
export default function BadgerBudsBasket(props) {

    const buds = useContext(BadgerBudsDataContext);
    const [savedCatIds, setSavedCatIds] = useState(JSON.parse(sessionStorage.getItem('savedCatIds') || "[]"));
    const [adoptedCatIds, setAdoptedCatIds] = useState(JSON.parse(sessionStorage.getItem('adoptedCatIds') || "[]"));
   
    const savedBuddies = buds.filter(bud => savedCatIds.includes(bud.id));
    function adopt_cat(id,name){
        const newAdoptedCatIds = [...adoptedCatIds, id];
        setAdoptedCatIds(newAdoptedCatIds);
        const newSavedCatIds = savedCatIds.filter(cat_id => cat_id !== id);
        setSavedCatIds(newSavedCatIds);
        alert(name + " has been adopted!")
    }
    useEffect(()=>{
        sessionStorage.setItem('adoptedCatIds', JSON.stringify(adoptedCatIds));
    },[adoptedCatIds])
    const unsave_cat =(id,name)=>{
        const newSavedCatIds = savedCatIds.filter(cat_id => cat_id !== id);
        setSavedCatIds(newSavedCatIds);
        alert(name +" has been removed from your basket!");
    }
    useEffect(()=>{
        sessionStorage.setItem('savedCatIds', JSON.stringify(savedCatIds));
        
    }, [savedCatIds])

    if(savedBuddies.length !== 0){
        return <div>
        
        <h1>Badger Buds Basket</h1>
        <p>These cute cats could be all yours!</p>
        <Row>

            {savedBuddies.map(bud => (
                     <Col key={bud.id}>
                            <Card xs ={12} md={6} lg={4} xl ={3}>
                            <img src={`https://raw.githubusercontent.com/CS571-S24/hw5-api-static-content/main/cats/${bud.imgIds[0]}`} id="cat_img" alt= {`a picture of ${bud.name}`}></img>
                            <h2> {bud.name}</h2>
                            <div>
                                <Button id="unselect_btn" onClick={()=> unsave_cat(bud.id, bud.name)}>Unselect</Button>
                                <Button id="adopt_btn" onClick={()=> adopt_cat(bud.id, bud.name)}><span id="heart">&hearts;</span>Adopt</Button>
                            </div>
                            </Card>
                     </Col>      
                 
                            
            ))}
        </Row>
        
    
       
       
    </div>
    }
    else{
        return <div>
                <p>These cute cats could be all yours!</p>
        <p> You have no buds in your basket</p> 
        
        </div>
            
        
    }
    
}
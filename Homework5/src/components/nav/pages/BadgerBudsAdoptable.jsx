import { useContext , useState, useEffect} from "react";
import BadgerBudsDataContext from "../../../contexts/BadgerBudsDataContext";
import { Col , Row} from "react-bootstrap";
import BadgerBudSummary from "../../BadgerBudSummary";

export default function BadgerBudsAdoptable(props) {
    const buds= useContext(BadgerBudsDataContext);
    // const [savedCatIds, setSavedCatIds] = useState(JSON.parse(sessionStorage.getItem('savedCatIds') || "[]"));
     // const [adoptedCatIds, setAdoptedCatIds] = useState(JSON.parse(sessionStorage.getItem('adoptedCatIds') || "[]"));
    const [savedCatIds, setSavedCatIds] = useState([]);
    useEffect(()=>{
        const savedCatIds = JSON.parse(sessionStorage.getItem('savedCatIds'));
        if(savedCatIds){
            setSavedCatIds(savedCatIds);
        }
    }, [])
   
    const[adoptedCatIds,setAdoptedCatIds] =useState([]);
    useEffect(()=>{
        const adoptedCatIds = JSON.parse(sessionStorage.getItem('adoptedCatIds'));
        if(adoptedCatIds){
            setAdoptedCatIds(adoptedCatIds);
        }
    },[])
    const unsavedCats = buds.filter(bud => !savedCatIds.includes(bud.id) && !adoptedCatIds.includes(bud.id)) 
    const saveCat = (id, name) =>{
        const newSavedCatIds = [...savedCatIds , id];
        setSavedCatIds(newSavedCatIds);
        alert(name + " has been added to your basket!")
        
        
       
        
    
    }
    
    useEffect(()=>{
        sessionStorage.setItem('savedCatIds', JSON.stringify(savedCatIds));
        
    }, [savedCatIds])
    
    if(unsavedCats.length ===0){
        return <div>
            <p>The following cats are looking for a loving home! Could you help?</p>
            <p> No buds are available for adoption! </p>
        </div>
    }
    else{
        return <div>
        <h1>Available Badger Buds</h1>
        <p>The following cats are looking for a loving home! Could you help?</p>
        <Row>
       {
            unsavedCats.map(bud =>{
                return <Col xs ={12} sm ={12} md={6} lg ={4} xl={3} key={bud.id}>
                    <BadgerBudSummary
                    saveCat = {saveCat}
                    b = {bud}

                    />
                
                </Col>
            })
    
       }
        
        </Row> 
    </div>
    }
    

 
   
}

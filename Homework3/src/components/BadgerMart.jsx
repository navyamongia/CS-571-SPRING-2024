import { useEffect, useState } from "react"
import BadgerSaleItem from "./BadgerSaleItem";
import { Col, Container, Row } from "react-bootstrap";

export default function BadgerMart(props) {

    let featured_item;
    
    const [saleItems, setSaleItems] = useState([]);
   

    useEffect(() => {
        fetch("https://cs571.org/api/s24/hw3/all-sale-items", {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setSaleItems(data);

           
        })
    }, [])
   
    for(let i = 0; i< saleItems.length; i++){
        if(saleItems[i].featured){
            
           featured_item= saleItems[i]  ;
    
    
             
    
        }
       }

       function display_item(){
        return <p className="featured"> Today's featured item is {featured_item.name} for ${featured_item.price.toFixed(2)}!  </p>
       }

       function display_load(){
        return <p className="featured">Loading...</p>
       }
    return <div>
        <span className="material-symbols-outlined">
          grocery
          </span>
        
        <h1 className="title">Badger Mart</h1>
       
      
        <p >Welcome to our small-town mini mart located in Madison, WI!</p>

        {featured_item ? display_item() : display_load()}
       
         
        <Container>
            <Row>
            {
                saleItems.map(saleItem => {
                    return <Col key={saleItem.name} xs={12} md={6} lg={4} xl={3}>
                        <BadgerSaleItem
                            name={saleItem.name}
                            description={saleItem.description}
                            price={saleItem.price}
                            featured={saleItem.featured}
                        />
                    </Col>
                })
            }
            </Row>
        </Container>
    </div>
}
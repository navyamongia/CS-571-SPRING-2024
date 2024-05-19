import { useEffect, useState } from "react";
import { Button, Container, Form, Row , Col, Pagination} from "react-bootstrap";
import Student from "./Student";

const Classroom = () => {
   const[stu, setStu] = useState([]);
   const[shownStudents , setshownStudents] = useState([]);
   const[name_search , setstuName ] = useState('');
   const[major_search, setstuMajor] = useState('');
   const[interest_search, setstuInterests] = useState('');
   const[page, setPage] = useState(1);
   

   useEffect(() =>{
    fetch("https://cs571.org/api/s24/hw4/students" , {
        headers:{
            "X-CS571-ID" : "bid_f1b2b24aab28bd2a2f7852d3b2631b258e7a3e587be609c19a027beb3117e513" 
        }
    })
    .then(res =>{
        console.log(res.status)
        return res.json()
    })
    .then(data =>{
        setStu(data);
        setshownStudents(data);
        console.log(stu)
    })

   }, [])


   useEffect(()=>{
    const handle_search =() =>{
        let filtered_students_arr = stu.filter(stud =>{
            const full_name = (stud.name.first +" "+ stud.name.last).toUpperCase(); //concatenating them with a space 
        
                if(name_search && !(full_name.includes(name_search.toUpperCase().trim())) ){
                
                    return false;
        
        
                }
    
                if(major_search && !stud.major.toUpperCase().includes(major_search.toUpperCase().trim())){
                    return false;
                }
                
                if(interest_search && !stud.interests.some(interest => interest.toUpperCase().includes(interest_search.toUpperCase().trim()))){
                    return false;
                }
            
    
                
         return true;
             
        });
        setshownStudents(filtered_students_arr);
        setPage(1);
    };
    handle_search();
  
   }, [name_search, major_search, interest_search])

   const reset_search = () =>{
    setstuName('');
    setstuInterests('');
    setstuMajor('');
    setshownStudents(stu);
    setPage(1);
   }


   const set_pages = () =>{
    let items =[];
    const num_pages = Math.floor(shownStudents.length / 24) + 1;
   
    for(let i = 1; i<= num_pages; i++){
       items.push(
        <Pagination.Item key ={i} active = { page === i} onClick={() => setPage(i)} >
            {i}
            </Pagination.Item>
        
       ) ;

    
            
        
    }
   
    return items;
   }
    return <div>
        <h1>Badger Book</h1>
        <p>Search for students below!</p>
        <hr />
        <Form>
            <Form.Label htmlFor="searchName">Name</Form.Label>
            <Form.Control id="searchName" onChange={(e) => setstuName(e.target.value)

                    }/>
            <Form.Label htmlFor="searchMajor">Major</Form.Label>
            <Form.Control id="searchMajor" onChange={(f) => setstuMajor(f.target.value) }/>
            <Form.Label htmlFor="searchInterest">Interest</Form.Label>
            <Form.Control id="searchInterest" onChange={(g) => setstuInterests(g.target.value)}/>
            <br />
            <Button variant="neutral" onClick={() => reset_search()}>Reset Search</Button>
        </Form>
        <p> There are {shownStudents.length} student(s) matching your search</p>
        <Container fluid>
            <Row>
                { shownStudents
                .slice((page-1) * 24 , page *24)
                .map(s =>
                    <Col key = {s.id} xs ={12} sm={12} md={6} lg={4} xl={3}>
                    <Student {...s} />
                    
                    </Col>)
                }
            </Row>
        </Container>
        <Pagination>
        <Pagination.Prev onClick={ ()=> setPage(page=>page-1)} disabled = {page ===1 || shownStudents.length ===0}>
            Previous
            </Pagination.Prev> 
        { set_pages()} 
        <Pagination.Next onClick ={() => setPage(page => page+1) } disabled = {page=== (Math.floor(shownStudents.length / 24) + 1) || shownStudents.length === 0}> 
            Next 

        </Pagination.Next>
        
        </Pagination>
           
        
        
    </div>

} 

export default Classroom;
const Student = (props) => {
    const fullName = props.name.first + " " + props.name.last;
    const wisco = props.fromWisconsin ? "is" : "is NOT"
    const len = props.interests.length;
    return <div>
        <h2 style={{fontWeight : "bold"}}>{props.name.first} {props.name.last}</h2>
        
            <p style={{fontWeight: "bold"}}>{props.major}</p> 
            
            <p>{fullName} is taking {props.numCredits} credits and {wisco} from Wisconsin  </p>
            <p> They have {props.interests.length} interests...</p>
            <ul>
                {
                    props.interests.map(i =>
                      <li key={i}> {i}</li>  
                    )
                }
                     
                
            </ul>
            

        
            
                
        
        
    </div>
}

export default Student;
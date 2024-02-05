function submitApplication(e) {
    e.preventDefault(); // You can ignore this; prevents the default form submission!

    
    let jobs= document.getElementsByName('job');
    
    for(let  i = 0; i < jobs.length ; i++ ){
        if(jobs[i].checked == true){
           alert("Thank you for applying to be a " + jobs[i].value +"!");
           return;
         }

       
       
    }
    alert("Please select a job!");
    
    
   
}

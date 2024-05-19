let students_arr = []; //creating an array to save a copy of data fetched 

fetch("https://cs571.org/api/s24/hw2/students" ,{
	headers:{
		"X-CS571-ID" : "bid_f1b2b24aab28bd2a2f7852d3b2631b258e7a3e587be609c19a027beb3117e513"
	}
}) 
.then((res)=>{
	return res.json();

})

.then((data) =>{
	console.log(data);
	students_arr = data; 
    
	document.getElementById("num-results").innerText = data.length ;  //to print thenum of results w/o any search 
	buildStudents(data);

})


function buildStudents(studs) {
	// TODO This function is just a suggestion! I would suggest calling it after
	//      fetching the data or performing a search. It should populate the
	//      index.html with student data by using createElement and appendChild.

	const studentsRow = document.getElementById("students");
	
	
	
	for(let i = 0; i< studs.length ; i++){
		let studentsHTML = document.createElement('div');
		
		//for setting the firstname and last name
	    let student_name_row  = document.createElement('h2');
		student_name_row.style.fontWeight = 'bold'
	    student_name_row.innerText = studs[i].name.first +" " +studs[i].name.last ;

	
	    //for setting the major of students	
     	let student_major_row = document.createElement('p');
	 	student_major_row.style.fontWeight = 'bold'
	 	student_major_row.innerText =  studs[i].major ;
	    
	
		//for checking whether they are from wisco and num of credits
	    let student_creditsandwisc_row = document.createElement('p');
	
		let student_fromWisco;
		if(studs[i].fromWisconsin){
			student_fromWisco = "from";
		}
		else{
			student_fromWisco = "NOT from";
		}
		student_creditsandwisc_row.innerText = studs[i].name.first + " is taking " + studs[i].numCredits + " credits and is " + student_fromWisco + " Wisconsin";
		
		
		
		//for student interests 
		let student_interests_list = document.createElement("p");
	    student_interests_list.innerText = "They have " + studs[i].interests.length + " interests including...";
		if(studs[i].interests){
			for(let x = 0; x< studs[i].interests.length ; x++){
				let interest = document.createElement('li');
				interest.innerText = studs[i].interests[x];
				
				//adding the clcik functionality to interests 
				interest.addEventListener("click", (e)=>{
					const selectedText = e.target.innerText;
					document.getElementById("search-interest").value = selectedText;
					document.getElementById("search-major").value="";
					document.getElementById("search-name").value="";
					handleSearch();
					
					
				})

				student_interests_list.appendChild(interest);
				
				
			}
		}
		

	//appending all child elements 
	studentsHTML.appendChild(student_name_row) 
	studentsHTML.appendChild(student_major_row)
	
	studentsHTML.appendChild(student_creditsandwisc_row);
	

    studentsHTML.appendChild(student_interests_list);
	//to make the page responsive 
	studentsHTML.className = "col-lg-4 col-xl-3 col-md-6 col-sm-12 col-12";
	
	studentsRow.appendChild(studentsHTML);

	
	


	}
	
	
	
	
}

function handleSearch(e) {
	e?.preventDefault(); // You can ignore this; prevents the default form submission!

	// TODO Implement the search

	const name_search = document.getElementById("search-name").value.toUpperCase().trim() ;
	const major_search = document.getElementById("search-major").value.toUpperCase().trim();
	const interest_search = document.getElementById("search-interest").value.toUpperCase().trim();
	
	let filtered_students_arr = students_arr.filter(stud =>{
		const full_name = (stud.name.first +" "+ stud.name.last).toUpperCase(); //concatenating them with a space 
	
			if(name_search && !(full_name.includes(name_search)) ){
			
				return false;
	
	
			}

			if(major_search && !stud.major.toUpperCase().includes(major_search)){
				return false;
			}

		

			if(interest_search && !stud.interests.some(interest => interest.toUpperCase().includes(interest_search))){
				return false;
			}
     return true;
		 
	});
    
    document.getElementById("students").innerHTML = "";
	document.getElementById("num-results").innerText = filtered_students_arr.length ; //displaying updated num results 

	buildStudents(filtered_students_arr);

}

document.getElementById("search-btn").addEventListener("click", handleSearch);




import { getLoggedInUsername, isLoggedIn, ofRandom } from "../Util"
const createPostSubAgent = (end) => {
   
    const CS571_WITAI_ACCESS_TOKEN = "TON4QIMTJSQNDEXMVJO24PODOFAJFMFV"; // Put your CLIENT access token here.
    let stage;
    let chatroom, title, content, confirm;

    const handleInitialize = async (promptData) => {
        console.log(promptData)
        if(await isLoggedIn() === false){
            
            return end("Please log in before creating a post!")
        }
        else{
            // const resp = await fetch(`https://api.wit.ai/message?q=${encodeURIComponent(prompt)}`, {
            //     headers: {
            //         "Authorization": `Bearer ${CS571_WITAI_ACCESS_TOKEN}`
            //     }
            // })
            // const data = await resp.json();
            // console.log(data);
            let exist = promptData.entities["chatroom_name:chatroom_name"] ? true : false;
            if(exist){
                chatroom = promptData.entities["chatroom_name:chatroom_name"][0].value;
                stage = "FOLLOWUP_TITLE";
                return("Sounds good, what would you like your title to be?");
               }
               else{
                return end("Please specify a chatroom to make a post");
               }
            }
        }
       
        
       
     
    
        
    const handleReceive = async (prompt) => {
       
      
        switch(stage){
            
            case "FOLLOWUP_TITLE" : return await handleFollowupTitle(prompt);
            case "FOLLOWUP_CONTENT" : return await handleFollowupContent(prompt);
            case "FOLLOWUP_CONFIRM" : return await handleFollowupConfirm(prompt);

        }
    }
    
   const handleFollowupTitle = async(prompt) =>{
    title = prompt;
    stage = "FOLLOWUP_CONTENT";
    return("Alright, what should be the content of your post?");
   }

   const handleFollowupContent = async(prompt) =>{
    content = prompt;
    stage = "FOLLOWUP_CONFIRM";
    return "All ready! To confirm, you want to create a post titled '"+title+"' in " +chatroom+ " ?";
   }
   
   const handleFollowupConfirm = async(prompt)=>{
    confirm = prompt;
        const resp = await fetch(`https://api.wit.ai/message?q=${encodeURIComponent(prompt)}`, {
            headers: {
                "Authorization": `Bearer ${CS571_WITAI_ACCESS_TOKEN}`
            }
        })
        const data = await resp.json();
        if (data.intents.length > 0 && data.intents[0].name === 'wit$confirmation'){
           const check= await fetch(`https://cs571.org/api/s24/hw11/messages?chatroom=${chatroom}` , {
                headers:{
                    "X-CS571-ID" : "bid_f1b2b24aab28bd2a2f7852d3b2631b258e7a3e587be609c19a027beb3117e513",
                    "Content-Type" : "application/json"
    
                },
                method: "POST",
                credentials: "include",
                body: JSON.stringify({
                  title: title,
                  content: content
                })
    
            })
            if(check.status === 200){
                let mssg = 
                {
                    msg :"All set! Your message has been successfully posted to " + chatroom,
                    emote: "SUCCESS"
                }
                return end(mssg);
            }
        }
        else{
            let mssg = 
                {
                    msg : "NOT posting message to chatroom",
                    emote: "error"
                }
            return end(mssg)
        }

   }

    return {
        handleInitialize,
        handleReceive
    }
}

export default createPostSubAgent;
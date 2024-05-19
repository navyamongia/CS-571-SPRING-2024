import { getLoggedInUsername, isLoggedIn, ofRandom } from "../Util"
const createRegisterSubAgent = (end) => {

    let stage;
    let username, password, confirmPassword;
    const handleInitialize = async (promptData) => {
        // return end("I should try to register...")
        if(await isLoggedIn()){
            return end( "You are already logged in, Try logging out first");
        }
        else{
            
                stage = "FOLLOWUP_USERNAME";
                return  "Great! What username would you like to use?";
                    
                
            
        }
    }

    const handleReceive = async (prompt) => {
        switch(stage) {
            case "FOLLOWUP_USERNAME": return await handleFollowupUsername(prompt);
            case "FOLLOWUP_PASSWORD": return await handleFollowupPassword(prompt);
            case "FOLLOWUP_CONFIRM" : return await handleFollowupConfirm(prompt);
        }
    }

    const handleFollowupUsername = async (promptData) =>{
        let mssg = 
                {
                    msg :"Thanks, what password would you like to use?",
                    nextIsSensitive : true
                }
        stage = "FOLLOWUP_PASSWORD";
        username = promptData;
        return mssg;
    }
    const handleFollowupPassword = async(promptData) =>{
        let mssg = 
        {
            msg : "Lastly, please confirm your password.",
            nextIsSensitive : true
        }
        
        password = promptData;
        stage = "FOLLOWUP_CONFIRM";
        return mssg;
    }
    const handleFollowupConfirm = async(promptData)=>{
        if(password.toLowerCase() !== promptData.toLowerCase() ){
            let mssg = 
        {
            msg : "Sorry, your passwords don't match. Please try registering again!",
            emote: "error"
        }
            return end(mssg)
        }
        else{
            const resp = await fetch("https://cs571.org/api/s24/hw11/register", {
                headers:{
                    "X-CS571-ID": "bid_f1b2b24aab28bd2a2f7852d3b2631b258e7a3e587be609c19a027beb3117e513",
                "Content-Type": "application/json"
                },
                method: "POST",
                credentials: "include",
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })
            if(resp.status === 200){
                let mssg = 
                {
                    msg : "Success! Your account has been registered. Welcome " +username,
                    emote: "SUCCESS"
                }
                return end(mssg);
            }
            if(resp.status === 409){
                let mssg = 
                {
                    msg : "This username already exists! Please try again.",
                    emote: "error"
                }
                
                return end(mssg);
            }
        }
    }
    return {
        handleInitialize,
        handleReceive
    }
}

export default createRegisterSubAgent;
import { getLoggedInUsername, isLoggedIn, ofRandom } from "../Util"
const createLoginSubAgent = (end) => {

    let stage;
    let username, password;

    const handleInitialize = async (promptData) => {
       
        if(await isLoggedIn()){
            return end("You are already logged in, Try logging out first.");
        }
        else{
            stage = "FOLLOWUP_USERNAME";
            return "Sure, what is your username?" ;
                
            
        }
    }

    const handleReceive = async (prompt) => {
        switch(stage) {
            case "FOLLOWUP_USERNAME": return await handleFollowupUsername(prompt);
            case "FOLLOWUP_PASSWORD": return await handleFollowupPassword(prompt);
        }
    }

    const handleFollowupUsername = async (prompt) => {
        let mssg = 
                {
                    msg :"Thanks, and what's your password?",
                    nextIsSensitive : true
                }
        

        // console.log(typeof(mssg))
        username = prompt;
        stage = "FOLLOWUP_PASSWORD";
        return mssg;
      
    }

    const handleFollowupPassword = async (prompt) => {
        password = prompt;
        const resp = await fetch("https://cs571.org/api/s24/hw11/login", {
            method: "POST",
            credentials: "include",
            headers: {
                "X-CS571-ID": "bid_f1b2b24aab28bd2a2f7852d3b2631b258e7a3e587be609c19a027beb3117e513",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        
        if (resp.status === 200) {
            // console.log(await getLoggedInUsername())
            let mssg = 
            {
                msg :"Success! Welcome " + username,
                
                emote: "SUCCESS"
            }

            return end( mssg);
        } else {
            let mssg = 
            {
                msg :"Sorry, your username or password is incorrect.", 
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

export default createLoginSubAgent;
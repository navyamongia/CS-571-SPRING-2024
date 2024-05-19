import createChatDelegator from "./ChatDelegator";
import {getLoggedInUsername, isLoggedIn, logout, ofRandom } from "./Util";
const createChatAgent = () => {
    const CS571_WITAI_ACCESS_TOKEN = "TON4QIMTJSQNDEXMVJO24PODOFAJFMFV"; // Put your CLIENT access token here.

    const delegator = createChatDelegator();

    let chatrooms = [];

    const handleInitialize = async () => {
        const resp = await fetch("https://cs571.org/api/s24/hw11/chatrooms", {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        });
        const data = await resp.json();
        chatrooms = data;

        return "Welcome to BadgerChat! My name is Bucki, how can I help you?";
    }

    const handleReceive = async (prompt) => {
        if (delegator.hasDelegate()) { return delegator.handleDelegation(prompt); }
        const resp = await fetch(`https://api.wit.ai/message?q=${encodeURIComponent(prompt)}`, {
            headers: {
                "Authorization": `Bearer ${CS571_WITAI_ACCESS_TOKEN}`
            }
        })
        const data = await resp.json();
        if (data.intents.length > 0) {
            switch (data.intents[0].name) {
                case "get_help": return handleGetHelp();
                case "get_chatrooms": return handleGetChatrooms();
                case "get_messages": return handleGetMessages(data);
                case "login": return handleLogin();
                case "register": return handleRegister();
                case "create_message": return handleCreateMessage(data);
                case "logout": return handleLogout();
                case "whoami": return handleWhoAmI();
            }
        }
        return "Sorry, I didn't get that. Type 'help' to see what you can do!";
    }

    const handleTranscription = async (rawSound, contentType) => {
        const resp = await fetch(`https://api.wit.ai/dictation`, {
            method: "POST",
            headers: {
                "Content-Type": contentType,
                "Authorization": `Bearer ${CS571_WITAI_ACCESS_TOKEN}`
            },
            body: rawSound
        })
        const data = await resp.text();
        const transcription = data
            .split(/\r?\n{/g)
            .map((t, i) => i === 0 ? t : `{${t}`)  // Turn the response text into nice JS objects
            .map(s => JSON.parse(s))
            .filter(chunk => chunk.is_final)       // Only keep the final transcriptions
            .map(chunk => chunk.text)
            .join(" ");                            // And conjoin them!
        return transcription;
    }

    const handleSynthesis = async (txt) => {
        if (txt.length > 280) {
            return undefined;
        } else {
            const resp = await fetch(`https://api.wit.ai/synthesize`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "audio/wav",
                    "Authorization": `Bearer ${CS571_WITAI_ACCESS_TOKEN}`
                },
                body: JSON.stringify({
                    q: txt,
                    voice: "Rebecca",
                    style: "soft"
                })
            })
            const audioBlob = await resp.blob()
            return URL.createObjectURL(audioBlob);
        }
    }

    const handleGetHelp = async () => {
        //return "I should try to help...";
        return ofRandom([
            "Try asking 'give me a list of chatrooms', or ask for more help!",
            "Try asking 'register for an account', or ask for more help!",
            "Try asking 'tell me the latest 3 messages', or ask for more help!"
 
        ])
    }

    const handleGetChatrooms = async () => {
        console.log(chatrooms)
        //return "I should respond with a list of chatrooms..."
        return "Of course, there are 8 chatrooms: "+chatrooms;
    }

    const handleGetMessages = async (data) => {
        const hasSpecifiedNumber = data.entities["wit$number:number"] ? true : false;
        const numMessages = hasSpecifiedNumber ? data.entities["wit$number:number"][0].value : 1;
       const roomExists = data.entities["chatroom_name:chatroom_name"] ? true : false;
       if(roomExists === false){
        const resp = await fetch(`https://cs571.org/api/s24/hw11/messages?chatroom=&num=${numMessages}`,{
            headers:{
                "X-CS571-ID" : "bid_f1b2b24aab28bd2a2f7852d3b2631b258e7a3e587be609c19a027beb3117e513"
            }
        });
        
        if(resp.status === 200){
            const json = await resp.json();
            const messages =  await json.messages;
        return messages.map(m=> "In " + m.chatroom +", "+m.poster+" created a post titled '" +m.title+"'" +` saying '${m.content}'`)
        }
        
       }
       if( roomExists === true){
        let chatroomName = data.entities["chatroom_name:chatroom_name"][0].value
        const resp = await fetch(`https://cs571.org/api/s24/hw11/messages?chatroom=${chatroomName}&num=${numMessages}`,{
            headers:{
                "X-CS571-ID" : "bid_f1b2b24aab28bd2a2f7852d3b2631b258e7a3e587be609c19a027beb3117e513"
            }
        });
        
        if(resp.status === 200){
            const json = await resp.json();
            const messages =  await json.messages;
        return messages.map(m=> "In " + m.chatroom +", "+m.poster+" created a post titled '" +m.title +`' saying '${m.content}'`)
        }
       }
    }

    const handleLogin = async () => {
        return await delegator.beginDelegation("LOGIN");
    }

    const handleRegister = async () => {
        return await delegator.beginDelegation("REGISTER");
    }

    const handleCreateMessage = async (data) => {
        console.log(data);
        return await delegator.beginDelegation("CREATE",data);
    }

    const handleLogout = async () => {
        // return "I should try to log out..."
        if(await isLoggedIn()){
            await logout();
            return "You have been logged out.";
        }
        else{
            return "You are NOT logged in!"
        }
    }

    const handleWhoAmI = async () => {
        // return "I should see who I am..."
        if(await isLoggedIn()){
            let currentUser = await getLoggedInUsername();
            return "You are currently logged in as " + currentUser;
        }
        else{
            return "You are currently NOT logged in!"
        }
    }

    return {
        handleInitialize,
        handleReceive,
        handleTranscription,
        handleSynthesis
    }
}

export default createChatAgent;
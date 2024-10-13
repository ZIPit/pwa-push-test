import React, {useState, useEffect} from "react";
function Token() {
const [token, setToken] = useState ('empty');
const [permission, setPermission] = useState ('');

const [scrolling, setScrolling] = useState(false);



useEffect(()=>{
    window.addEventListener("click", () => {
        if (scrolling === false) setScrolling(true);
      });       
    setToken(window.token);
    setPermission(window.requestPermission);
    
    
},[scrolling]);

return (
    
    <div> 
        User's Permissions in Browser settings:
        <p style ={permission==='denied'?{color:"red"}:{color:"green"}}>{permission}</p>
        Your FCM Token is(Tap once):
        <br/>
        <input type="text" value={token} id="myInput" readOnly size="200" />
        <br/>
        <button onClick={() => {navigator.clipboard.writeText(token)}}>Copy Token to Clipboard</button>
    </div>
)}
export default Token;
import React, {useState, useEffect} from "react";
function Token() {
const [token, setToken] = useState ('empty');
const [permission, setPermission] = useState ('');

const [scrolling, setScrolling] = useState(false);
useEffect(()=>{
    window.addEventListener("click", () => {
        if (scrolling === false) setScrolling(true);
      });
    setTimeout(console.log('token is',window.token),10000);
    setTimeout(console.log('token is',window.requestPermission),10000);
       
    setToken(window.token);
    setPermission(window.requestPermission);
    

},[scrolling]);

return (
    <div>
        {token}
        <br/> 
        Permissions:
        <br/>
        {permission}
    </div>
)}
export default Token;
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
        {token}
        <br/> 
        Permissions:
        <br/>
        {permission}
    </div>
)}
export default Token;
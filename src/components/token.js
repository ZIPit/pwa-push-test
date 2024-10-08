import React, {useState, useEffect} from "react";
function Token() {
const [token, setToken] = useState ('empty');
const [scrolling, setScrolling] = useState(false);
useEffect(()=>{
    window.addEventListener("click", () => {
        console.log(scrolling);
        if (scrolling === false) setScrolling(true);
      });
    setTimeout(console.log('token is',window.token),10000);
    setToken(window.token);
    console.log('token now is',window.token);

},[scrolling]);

return (
    <div>
        {token}
    </div>
)}
export default Token;
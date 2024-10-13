import React, {useState, useEffect} from "react";
import {Toaster, toast} from "react-hot-toast";
import {requestPermission, onMessageListener} from "../firebase";

function Notification() {
 
    const isPushSupported = () =>
        'Notification' in window &&
        'serviceWorker' in navigator &&
        'PushManager' in window

    useEffect(()=>{
        if (isPushSupported()){
            requestPermission();
        }
        else {console.log('push apps are not supported by OS');}
    

    const push = onMessageListener().then(payload => {
  
    toast.success(
        payload.notification.title +" : "+payload.notification.body, //"${payload.notification.title}: ${payload?.notification?}",
        {
            duration: 5000,
            position: "bottom"
        }
    );

    });
    },[]);
if (isPushSupported()) {
    return (
        <div>
            <p style={{color:"green"}}>Push supported by OS(Browser)</p>
            <Toaster />
        </div>
    )}
else {
    return (
        <div>
            <div>
            <p style={{color:"red"}}>Push are not supported by OS(Browser)</p>
            <Toaster />
        </div>

        </div>
    )
}


}
export default Notification;
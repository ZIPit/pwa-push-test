import React, {useState, useEffect} from "react";
import {Toaster, toast} from "react-hot-toast";
import {requestPermission, onMessageListener} from "../firebase";

function Notification() {
    const [notification, setNotification] = useState ({title: "", body: ""});
    const isPushSupported = () =>
        'Notification' in window &&
        'serviceWorker' in navigator &&
        'PushManager' in window

    useEffect(()=>{
        if (isPushSupported()){
            requestPermission();
        }
        else {console.log('push apps are not supported by OS');}
    

    const unsubscribe = onMessageListener().then(payload => {
        setNotification({
            title: payload?.notification?.title,
            body: payload?.notification?.body
        });
        
    toast.success(
        '${payload?.notification?.title}: ${payload?.notification?}',
        {
            duration: 60000,
            position: "bottom-right"
        }
    );

    });


    return () => {
        unsubscribe.catch(err => console.log("failed: ", err));
    };
    },[]);
return (
    <div>
        <Toaster />
    </div>
)
}
export default Notification;
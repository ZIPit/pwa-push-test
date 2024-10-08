// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getMessaging, getToken, onMessage, isSupported} from "firebase/messaging";

//const {google} = require('googleapis');
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJSRdTXSMDwaGrzwslF6oy0HEz1UFqRL0",
  authDomain: "test-pwa-push-551e2.firebaseapp.com",
  projectId: "test-pwa-push-551e2",
  storageBucket: "test-pwa-push-551e2.appspot.com",
  messagingSenderId: "1057084821569",
  appId: "1:1057084821569:web:3111989b8e583d2cd036c0"
};

window.token= '';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const messaging = getMessaging(app);

const isPushSupported = () =>
  'Notification' in window &&
  'serviceWorker' in navigator &&
  'PushManager' in window
console.log(isPushSupported());
const messaging = (async () => {
  try {
      const isSupportedBrowser = await isSupported();
      if (isSupportedBrowser) {
          return getMessaging(app);
      }
      console.log('Firebase not supported this browser');
      return null;
  } catch (err) {
      console.log(err);
      return null;
  }
  })();
  


  export const requestForToken = async (dispatch) => {
    try {

        const messagingResolve = await messaging;
        
        navigator.serviceWorker.register('/firebase-messaging-sw.js').then(async (registration) => {
            getToken(messagingResolve, {
              serviceWorkerRegistration: registration,
              VapidKey: "BIspkKxTDeNH6p8LazuKdfqzuwCeXOZ2tQK5ALf2qjBUZxsIVcfWbTJ9TUloGqHGUxf_4_dK0x-uHKzhopUMVwU",
            })
            .then((currentToken) => {
              if (currentToken) {
                console.log("Client Token: ", currentToken);
                subscribeUserToTopic(currentToken,"news");
                window.token= currentToken;
              }
              else {
                console.log("No registration token available. Request permission to generate one")
              }
            })            
        });


     } catch (err) {
        console.log('An error occurred while retrieving token. ', err);
    }
    };

  export const requestPermission = () => {
    console.log("Requesting permissions..");
    Notification.requestPermission().then(permission => {
      
      window.requestPermission=permission;

      if (permission==="granted"){
        console.log("Notification User permission granted.");
        return requestForToken()
        .catch(err => {
          console.log("Am error occured when requesting the app registration token.",
          err
          );
        });
      } 
      else if (permission==="default"){
              console.log("Notification User is default");
            }
            else {
              console.log("user permission denied");
            }
            
    });
  };

// if (!isPushSupported()) {
//   console.log("it supprts push apps");
//   requestPermission();
// }

async function subscribeUserToTopic(token,topic) {
  try { // //localhost:3000
    //const response = await fetch('http://localhost:8080/subscribe',{
    const response = await fetch('https://pwa-node-serv.fly.dev/subscribe',{
    
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({token, topic}),
    });
    if (response.ok) {
      console.log('Successfully subscribed to topic', topic);
    } else {
      console.error('Failed to subscribe to topic',token);
    }
  } catch (error) {
    console.error('Error subscribing to topic', error)
  }
}


export const onMessageListener = async () =>
  new Promise((resolve) =>
      (async () => {
          const messagingResolve = await messaging;
          onMessage(messagingResolve, (payload) => {
              console.log('On message in firebase.js is triggered ', messaging, payload);
              resolve(payload);
          });
      })()
  );

   

// export const onMessageListener = () =>
//   new Promise(resolve => {
//     console.log("Blabla");
//     onMessage(messaging, payload => {
//       resolve(payload);
//     });
//   });
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const messaging = getMessaging(app);

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
        
        navigator.serviceWorker.register('/firebase-messaging-sw.js').then(registration => {
            getToken(messagingResolve, {
              serviceWorkerRegistration: registration,
              VapidKey: "BIspkKxTDeNH6p8LazuKdfqzuwCeXOZ2tQK5ALf2qjBUZxsIVcfWbTJ9TUloGqHGUxf_4_dK0x-uHKzhopUMVwU",
            })
            .then((currentToken) => {
              if (currentToken) {
                console.log("Client Token: ", currentToken);
                subscribeUserToTopic(currentToken,"news");
              }
              else {
                console.log("No registration token available. Request permission to generate one")
              }
            })            
        });


        // const currentToken = await getToken(messagingResolve, {
        //     vapidKey: "BIspkKxTDeNH6p8LazuKdfqzuwCeXOZ2tQK5ALf2qjBUZxsIVcfWbTJ9TUloGqHGUxf_4_dK0x-uHKzhopUMVwU",
        // });
        // if (currentToken) {
        //     console.log("Client Token: ", currentToken);
        //     subscribeUserToTopic(currentToken,"news");

        // }
    } catch (err) {
        console.log('An error occurred while retrieving token. ', err);
    }
    };

  export const requestPermission = () => {
    console.log("Requesting permissions..");
    Notification.requestPermission().then(permission => {
      
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
  
  requestPermission();

async function subscribeUserToTopic(token,topic) {
  try { // //localhost:3000
    const response = await fetch('http://localhost:3000/subscribe',{
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
              // console.log('On message: ', messaging, payload);
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
// Import the functions you need from the SDKs you need
importScripts('https://www.gstatic.com/firebasejs/9.9.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.9.1/firebase-messaging-compat.js');

//import { getMessaging, onMessage } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

// const messaging = getMessaging();

// onMessage(messaging, (payload) => {
//     console.log('Message received. ', payload);
//     // ...
//   });

self.addEventListener("push", function(event) {
  console.log("Received by sw")
  const notif = event.data.json().notification;
  event.waitUntil(
    self.registration.showNotification(notif.title,{
      body: notif.body,
      icon: notif.icon,
      data: {
        url: notif.click_action
      }
    })
  )
  
})

 messaging.onBackgroundMessage(function(payload) {
   console.log("Received background message ", payload);

   const notificationTitle = payload.notification.title;
   const notificationOptions = {
     body: payload.notification.body,
     icon: '/logo192.png'
   };

   self.registration.showNotification(notificationTitle, notificationOptions);
 });
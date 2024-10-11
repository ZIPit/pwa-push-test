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
  appId: "1:1057084821569:web:3111989b8e583d2cd036c0",
  measurementId: "G-YQW5100TRC"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();


// messaging.onBackgroundMessage(function(payload) {
//   console.log("Received background message ", payload);

//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: '/logo192.png'
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });



 messaging.onBackgroundMessage(function(payload) {
   console.log("Received background message ", payload);
   const link = payload.fcmOptions?.link || payload.data?.link;
   console.log("link is", link); 
   
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
     body: payload.notification.body,
     icon: payload.notification.icon,
     data: { url:link },
    };    

   self.registration.showNotification(notificationTitle, notificationOptions);
 });

////Code for adding event on click of notification
self.addEventListener('notificationclick', function (event) {
  console.log("notificationclick", event)
  var urlToRedirect = event.notification.data.url;
  event.notification.close();
  event.waitUntil(self.clients.openWindow(urlToRedirect));
});


// self.addEventListener("notificationclick", function (event) {
//   console.log("Notification event received");
//   event.notification.close();

//   event.waitUntil(
//     clients
//       .matchAll({type: "window", includeUncontrolled:true})
//       .then(function(clientList) {
//         const url = event.notification.data.url;
//         console.log("clients:" + clientList.length);
//         if (!url) return;

//         for (const client of clientList) {
//           if (client.url === url && "focus" in client) {
//             return client.focus();
//           }
//           if (clients.openWindow) {
//             console.log("OPENWINDOW ON CLIENT");
//             return clients.openWindow(url);
//           }
//         }
//       } )
//   )
// });








 // const messaging = getMessaging();

// onMessage(messaging, (payload) => {
//     console.log('Message received. ', payload);
//     // ...
//   });


// self.addEventListener("notificationclick", function (event)  {
//   const notification = event.notification;
//   const messageId = notification.data.messageId;
//   // Log custom event with Firebase Analytics
//   firebase.analytics().logEvent('notification_click', {
//     messageId: messageId
//   });
//   console.log('Po idee click otpravilsya');
// });

// self.addEventListener("push", function(event) {
//   const notif = event.data.json().notification;
//   console.log("Received by sw", notif)
//   event.waitUntil(
//     self.registration.showNotification(notif.title,{
//       body: notif.body,
//       icon: notif.icon,
//       data: {
//         //url: notif.click_action
//         url: "https://main.d3o1dmys0lqnml.amplifyapp.com/"
//       }
//     })
//   )
  
// })
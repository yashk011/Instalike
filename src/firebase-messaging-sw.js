/*
importScripts("https://www.gstatic.com/firebasejs/5.0.4/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/5.0.4/firebase-messaging.js");


firebase.initializeApp({
  messagingSenderId : ''
});
*/



importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
var config = {
  apiKey: "AIzaSyDzML50mArCAfcqMBcSgIfkgo0q4el12es",
  authDomain: "instalike-30dc2.firebaseapp.com",
  databaseURL: "https://instalike-30dc2.firebaseio.com",
  projectId: "instalike-30dc2",
  storageBucket: "https://instalike-30dc2.appspot.com",
  messagingSenderId: "1073620715518"
};
firebase.initializeApp(config);

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

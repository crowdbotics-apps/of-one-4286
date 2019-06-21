import firebase from "firebase";
import "@firebase/firestore";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAe_giJHXiOz7u2eLTIJSo8VaaQkynmWlY",
  authDomain: "of-one-4286.firebaseapp.com",
  databaseURL: "https://of-one-4286.firebaseio.com",
  projectId: "of-one-4286",
  storageBucket: "of-one-4286.appspot.com",
  messagingSenderId: "57293716288",
  appId: "1:57293716288:web:f16509fc4c643544"
};
// var config = {
//     apiKey: "AIzaSyAkoMIMF65nm9c1vKU52Uyw-8BK3LdPjm8",
//     authDomain: "eastwest-3340.firebaseapp.com",
//     databaseURL: "https://eastwest-3340.firebaseio.com",
//     projectId: "eastwest-3340",
//     storageBucket: "eastwest-3340.appspot.com",
//     messagingSenderId: "720515782995",
//     appId: "1:720515782995:web:33e1c839f49e01ae"
//   };

firebase.initializeApp(config);

const store = firebase.firestore();
const auth = firebase.auth();

export { store, auth, firebase };

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


firebase.initializeApp(config);

const store = firebase.firestore();
const auth = firebase.auth();

export { store, auth, firebase };

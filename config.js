import firebase from 'firebase'
require("@firebase/firestore")

const firebaseConfig = {
    apiKey: "AIzaSyBwKYFv7-4mi8_0ttfVxw_Xtuv1DivBiEA",
    authDomain: "bedtimestories-b2cee.firebaseapp.com",
    databaseURL: "https://bedtimestories-b2cee.firebaseio.com",
    projectId: "bedtimestories-b2cee",
    storageBucket: "bedtimestories-b2cee.appspot.com",
    messagingSenderId: "1035131120920",
    appId: "1:1035131120920:web:56505d5e85d2221cbe826d"
  };

  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default  firebase.firestore()      
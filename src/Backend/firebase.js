import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyBM0EU1C1QnY9k842njeyYY_5-CUsGkdaU",
    authDomain: "coca-8cf9d.firebaseapp.com",
    databaseURL: "https://coca-8cf9d.firebaseio.com",
    projectId: "coca-8cf9d",
    storageBucket: "coca-8cf9d.appspot.com",
    messagingSenderId: "944579909497",
    appId: "1:944579909497:web:766283c050a1fa896241a8",
    measurementId: "G-W72M2MGLGD"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth()
const firestore = firebase.firestore()
export {
  auth, firestore
}

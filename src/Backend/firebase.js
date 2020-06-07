import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

var firebaseConfig = {
    // YOUR CONFIG HERE
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth()
const firestore = firebase.firestore()
export {
  auth, firestore
}

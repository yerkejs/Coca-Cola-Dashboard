import {firestore} from './firebase'

export const loadData = () =>
  firestore.collection("users").get()

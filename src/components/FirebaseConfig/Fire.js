import firebase from 'firebase'
import 'firebase/database'
import 'firebase/auth'
import Rebase from 're-base'

// initialize firebase
var config = {
    apiKey: "AIzaSyCqsymxg9UXE9cl_81L8c4_K5gajWIWa0A",
    authDomain: "dodgeem-43d2c.firebaseapp.com",
    databaseURL: "https://dodgeem-43d2c.firebaseio.com",
    projectId: "dodgeem-43d2c",
    storageBucket: "dodgeem-43d2c.appspot.com",
    messagingSenderId: "269446265866"
  };
//const fire = firebase.initializeApp(config);
const app = firebase.initializeApp(config);

//configure authentication
export const auth = firebase.auth()
export const googleProvider = new firebase.auth.GoogleAuthProvider()
//configure database
const db = firebase.database(app)
const base  = Rebase.createClass(db)

export default base
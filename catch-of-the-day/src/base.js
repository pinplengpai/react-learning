import Rebase from 're-base'; // allow us to mirror a state to the  firebase 
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyD7FEJCV0lujdZSgRCmjf0Afd0UuhpvDEA",
    authDomain: "catch-of-the-day-pin.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-pin.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database())

// this is a named export
export { firebaseApp };

// this is a defualt export 
export default base; // will allow us to bring it to other file
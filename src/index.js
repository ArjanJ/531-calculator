import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase';
import App from './App';
import './index.css';

const firebaseConfig = {
  apiKey: 'AIzaSyBFR1cE2u34m1p_q5gTiPIUBpTUdf7Fbwk',
  authDomain: 'logger-8b13a.firebaseapp.com',
  databaseURL: 'https://logger-8b13a.firebaseio.com',
  storageBucket: 'logger-8b13a.appspot.com',
};

firebase.initializeApp(firebaseConfig);

const signIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider)
    .then(result => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const token = result.credential.accessToken;
    // The signed-in user info.
    const user = result.user;
  }).catch(error => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    const credential = error.credential;
  });
};


ReactDOM.render(
  <App signIn={signIn} />,
  document.getElementById('root')
);

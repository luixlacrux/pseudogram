import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import App from './App';
import './index.css';

firebase.initializeApp({
  apiKey: "AIzaSyB_ph03pbQ97U9kjTS8j2KnSnXkR-9ZQMw",
  authDomain: "pseudogram-2854d.firebaseapp.com",
  databaseURL: "https://pseudogram-2854d.firebaseio.com",
  projectId: "pseudogram-2854d",
  storageBucket: "pseudogram-2854d.appspot.com",
  messagingSenderId: "102251263535"
});

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

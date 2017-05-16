import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/App';
import firebase from 'firebase'
import firebaseConfig from '../utils/firebase'

firebase.initializeApp(firebaseConfig);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

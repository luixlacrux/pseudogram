import React from 'react'
import ReactDOM from 'react-dom'
import firebase from 'firebase'
import firebaseConfig from './utils/firebase'
import App from './components/App'
import './styles/index.css'

import WebFontLoader from 'webfontloader';

WebFontLoader.load({
  google: {
    families: ['Roboto:300,400,500,700', 'Material Icons', 'Cookie'],
  },
});

firebase.initializeApp(firebaseConfig)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

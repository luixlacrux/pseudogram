import React from 'react'
import ReactDOM from 'react-dom'
import firebase from 'firebase'
import firebaseConfig from './utils/firebase'
import App from './components/App'
import './styles/index.css'

firebase.initializeApp(firebaseConfig)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

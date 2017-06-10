import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import './styles/index.css'

import Routes from './routes'
// initializeApp firebase
import './utils/firebase'
// create store
import store from './store'
// Load web fonts
import WebFontLoader from 'webfontloader'

WebFontLoader.load({
  google: {
    families: ['Roboto:300,400,500,700', 'Material Icons', 'Cookie'],
  },
})

const Root = () => (
  <Provider store={store}>
    <Router>
      <Routes />
    </Router>
  </Provider>
)

ReactDOM.render(
  <Root />,
  document.getElementById('root')
)

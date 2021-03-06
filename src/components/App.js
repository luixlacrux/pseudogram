import React, { Component } from 'react'
import DocumentTitle from 'react-document-title'
import firebase from 'firebase'

import Navbar from './Navbar'
import FileUpload from './FileUpload'
import PhotoGrid from './PhotoGrid'

class App extends Component {
  constructor () {
    super()
    this.state = {
      user: null,
      uploadValue: null,
      pictures: []
    }

    this.handleAuth = this.handleAuth.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.handleUpload = this.handleUpload.bind(this)
    this.setPercentage = this.setPercentage.bind(this)
    this.resetPercentage = this.resetPercentage.bind(this)
    this.handleErrorUpload = this.handleErrorUpload.bind(this)
  }

  componentWillMount () {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user })
    })

    const picturesRef = firebase.database().ref('pictures')

    picturesRef.on('child_added', snapshot => {
      const picture = Object.assign({}, snapshot.val(), { id: snapshot.key })

      this.setState({
        pictures: [
          picture,
          ...this.state.pictures
        ]
      })
    })

    picturesRef.on('child_removed', snapshot => {
      this.setState({
        pictures: this.state.pictures.filter(picture =>
          picture.id !== snapshot.key
        )
      })
    })
  }

  handleAuth () {
    const provider = new firebase.auth.GoogleAuthProvider()

    firebase.auth().signInWithPopup(provider)
      .then(result => console.log(`${result.user.email} ha iniciado sesion`))
      .catch(error => console.log(`Error ${error.code}: ${error.message}`))
  }

  handleLogout () {
    firebase.auth().signOut()
      .then(result => console.log(`${result.user.email} ha salido`))
      .catch(error => console.log(`Error ${error.code}: ${error.message}`))
  }

  handleUpload (file) {
    const { uid, photoURL, displayName } = this.state.user
    const storageRef = new firebase.storage().ref(`/photos/${uid}/${file.name}`)
    const task = storageRef.put(file)

    task.on('state_changed',
      this.setPercentage,
      this.handleErrorUpload,
      () => {
        const record = {
          image: task.snapshot.downloadURL,
          path: task.snapshot.ref.location.path,
          owner: {
            uid,
            photoURL,
            displayName,
          },
          createdAt: Date.now(),
        }

        const dbRef = firebase.database().ref('pictures')
        const newPicture = dbRef.push()
        newPicture.set(record)
        this.resetPercentage()
      }
    )
  }

  setPercentage (snapshot) {
    let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    this.setState({
      uploadValue: percentage
    })
  }

  resetPercentage () {
    this.setState({
      uploadValue: null
    })
  }

  handleErrorUpload (error) {
    error && console.error(error.message)
  }

  renderLoginButton () {
    // si el usuario está logeado
    if (this.state.user) {
      return (
        <div>
          <FileUpload onUpload={this.handleUpload} uploadValue={this.state.uploadValue} />
          <PhotoGrid posts={this.state.pictures} />
        </div>
      )
    } else {
      // si no lo esta
      return <button onClick={this.handleAuth}>Login con Google</button>
    }
  }

  render () {
    const { photoURL, displayName } = this.state.user || {}

    return (
      <DocumentTitle title="Pseudogram">
        <section className="App">
          <Navbar
            photoURL={photoURL}
            displayName={displayName}
            onLogout={this.handleLogout}
          />
          <div className="App-intro">
            {this.renderLoginButton()}
          </div>
        </section>
      </DocumentTitle>
    )
  }
}

export default App

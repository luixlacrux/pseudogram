import React, { Component } from 'react'
import firebase from 'firebase'

import Navbar from './Navbar'
import FileUpload from './FileUpload'
import PhotoGrid from './PhotoGrid'

class App extends Component {
  constructor () {
    super()
    this.state = {
      user: null,
      uploadValue: 0,
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
        pictures: this.state.pictures.concat(picture)
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

  handleUpload (event) {
    const { uid, photoURL, displayName } = this.state.user
    const file = event.target.files[0]
    const storageRef = new firebase.storage().ref(`/photos/${file.name}`)
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
      uploadValue: 0
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
          <h3>Sube un foto para compartir!</h3>
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
    )
  }
}

export default App

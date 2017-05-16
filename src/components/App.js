import React, { Component } from 'react'
import firebase from 'firebase'
import uid from 'uid'

import Navbar from './Navbar'
import FileUpload from './FileUpload'
// import '../App.scss'

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
      this.setState({
        pictures: this.state.pictures.concat(snapshot.val())
      })
    })

    picturesRef.on('child_removed', snapshot => {
      this.setState({
        pictures: this.state.pictures.filter(picture =>
          picture.id !== snapshot.val().id
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
    const file = event.target.files[0]
    const storageRef = new firebase.storage().ref(`/photos/${file.name}`)
    const task = storageRef.put(file)

    task.on('state_changed',
      this.setPercentage,
      this.handleErrorUpload,
      () => {
        const record = {
          id: uid(),
          photoURL: this.state.user.photoURL,
          displayName: this.state.user.displayName,
          image: task.snapshot.downloadURL,
          path: task.snapshot.ref.location.path,
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
          <img width="80" src={this.state.user.photoURL} alt={this.state.user.displayName}/>
          <p>Hola, {this.state.user.displayName}!</p>
          <button onClick={this.handleLogout}>Logout</button>

          <FileUpload onUpload={this.handleUpload} uploadValue={this.state.uploadValue} />

          {
            this.state.pictures.map(picture => (
              <div key={picture.id}>
                <img src={picture.image} alt="" />
                <br/>
                <img src={picture.photoURL} alt={picture.displayName} />
                <br/>
                <span>{picture.displayName}</span>
              </div>
            ))
          }
        </div>
      )
    } else {
      // si no lo esta
      return <button onClick={this.handleAuth}>Login con Google</button>
    }
  }

  render () {
    return (
      <section className="App">
        <Navbar />
        <div className="App-header">
          <h2>Pseudogram</h2>
        </div>
        <div className="App-intro">
          {this.renderLoginButton()}
        </div>
      </section>
    )
  }
}

export default App

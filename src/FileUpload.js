import React, { Component } from 'react'
import firebase from 'firebase'

class FileUpload extends Component {
  constructor () {
    super()
    this.state = {
      uploadValue: 0,
      picture: null
    }

    this.handleUpload = this.handleUpload.bind(this)
    this.setPercentage = this.setPercentage.bind(this)
  }

  handleUpload (event) {
    const file = event.target.files[0]
    const storageRef = new firebase.storage().ref(`/photos/${file.name}`)
    const task = storageRef.put(file)

    task.on('state_changed',
      this.setPercentage,
      this.handleError,
      () => {
        this.setState({
          uploadValue: 100,
          picture: task.snapshot.downloadURL
        })
      }
    )
  }

  setPercentage (snapshot) {
    let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    this.setState({
      uploadValue: percentage
    })
  }

  handleError (error) {
    error && console.error(error.message)
  }

  render () {
    return (
      <div>
        <progress value={this.state.uploadValue} max="100">
          {this.state.uploadValue}
        </progress>
        <br/>
        <input type="file" onChange={this.handleUpload}/>
        <br/>
        <img width="320" src={this.state.picture} alt=""/>
      </div>
    )
  }
}

export default FileUpload

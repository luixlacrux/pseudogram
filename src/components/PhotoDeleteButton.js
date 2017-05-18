import React from 'react'
import firebase from 'firebase'
import Button from 'react-md/lib/Buttons'


function DeleteButton ({ photoId }) {
  const handleOnClick = e => {
    const dbRef = firebase.database().ref('pictures')
    dbRef.child(photoId).remove()
  }

  return (
    <Button
      icon
      className="md-cell--right"
      onClick={handleOnClick}
      >
        delete
      </Button>
  )
}

export default DeleteButton

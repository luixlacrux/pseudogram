import React from 'react'
import firebase from 'firebase'
import Button from 'react-md/lib/Buttons'


function DeleteButton ({ photoId, path, }) {
  const handleOnClick = e => {
    firebase.storage().ref(path).delete()
      .then(() => console.log('Image deleted successfully'))
      .catch(err => console.error('Oops something has gone wrong', err))

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

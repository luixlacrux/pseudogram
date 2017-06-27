import React from 'react'
import Button from 'react-md/lib/Buttons'
import { picturesAPI } from '../utils/firebase'


function DeleteButton ({ photoId, path, }) {
  const handleOnClick = e => {
    picturesAPI.remove(photoId, path)
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

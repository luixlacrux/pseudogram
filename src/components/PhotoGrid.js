import React from 'react'
import Photo from './Photo'
import '../styles/photo.css'

function PhotoGrid ({ photos }) {
  return (
    <div className="PhotoGrid">
      {photos.map((photo, i) =>
        <Photo key={i} {...photo} />
      )}
    </div>
  )
}

export default PhotoGrid

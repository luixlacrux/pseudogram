import React from 'react'
import Photo from './Photo'
import '../styles/photo.css'

function PhotoGrid ({ photos }) {
  return (
    <div className="PhotoGrid">
      {photos.length > 0
        ? photos.map((photo, i) =>
            <Photo key={i} {...photo} />
          )
        : <h5>Oops is empty :'(</h5>
      }
    </div>
  )
}

export default PhotoGrid

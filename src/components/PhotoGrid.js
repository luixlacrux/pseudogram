import React from 'react'
import Photo from './Photo'
import '../styles/photo.css'

function PhotoGrid ({ posts }) {
  return (
    <div className="PhotoGrid">
      {posts.map((post, i) =>
        <Photo key={i} {...post} />
      )}
    </div>
  )
}

export default PhotoGrid

import React from 'react'
import Photo from './Photo'
import '../styles/photo.css'

function PhotoGrid ({ posts }) {
  return (
    <div className="PhotoGrid">
      {posts.map(post =>
        <Photo
          key={post.id}
          id={post.id}
          image={post.image}
          owner={post.owner}
          createdAt={post.createdAt}
        />
      )}
    </div>
  )
}

export default PhotoGrid

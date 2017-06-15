import React, { Component } from 'react'
import PropTypes from 'prop-types'

import PhotoGrid from '../components/PhotoGrid'
import FileUpload from '../components/FileUpload'

class Home extends Component {
  static propTypes = {
    photos: PropTypes.shape({
      isFetching: PropTypes.bool.isRequired,
      items: PropTypes.array.isRequired,
    }),
    upload: PropTypes.shape({
      uploadValue: PropTypes.number,
      error: PropTypes.object,
    }),
    fetchPhotos: PropTypes.func.isRequired,
    uploadPhoto: PropTypes.func.isRequired,
  }

  componentDidMount () {
    this.props.fetchPhotos()
  }

  render () {
    const { photos, upload, uploadPhoto } = this.props
    if (photos.isFetching) return <h1>Loading...</h1>

    return (
      <div>
        {upload.error &&
          <p style={{ color: 'red' }}>{upload.error.message}</p>
        }
        <FileUpload
          onUpload={uploadPhoto}
          uploadValue={upload.uploadValue}
         />
        <PhotoGrid posts={photos.items} />
      </div>
    )
  }
}

export default Home

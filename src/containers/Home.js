import { connect } from 'react-redux'
import { fetchPhotos } from '../actions/photos'
import { uploadPhoto } from '../actions/upload'

import Home from '../components/Home'

function mapStateToProps (state) {
  const { photos, upload, } = state
  return {
    photos,
    upload,
  }
}

export default connect(mapStateToProps, {
  fetchPhotos,
  uploadPhoto,
})(Home)

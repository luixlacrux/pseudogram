import { connect } from 'react-redux'
import { initializePhotos } from '../actions/photos'
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
  initializePhotos,
  uploadPhoto,
})(Home)

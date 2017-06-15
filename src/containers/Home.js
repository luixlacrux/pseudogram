import { connect } from 'react-redux'
import { fetchPhotos } from '../actions/photos'

import Home from '../components/Home'

function mapStateToProps (state) {
  return {
    ...state.photos
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchPhotos: () => dispatch(fetchPhotos())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

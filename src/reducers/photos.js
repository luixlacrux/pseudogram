import {
  REQUEST_PHOTOS,
  RECEIVED_PHOTOS,
  FAILED_GETTING_PHOTOS,
} from '../actions/photos'

const initialState = {
  isFetching: false,
  items: [],
  error: null,
  lastUpdate: null,
}

export default function photos (state = initialState, action) {
  switch (action.type) {
    case REQUEST_PHOTOS:
      return {
        ...state,
        isFetching: true,
      }
    case RECEIVED_PHOTOS:
      const { photos = [] } = action
      return {
        ...state,
        isFetching: false,
        error: null,
        items: Object.keys(photos).map(i => photos[i]),
      }
    case FAILED_GETTING_PHOTOS:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }

    default:
      return state
  }
}

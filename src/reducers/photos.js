import {
  REQUEST_PHOTOS,
  FAILED_GETTING_PHOTOS,
  ADD_PHOTO,
  REMOVE_PHOTO,
  EMPTY_PHOTOS,
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
        items: [],
        isFetching: true,
      }
    case EMPTY_PHOTOS:
      return {
        ...state,
        items: [],
        isFetching: false,
      }
    case FAILED_GETTING_PHOTOS:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    case ADD_PHOTO:
      return {
        ...state,
        isFetching: false,
        items: [
          action.photo,
          ...state.items,
        ],
        lastUpdate: Date.now()
      }
    case REMOVE_PHOTO:
      return {
        ...state,
        items: state.items.filter(photo => {
          return photo.id !== action.photo.id
        }),
        lastUpdate: Date.now()
      }

    default:
      return state
  }
}

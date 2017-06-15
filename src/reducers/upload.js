import {
  START_UPLOAD,
  PERCENTAGE_UPLOAD,
  ERROR_UPLOAD,
  SUCCESS_UPLOAD,
} from '../actions/upload'

const initialState = {
  uploadValue: null,
  inProgress: false,
}

export default function upload (state = initialState, action) {
  switch (action.type) {
    case START_UPLOAD:
      return {
        ...state,
        inProgress: true,
        image: null,
      }
    case PERCENTAGE_UPLOAD:
      return {
        ...state,
        uploadValue: action.uploadValue,
      }
    case ERROR_UPLOAD:
      return {
        inProgress: false,
        error: action.error,
        uploadValue: 0,
      }
    case SUCCESS_UPLOAD:
      return {
        inProgress: false,
        uploadValue: null,
        image: action.image,
      }

    default:
      return state

  }
}

import { storage } from '../utils/firebase'

export const START_UPLOAD = 'START_UPLOAD'
export const PERCENTAGE_UPLOAD = 'PERCENTAGE_UPLOAD'
export const ERROR_UPLOAD = 'ERROR_UPLOAD'
export const SUCCESS_UPLOAD = 'SUCCESS_UPLOAD'

export function startUpload () {
  return {
    type: START_UPLOAD,
  }
}

export function uploadPhoto (file) {
  return (dispatch, getState) => {
    dispatch(startUpload())

    const { uid } = getState().auth.user
    const task = storage.ref(`/photos/${uid}/${file.name}`).put(file)

    task.on('state_changed',
      (snap) => dispatch(setPercentageUpload(snap)),
      (error) => dispatch(errorUpload(error)),
      () => dispatch(successUpload(task)),
    )
  }
}

export function successUpload (task) {
  return {
    type: SUCCESS_UPLOAD,
    image: {
      url: task.snapshot.downloadURL,
      path: task.snapshot.ref.location.path,
    }
  }
}

export function setPercentageUpload (snap) {
  const percentage = (snap.bytesTransferred / snap.totalBytes) * 100
  return {
    type: PERCENTAGE_UPLOAD,
    uploadValue: percentage,
  }
}

export function errorUpload (error) {
  return {
    type: ERROR_UPLOAD,
    error: error,
  }
}

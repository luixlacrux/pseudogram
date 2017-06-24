import { storage } from '../utils/firebase'
import { newPhoto } from './photos'

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

    const { uid, displayName, photoURL } = getState().auth.user
    const task = storage.ref(`/photos/${uid}/${file.name}`).put(file)

    return task.on('state_changed',
      (snap) => {dispatch(setPercentageUpload(snap))},
      (error) => {dispatch(errorUpload(error))},
      () => {
        const photo = {
          image: task.snapshot.downloadURL,
          path: task.snapshot.ref.location.path,
          createdAt: Date.now(),
          owner: {
            uid,
            displayName,
            photoURL,
          }
        }
        dispatch(successUpload())
        newPhoto(photo)
      },
    )
  }
}

export function successUpload () {
  return {
    type: SUCCESS_UPLOAD,
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

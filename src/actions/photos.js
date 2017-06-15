import { database } from '../utils/firebase'

export const REQUEST_PHOTOS = 'REQUEST_PHOTOS'
export const RECEIVED_PHOTOS = 'RECEIVED_PHOTOS'
export const FAILED_GETTING_PHOTOS = 'FAILED_GETTING_PHOTOS'
export const PHOTO_ADDED = 'PHOTO_ADDED'

export function requestPhotos () {
  return {
    type: REQUEST_PHOTOS,
  }
}

export function fetchPhotos () {
  return dispatch => {
    dispatch(requestPhotos())
    return database.ref('/pictures').once('value', snap => {
      const photos = snap.val()
      dispatch(showPhotos(photos))
    })
    .catch(error => {
      console.log(error)
      dispatch(showError(error))
    })
  }
}

export function showPhotos (photos) {
  return {
    type: RECEIVED_PHOTOS,
    photos,
  }
}

export function showError (error) {
  return {
    type: FAILED_GETTING_PHOTOS,
    error,
  }
}

import { database } from '../utils/firebase'

export const REQUEST_PHOTOS = 'REQUEST_PHOTOS'
export const RECEIVED_PHOTOS = 'RECEIVED_PHOTOS'
export const FAILED_GETTING_PHOTOS = 'FAILED_GETTING_PHOTOS'
export const ADD_PHOTO = 'ADD_PHOTO'
export const NEW_PHOTO = 'NEW_PHOTO'

export function requestPhotos () {
  return {
    type: REQUEST_PHOTOS,
  }
}

export function fetchPhotos () {
  return dispatch => {
    dispatch(requestPhotos())
    return database.ref('/pictures').on('child_added', snap => {
      const photo = Object.assign({}, snap.val(), { id: snap.key })
      dispatch(addPhoto(photo))
    })
  }
}

export function newPhoto (photo) {
  return dispatch => {
    return database.ref('/pictures').push(photo)
  }
}

export function addPhoto (photo) {
  return {
    type: ADD_PHOTO,
    photo,
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

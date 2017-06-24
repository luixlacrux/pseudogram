import { database } from '../utils/firebase'

export const REQUEST_PHOTOS = 'REQUEST_PHOTOS'
export const FAILED_GETTING_PHOTOS = 'FAILED_GETTING_PHOTOS'
export const ADD_PHOTO = 'ADD_PHOTO'
export const NEW_PHOTO = 'NEW_PHOTO'
export const EMPTY_PHOTOS = 'EMPTY_PHOTOS'

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
      if (photos) {
        Object.keys(photos)
          .map(i => photos[i])
          .forEach(photo => dispatch(addPhoto(photo)))
      } else {
        dispatch(emptyPhotos())
      }

    })
    // return database.ref('/pictures').on('child_added', snap => {
    //   const photo = Object.assign({}, snap.val(), { id: snap.key })
    //   dispatch(addPhoto(photo))
    // })
  }
}

export function newPhoto (photo) {
  return database.ref('/pictures').push(photo)
}

export function addPhoto (photo) {
  return {
    type: ADD_PHOTO,
    photo,
  }
}

export function emptyPhotos () {
  return {
    type: EMPTY_PHOTOS,
  }
}

export function showError (error) {
  return {
    type: FAILED_GETTING_PHOTOS,
    error,
  }
}

import { database } from '../utils/firebase'

export const REQUEST_PHOTOS = 'REQUEST_PHOTOS'
export const FAILED_GETTING_PHOTOS = 'FAILED_GETTING_PHOTOS'
export const ADD_PHOTO = 'ADD_PHOTO'
export const NEW_PHOTO = 'NEW_PHOTO'
export const EMPTY_PHOTOS = 'EMPTY_PHOTOS'

const picturesRef = database.ref('/pictures')

export function initializePhotos () {
  return dispatch => {
    dispatch(observeIsAdded())
    dispatch(observeIsRemoved())
  }
}

function requestPhotos () {
  return {
    type: REQUEST_PHOTOS,
  }
}

function observeIsAdded () {
  return dispatch => {
    dispatch(requestPhotos())
    // Listen when new photo is added.
    return picturesRef.on('child_added', snap => {
      const photo = Object.assign({}, snap.val(), { id: snap.key })
      dispatch(addPhoto(photo))
    })
  }
}

function observeIsRemoved() {
  return dispatch => {
    return picturesRef.on('child_removed', snap => {
      // something
      console.log('Remove')
    })
  }
}

export function newPhoto (photo) {
  return database.ref('/pictures').push(photo)
}

function addPhoto (photo) {
  return {
    type: ADD_PHOTO,
    photo,
  }
}

// function emptyPhotos () {
//   return {
//     type: EMPTY_PHOTOS,
//   }
// }
//
// function showError (error) {
//   return {
//     type: FAILED_GETTING_PHOTOS,
//     error,
//   }
// }

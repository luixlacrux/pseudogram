import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyB_ph03pbQ97U9kjTS8j2KnSnXkR-9ZQMw",
  authDomain: "pseudogram-2854d.firebaseapp.com",
  databaseURL: "https://pseudogram-2854d.firebaseio.com",
  projectId: "pseudogram-2854d",
  storageBucket: "pseudogram-2854d.appspot.com",
  messagingSenderId: "102251263535"
}

firebase.initializeApp(config)

export const database = firebase.database()
export const storage = firebase.storage()

export const picturesAPI = {
  picturesRef: database.ref('/pictures'),

  add: function (photo) {
    this.picturesRef.push(photo)
  },

  remove: function (photoId, path) {
    storage.ref(path).delete()
      .then(() => console.log('Image deleted successfully'))
      .catch(err => console.error('Oops something has gone wrong', err))

    this.picturesRef.child(photoId).remove()
  }
}

export default firebase

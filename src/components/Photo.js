import React from 'react'
import firebase from 'firebase'
import Card from 'react-md/lib/Cards/Card'
import Divider from 'react-md/lib/Dividers'
import CardTitle from 'react-md/lib/Cards/CardTitle'
// import CardActions from 'react-md/lib/Cards/CardActions'
// import Media, { MediaOverlay } from 'react-md/lib/Media'
import Media from 'react-md/lib/Media'

import UserAvatar from './UserAvatar'
import DeleteButton from './PhotoDeleteButton'

function Photo (props) {
  const user = firebase.auth().currentUser
  const { id, image, owner } = props

  const avatar = <UserAvatar photoURL={owner.photoURL} />
  const deleteButton = user.uid === owner.uid
    ? <DeleteButton photoId={id} /> : null

  return (
    <Card className="Photo">
      <CardTitle
        avatar={avatar}
        title={owner.displayName}
        children={deleteButton}
      />
      <Divider />
      <Media aspectRatio='1-1'>
        <img
          src={image}
          alt={`${owner.displayName}-${id}`}
          role="presentation"
        />
      </Media>
    </Card>
  )
}

export default Photo

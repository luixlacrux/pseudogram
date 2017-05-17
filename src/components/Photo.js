import React from 'react'
import Card from 'react-md/lib/Cards/Card'
import Divider from 'react-md/lib/Dividers'
import CardTitle from 'react-md/lib/Cards/CardTitle'
// import CardActions from 'react-md/lib/Cards/CardActions'
// import Media, { MediaOverlay } from 'react-md/lib/Media'
import Media from 'react-md/lib/Media'

import UserAvatar from './UserAvatar'

function Photo (props) {
  const { id, image, photoURL, displayName } = props
  const avatar = <UserAvatar photoURL={photoURL} />

  return (
    <Card className="Photo">
      <CardTitle
        avatar={avatar}
        title={displayName}
      />
      <Divider />
      <Media aspectRatio='1-1'>
        <img
          src={image}
          alt={`${displayName}-${id}`}
          role="presentation"
        />
      </Media>
    </Card>
  )
}

export default Photo

import React from 'react'
import Avatar from 'react-md/lib/Avatars'

function UserAvatar ({ photoURL }) {
  return (
    <Avatar
      src={photoURL}
      role="presentation"
    />
  )
}

export default UserAvatar

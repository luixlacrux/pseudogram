import React, { PureComponent } from 'react'
import firebase from 'firebase'
import Card from 'react-md/lib/Cards/Card'
import Divider from 'react-md/lib/Dividers'
import CardTitle from 'react-md/lib/Cards/CardTitle'
import moment from 'moment'
// import CardActions from 'react-md/lib/Cards/CardActions'
// import Media, { MediaOverlay } from 'react-md/lib/Media'
import Media from 'react-md/lib/Media'

import UserAvatar from './UserAvatar'
import DeleteButton from './PhotoDeleteButton'

class Photo extends PureComponent {
  state = {
    relativeTime: moment(this.props.createdAt).fromNow(),
    user: firebase.auth().currentUser,
  }

  componentDidMount () {
    // update every 3 min
    setInterval(() => {
      this.setState({
        relativeTime: moment(this.props.createdAt).fromNow(),
      })
    }, 180000)
  }

  render () {
    const { id, image, owner, } = this.props

    const avatar = <UserAvatar photoURL={owner.photoURL} />
    const deleteButton = this.state.user.uid === owner.uid
    ? <DeleteButton photoId={id} /> : null

    return (
      <Card className="Photo">
        <CardTitle
          avatar={avatar}
          title={owner.displayName}
          subtitle={this.state.relativeTime}
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
}

export default Photo

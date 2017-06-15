import React, { Component } from 'react'

import PhotoGrid from '../components/PhotoGrid'

class Home extends Component {
  componentDidMount () {
    this.props.fetchPhotos()
  }

  render () {
    if (this.props.isFetching) return <h1>Loading...</h1>

    return (
      <PhotoGrid posts={this.props.items} />
    )
  }
}

export default Home

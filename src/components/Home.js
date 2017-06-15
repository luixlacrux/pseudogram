import React, { Component } from 'react'
import PropTypes from 'prop-types'

import PhotoGrid from '../components/PhotoGrid'

class Home extends Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    items: PropTypes.array.isRequired,
  }

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

import React from 'react'
import CSSTransitionGroup from 'react-addons-css-transition-group'
import LinearProgress from 'react-md/lib/Progress/LinearProgress'

function ProgressBar ({ uploadValue }) {
  return (
    <CSSTransitionGroup
      component="div"
      transitionName="opacity"
      transitionEnterTimeout={150}
      transitionLeaveTimeout={150}
    >
      {typeof uploadValue === 'number' &&
        <LinearProgress id="progress-bar" value={uploadValue} />
      }
    </CSSTransitionGroup>
  )
}

export default ProgressBar

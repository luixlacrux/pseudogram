import React from 'react'
import Toolbar from 'react-md/lib/Toolbars'
import Button from 'react-md/lib/Buttons'
import '../styles/navbar.css'

import NavbarMenu from './NavbarMenu'

function Navbar () {
  const actions = [
    <Button key="search" icon>search</Button>,
    <Button key="favorite" icon>favorite</Button>,
    <NavbarMenu />,
  ]

  return (
    <Toolbar
      colored
      className="Navbar"
      title="PseudoGram"
      actions={actions}
    />
  )
}

export default Navbar

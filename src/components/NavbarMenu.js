import React from 'react'
import ListItem from 'react-md/lib/Lists/ListItem'
import MenuButton from 'react-md/lib/Menus/MenuButton'

import UserAvatar from './UserAvatar'

function NavbarMenu ({ photoURL, displayName, onLogout }) {
  const avatar = <UserAvatar photoURL={photoURL} />

  return (
    <MenuButton
      id="user-menu"
      icon
      buttonChildren={avatar}
      tooltipLabel={displayName}
    >
      <ListItem primaryText="Perfil" />
      <ListItem primaryText="Configuración" />
      <ListItem primaryText="Logout" onClick={onLogout} />
    </MenuButton>
  )
}

export default NavbarMenu

import React from 'react'
import ListItem from 'react-md/lib/Lists/ListItem'
import MenuButton from 'react-md/lib/Menus/MenuButton'

function NavbarMenu () {
  return (
    <MenuButton
      icon
      buttonChildren="more_vert"
    >
      <ListItem primaryText="Perfil" />
      <ListItem primaryText="Configuración" />
      <ListItem primaryText="Logout" />
    </MenuButton>
  )
}

export default NavbarMenu

import React from 'react'
import styled from '@emotion/styled'

const MenuItem = styled('li')`
  display: inline-block;
  padding: 0 10px;
`

const Brand = styled('h1')`
  margin: 0;
  padding: 15px 0px 0px 10px;
`

const Nav: React.FC = () => {
  return (
    <>
    <Brand>aphyyd</Brand>
    <ul>
      <MenuItem>
        code
      </MenuItem>
      <MenuItem>
        music
      </MenuItem>
      <MenuItem>
        contact
      </MenuItem>
    </ul>
    </>
  )
}

export default Nav

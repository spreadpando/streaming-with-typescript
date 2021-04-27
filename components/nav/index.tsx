import React from 'react'
import Link from 'next/link'
import styled from '@emotion/styled'

const NavContainer = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`

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
    <NavContainer>
      <Link href='/'>
          <Brand>aphyyd</Brand>
      </Link>
      <ul>
        <MenuItem>
        <Link href='/code'><a>code</a></Link>
        </MenuItem>
        <MenuItem>
        <Link href='/music'><a>music</a></Link>
        </MenuItem>
        <MenuItem>
        <Link href='/contact'><a>contact</a></Link>
        </MenuItem>
      </ul>
    </NavContainer>
  )
}

export default Nav

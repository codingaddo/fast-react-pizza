import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header>
        <Link to={'/'}>Fast Pizza.Co</Link>
        <p>Mike</p>
    </header>
  )
}

export default Header
import React from 'react'
import { Link } from 'react-router-dom'
import SearchOrder from '../features/order/SearchOrder'

const Header = () => {
  return (
    <header>
        <Link to={'/'}>Fast Pizza.Co</Link>
        <SearchOrder/>
        <p>Mike</p>
    </header>
  )
}

export default Header
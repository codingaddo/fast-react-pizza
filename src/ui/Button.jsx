import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({children, disabled, to}) => {
  const className = "bg-yellow-500 text-stone-800 uppercase font-semibold px-4 py-3 inline-block rounded-full tracking-wide hover:bg-yellow-400 transition-colors duration-300 focus:outline-none focus:ring focus:ring-yellow-400 focus:bg-yellow-400 focus:ring-offset-1 disabled:cursor-not-allowed"

if(to) return(
  <Link to="/order/new" className={className}>Order pizzas</Link>

)

  return (
    <button disabled={disabled} className={className}>
        {children}
    </button>
  )
}

export default Button
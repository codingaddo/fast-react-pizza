import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({children, disabled, to, type, onclick}) => {

  const base = "bg-yellow-500 text-stone-800 text-sm uppercase font-semibold inline-block rounded-full tracking-wide hover:bg-yellow-400 transition-colors duration-300 focus:outline-none focus:ring focus:ring-yellow-400 focus:bg-yellow-400 focus:ring-offset-1 disabled:cursor-not-allowed"

  const styles = {
    primary: base + ' px-6 py-3',
    small: base + ' px-4 py-2 text-xs ',
    secondary : base + ' bg-transparent border-2 border-stone-300  px-6 py-3 hover:bg-stone-400 hover:text-white focus:bg-stone-300 focus:ring-stone-200 ',
    round:base + ' px-2.5 py-1 text-sm ',
  }

if(to) return(
  <Link to={to} className={styles[type]}>{children}</Link>

)

if(onclick) return (
    <button disabled={disabled} className={styles[type]} onClick={onclick}>
        {children}
    </button>
  )

  return (
    <button disabled={disabled} className={styles[type]}>
        {children}
    </button>
  )
}

export default Button
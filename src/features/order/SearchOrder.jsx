import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SearchOrder = () => {
    const [query, setQuery] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e)=>{
        e.preventDefault()
        if(!query)return
        navigate(`/order/${query}`)
        setQuery('')

    }
  return (
    <form onSubmit={handleSubmit}>
        <input placeholder='Search order #' value={query} onChange={(e)=>setQuery(e.target.value)} className='rounded-full px-4 py-2 text-sm bg-yellow-100 placeholder:text-stone-600 w-40 sm:focus:w-72 transition-all duration-300 focus:outline-none focus:ring focus:ring-yellow-600 focus:ring-opacity-50' />

    </form>
  )
}

export default SearchOrder
import React from 'react'
import { useSelector } from 'react-redux'

const UserName = () => {

  const username = useSelector(state=>state.user.userName)
  if(!username) return
  return (
    <div className='text-sm font-semibold'>{username}</div>
  )
}

export default UserName
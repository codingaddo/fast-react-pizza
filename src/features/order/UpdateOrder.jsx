import React from 'react'
import Button from '../../ui/Button'
import { useFetcher } from 'react-router-dom'
import { updateOrder } from '../../services/apiRestaurant'

const UpdateOrder = ({order}) => {
    const fecther = useFetcher()
  return (
    <>
    <fecther.Form method='PATCH' className='text-right'>
    <Button type={'primary'}>Make Priority</Button>
    </fecther.Form>
    </>
  )
}

export default UpdateOrder

 export async function action({request, params}){
    const data = {priority : true}
    await updateOrder(params.orderId, data)
    // console.log('Update')
    return null
}
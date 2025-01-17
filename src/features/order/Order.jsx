// Test ID: IIDSAT

import { useFetcher, useLoaderData} from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";

import OrderItem from './OrderItem'
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utilities/helpers";
import { useEffect } from "react";
import UpdateOrder from "./UpdateOrder";


function Order() {
  const order = useLoaderData()

  const fether =useFetcher()

  useEffect(function(){
    if(!fether.data && fether.state === 'idle')fether.load('/menu')

  },[fether])

  console.log(fether.data)
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="px-4 py-4 space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h2 className="text-xl font-semibold"> Order #{id} Status</h2>

        <div className=" space-x-2">
          {priority && <span className=" rounded-full bg-red-500 px-3 py-1 font-semibold text-sm uppercase text-red-50 tracking-wide">Priority</span>}
          <span className=" rounded-full bg-green-500 px-3 py-1 font-semibold text-sm uppercase text-green-50 tracking-wide">{status} order</span>
        </div>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-2 bg-stone-200 py-5 px-6">
        <p className=" font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-500">(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>

      <ul className="divide-y divide-stone-300 border-y">
        {
          cart.map(item=>(<OrderItem item={item} key={item.pizzaId}
            ingredients={
              fether?.data?.find(el=>el.id===item.pizzaId)?.ingredients??[]
            }
            isLoadingIngredients={fether.state === 'loading'}
          />))
        }
      </ul>

      <div className=" space-y-2 bg-stone-200 px-6 py-5">
        <p className="text-sm font-medium text-stone-600">Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p className="text-sm font-medium text-stone-600">Price priority: {formatCurrency(priorityPrice)}</p>}
        <p className=" font-bold">To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}</p>
      </div>
      {!priority && <UpdateOrder order={order}/>}
    </div>
  );
}

export async function loader({params}){
  const order = await getOrder(params.orderId);
  return order
}

export default Order;

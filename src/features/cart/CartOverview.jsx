import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentQuantityById, getTotalCartPrice, getTotalCartQuantity } from "./cartSlice";
import { formatCurrency } from "../../utilities/helpers";

function CartOverview() {
  // const totlaCartQuantity = useSelector(state=>state.cart.cart.reduce((sum,item)=>sum + item.quantity, 0))
  // const totlaCartQuantity = cart.reduce((sum,item)=>sum + item.quantity, 0)
  const totlaCartQuantity = useSelector(getTotalCartQuantity())

  const totalCartPrice = useSelector(getTotalCartPrice(getCurrentQuantityById()))

  if(!totlaCartQuantity) return

  return (
    <div className="bg-stone-800 flex justify-between items-center text-stone-200 uppercase p-4">
      <p className="text-stone-300 font-semibold space-x-4">
        <span>{totlaCartQuantity} pizzas</span>
        <span>{formatCurrency(totalCartPrice)}</span>
      </p>
      <Link to={'/cart'}>Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;

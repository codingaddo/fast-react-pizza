import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utilities/helpers";
import {addItem, getCurrentQuantityById} from '../cart/cartSlice'
import DeleteItem from "../cart/DeleteItem";
function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const currentQuantity = useSelector(getCurrentQuantityById(id))
  const isInCart = currentQuantity > 0

  const dispatch = useDispatch()

  function handleAddToCart(){
    const newItem =    {
      pizzaId:id,
      name:name,
      unitPrice,
      quantity:1,
      totalPrice:unitPrice * 1
  }
    dispatch(addItem(newItem));
  }

  return (
    <li className="flex gap-4 py-2 pt-0.5">
      <img src={imageUrl} alt={name} className={`h-24 ${soldOut?' opacity-70 grayscale':''}`}/>
      <div className="flex flex-col grow ">
        <p className=" font-medium">{name}</p>
        <p className="text-sm  italic text-stone-500 capitalize">{ingredients.join(', ')}</p>
        <div className=" mt-auto flex items-center justify-between">
          {!soldOut ? <p className="text-sm">{formatCurrency(unitPrice)}</p> : <p className="text-sm font-medium text-stone-500 uppercase">Sold out</p>}

        {isInCart && <DeleteItem pizzaId={id}/>}
          {
            !soldOut && !isInCart &&
            
          <Button type={'small'} onclick={handleAddToCart}>
            Add to cart
          </Button>

          }
        </div>
      </div>
    </li>
  );
}

export default MenuItem;

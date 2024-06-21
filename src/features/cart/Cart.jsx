import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart } from "./cartSlice";

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: 'Mediterranean',
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: 'Vegetale',
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: 'Spinach and Mushroom',
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

function Cart() {
  // const cart = fakeCart;
  const username = useSelector((state) => state.user.userName);
  const cart = useSelector(getCart);
  const dispatch = useDispatch();
  const handleClearItem = () => {
    dispatch(clearCart());
  };

  if (!cart.length)
    return (
      <div className="px-4 py-3">
        <LinkButton to="/menu">&larr; Back to menu</LinkButton>
        <p className=" font-semibold mt-7">
          Your cart is still empty. Start adding some pizzas :
        </p>
      </div>
    );
  return (
    <div className=" px-4 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className=" mt-7 text-xl font-semibold">Your cart, {username}</h2>
      <ul className=" mt-3 divide-y divide-stone-300 border-b">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>

      <div className="mt-6 space-x-3">
        <Button to="/order/new" type={"primary"}>
          Order pizza
        </Button>

        <Button type={"secondary"} onclick={handleClearItem}>
          clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;

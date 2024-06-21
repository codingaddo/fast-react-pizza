import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
// import EmptyCart from './../';
import store from "../../store";
import { formatCurrency } from "../../utilities/helpers";
import { fetchAddress } from "../user/userSlice";
import EmptyCart from "../cart/emptyCart";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: "Mediterranean",
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: "Vegetale",
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: "Spinach and Mushroom",
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  // const cart = fakeCart;

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const formErrors = useActionData();
  const dispatch = useDispatch();

  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice());
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((state) => state.user);
  const isLoadingAdres = addressStatus === "loading";

  if (!cart.length) return <EmptyCart />;

  return (
    <div className=" px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>
      {/* <Form method="POST" action="/order/new"> */}
      <Form method="POST">
        <div className=" mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            type="text"
            name="customer"
            defaultValue={username}
            required
            className="input  w-full"
          />
        </div>

        <div className=" mb-5 flex  flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className=" w-full">
            <input type="tel" name="phone" required className="input  w-full" />
            {formErrors?.phone && (
              <p className="text-red-700 text-xs bg-red-100 rounded-md p-2 mt-2">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className=" mb-5 flex flex-col gap-2 sm:flex-row sm:items-center relative">
          <label className="sm:basis-40">Address</label>
          <div className="w-full">
            <input
              type="text"
              defaultValue={address}
              name="address"
              disabled={isLoadingAdres}
              required
              className="input  w-full"
            />

            {addressStatus === "error" && (
              <p className="text-red-700 text-xs bg-red-100 rounded-md p-2 mt-2">
                {errorAddress}
              </p>
            )}
          </div>
          {!position.longitude && !position.latitude && (
            <div className=" absolute right-[3px] z-40 ">
              <Button
                type={"small"}
                disabled={isLoadingAdres}
                onclick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                Get Position
              </Button>
            </div>
          )}
        </div>

        <div className=" mb-12 flex items-center  gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
            className="h-6 w-6 accent-yellow-400 transition-all duration-300 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
          />
          <label htmlFor="priority" className=" font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <input type="hidden" name="cart" value={JSON.stringify(cart)} />
        <input
          type="hidden"
          name="Position"
          value={
            position.longitude && position.latitude
              ? `${position.longitude}, ${position.latitude}, Address: ${address} `
              : ""
          }
        />

        <div>
          <Button type={"primary"} disabled={isSubmitting || isLoadingAdres}>
            {isSubmitting
              ? "Placing order"
              : `Order now ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };
  // console.log(order)
  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone = "Please insect a valid phone number";
  if (Object.keys(errors).length > 0) return errors;

  //If no errors create new order and redirect

  const newOrder = await createOrder(order);

  //Do not overuse this approach
  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;

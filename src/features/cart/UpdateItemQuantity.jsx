import React from "react";
import Button from "../../ui/Button";
import { useDispatch } from "react-redux";
import { decreaseItemQuantity, increaseItemQuantity } from "./cartSlice";

const UpdateItemQuantity = ({ pizzaId, currentQuantity }) => {
  const dispatch = useDispatch();
  //   const currentQuantity = useSelector(getCurrentQuantityById(id))

  return (
    <div className="flex items-center gap-3">
      <Button
        type={"round"}
        onclick={() => {
          dispatch(decreaseItemQuantity(pizzaId));
        }}
      >
        -
      </Button>
      <span className="text-sm font-medium">{currentQuantity}</span>
      <Button
        type={"round"}
        onclick={() => {
          dispatch(increaseItemQuantity(pizzaId));
        }}
      >
        +
      </Button>
    </div>
  );
};

export default UpdateItemQuantity;

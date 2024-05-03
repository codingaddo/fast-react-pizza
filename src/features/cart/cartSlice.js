import { createSlice } from "@reduxjs/toolkit";


const initialState ={
    // cart:[],
    cart:[
        {
            pizzaId:12,
            name:'pizza',
            unitPrice:100,
            quantity:2,
            totalPrice:200,

        }
    ],
};
const cartSlice =  createSlice({
    name:'cart',
    initialState,
    reducers:{
        addItem(state, action){
            //payload = newItem
            state.cart.push(action.payload)
        },
        deleteItem(state, action){
            // payload = itemID
            state.cart = state.cart.filter(item => item.pizzaId !== action.payload)
        },
        increaseItemQuantity(state, action){
            // payload = itemID
            const item = state.cart.find(item => item.pizzaId === action.payload)
            item.quantity++
            item.totalPrice = item.unitPrice * item.quantity
        },
        decreaseItemQuantity(state, action){
            const item = state.cart.find(item => item.pizzaId === action.payload)
            item.quantity--
            item.totalPrice = item.unitPrice * item.quantity
        },
        clearCart(state, action){
            state.cart = []
        },

    }
})

const {addItem,deleteItem,increaseItemQuantity,decreaseItemQuantity,clearCart} = cartSlice.actions

export default cartSlice.reducer
import { db } from "../data/db";
import { CartItem, Guitar } from "../types";

const MIN_ITEMS = 1;
const MAX_ITEMS = 5;

//Crear las acciones
export type CartActions =
  | { type: "add-to-cart"; payload: { item: Guitar } }
  | { type: "remove-from-cart"; payload: { id: Guitar["id"] } }
  | { type: "decrease-quantity"; payload: { id: Guitar["id"] } }
  | { type: "increase-quantity"; payload: { id: Guitar["id"] } }
  | { type: "clear-cart" };

//Crear el state
export type CartState = {
  data: Guitar[];
  cart: CartItem[];
};

//Crear el estado inicial del reducer
export const initialState: CartState = {
  data: db,
  cart: [],
};

//Creando el cart-reducer y definir las acciones
export const cartReducer = (
  state: CartState = initialState,
  action: CartActions
) => {
  if (action.type === "add-to-cart") {
    const itemExists = state.cart.find(
      (guitar) => guitar.id === action.payload.item.id
    );
    let updatedCart: CartItem[] = [];
    if (itemExists) {
      // existe en el carrito
      updatedCart = state.cart.map((item) => {
        if (item.id === action.payload.item.id) {
          if(item.quantity < MAX_ITEMS){
            return { ...item, quantity: item.quantity + 1 };
          }else{
            return item
          }
        } else {
          return item;
        }
      });
    } else {
      const newItem: CartItem = { ...action.payload.item, quantity: 1 };
      updatedCart = [...state.cart, newItem];
    }
    return {
      ...state,
      cart: updatedCart,
    };
  }

  if (action.type === "remove-from-cart") {
    
    const updatedCart = state.cart.filter(item =>item.id !== action.payload.id)
    return {
      ...state,
      cart:updatedCart
    };
  }

  if (action.type === "increase-quantity") {
    return {
      ...state,
    };
  }

  if (action.type === "decrease-quantity") {
    return {
      ...state,
    };
  }

  if (action.type === "clear-cart") {
    return {
      ...state,
    };
  }
  return state;
};
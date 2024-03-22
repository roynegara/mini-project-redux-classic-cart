import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartItems from "../../cartItems";

const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: false,
};

export const getCartItems = createAsyncThunk("cart/getCartItems", async (_, thunkAPI) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return cartItems;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((cartItem) => cartItem.id !== itemId);
    },
    changeCartItemAmount: (state, action) => {
      const cartItem = state.cartItems.find((item) => item.id === action.payload.id);
      if (action.payload.type === "increase") {
        cartItem.amount += 1;
      }

      if (action.payload.type === "decrease") {
        cartItem.amount -= 1;
      }
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    },
  },
  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.cartItems = action.payload;
    },
    [getCartItems.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const { clearCart, removeItem, calculateTotals, changeCartItemAmount } = cartSlice.actions;
export default cartSlice.reducer;





// import { createStore, applyMiddleware, combineReducers } from "redux";
// import thunk from "redux-thunk";
// import cartItem from "../..cartItems";

// const CLEAR_CART = "cart/CLEAR_CART";
// const REMOVE_ITEM = "cart/REMOVE_ITEM";
// const CHANGE_CART_ITEM_AMOUNT = "cart/CHANGE_CART_ITEM_AMOUNT";
// const CALCULATE_TOTALS = "cart/CALCULATE_TOTALS";
// const GET_CART_ITEMS_REQUEST = "cart/GET_CART_ITEMS_REQUEST";
// const GET_CART_ITEMS_SUCCESS = "cart/GET_CART_ITEMS_SUCCESS";
// const GET_CART_ITEMS_FAILURE = "cart/GET_CART_ITEMS_FAILURE";

// const clearCart = () => {
//   return {
//     type: CLEAR_CART,
//   };
// };
// const removeItem = (itemId) => {
//   return {
//     type: REMOVE_ITEM,
//     payload: itemId,
//   };
// };
// const changeCartItemAmount = (payload) => {
//   return {
//     type: CHANGE_CART_ITEM_AMOUNT,
//     payload,
//   };
// };
// const calculateTotals = () => {
//   return {
//     type: CALCULATE_TOTALS,
//   };
// };

// const getCartItemsRequest = () => {
// return {
//     type: GET_CART_ITEMS_REQUEST,
// };
// };
// const getCartItemsSuccess = () => {
// return {
//     type: GET_CART_ITEMS_SUCCESS,
// };
// };
// const getCartItemsFailure = () => {
// return {
//     type: GET_CART_ITEMS_FAILURE,
// };
// };

// export const getCartItems = () => {
// return async (dispatch) => {
//     dispatch(getCartItemsRequest());
//     try {
//     await new Promise((resolve) => setTimeout(resolve, 1000));
//     } catch (error) {
//     dispatch(getCartItemsFailure());
//     }
// };
// };

// const initialState = {
//     cartItems: [],
//     amount: 0,
//     total: 0,
//     isLoading: false,
// }

// const cartReducer =(state = initialState, action) => {
//     switch (action.type) {
//         case CLEAR_CART:
//             return {
//                 ...state, cartItems: [],
//             }
//         case REMOVE_ITEM:
//             return {
//                 ...state, cartItems: state.cartItems.filter((cartItem) => cartItem.id !== action.payload)
//             }
//         case CHANGE_CART_ITEM_AMOUNT:
//             return {
//                 ...state, cartItems: state.cartItems.map((item) => {
//                     item.id === action.payload.id ? action.payload.type === "increase" ? { ...item, amount: item.amount + 1 } : { ...item, amount: item.amount + 1 } : { ...item, amount: item.amount - 1 } : item
//                 })
//             }
//         case CALCULATE_TOTALS:           
//                 let amount = 0;
//                 let total = 0;
//                 state.cartItems.forEach((item) => {
//                     amount += item.amount;
//                     total += item.amount * item.price;
//                 })
//                 return {...state, amount, total}               
//         case GET_CART_ITEMS_REQUEST:
//             return {
//                 ...state, isLoading: true
//             }
//         case GET_CART_ITEMS_SUCCESS:
//             return {
//                 ...state, isLoading: false, cartItems: action.payload
//             }
//         case GET_CART_ITEMS_FAILURE:
//             return {
//                 ...state, isLoading: false
//             }
//         default:
//             return state
//     }
//     }

// export const { clearCart, removeItem, changeCartItemAmount, calculateTotals, getCartItems } = cartSlice.actions;
// export default cartReducer
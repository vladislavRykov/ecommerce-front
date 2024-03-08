import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '../store';

interface CartSliceFields {
  cart: string[];
}

const initialState: CartSliceFields = {
  cart: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<string[]>) => {
      state.cart = action.payload;
    },
    clearCart: (state) => {
      state.cart = [];
    },
    addToCart: (state, action: PayloadAction<string>) => {
      state.cart.push(action.payload);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const productIdx = state.cart.findIndex((item) => item === action.payload);
      state.cart.splice(productIdx, 1);
    },
    totalRemoveFromCart: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter((item) => item !== action.payload);
    },
  },
});

export const { addToCart, setCart, removeFromCart, totalRemoveFromCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;

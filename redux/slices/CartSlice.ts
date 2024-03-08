import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '../store';
import axios, { AxiosError } from 'axios';

// export const registerUser = createAsyncThunk<
//   IUserData,
//   { email: string; password: string },
//   { rejectValue: string }
// >('auth/registerUserStatus', async (params, { rejectWithValue }) => {
//   try {
//     const res = await ServerAPI.register(params);
//     if (!(res.statusText === 'OK')) {
//       throw new Error('Неудачный запрос');
//     }
//     localStorage.setItem('token', res.data.accessToken);
//     return res.data;
//   } catch (error) {
//     if (error.response) {
//       return rejectWithValue(error?.response.data.message as string);
//     }
//     return rejectWithValue(error.message as string);
//   }
// });

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
  //   extraReducers: (builder) => {
  //     builder.addCase(registerUser.pending, (state) => {
  //       state.isAuth = false;
  //       state.errorMessage = null;
  //       state.isFetching = true;
  //     });
  //     builder.addCase(registerUser.fulfilled, (state, action) => {
  //       state.userData = action.payload;
  //       state.isAuth = true;
  //       state.errorMessage = null;
  //       state.isFetching = false;
  //     });

  //   },
});

export const { addToCart, setCart, removeFromCart, totalRemoveFromCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;

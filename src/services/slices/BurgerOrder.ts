import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi, getOrderByNumberApi } from '@api';
import { TOrder } from '@utils-types';

// Thunks
export const submitOrder = createAsyncThunk(
  'orderStore/submit',
  async (ingredientIds: string[]) => await orderBurgerApi(ingredientIds)
);

export const fetchOrderByNumber = createAsyncThunk(
  'orderStore/fetchByNumber',
  async (number: number) => await getOrderByNumberApi(number)
);

// State type
type OrderState = {
  currentOrder: TOrder | null;
  isSubmitting: boolean;
  isLoading: boolean;
  errorMessage: string | null;
};

// Initial state
export const initialState: OrderState = {
  currentOrder: null,
  isSubmitting: false,
  isLoading: false,
  errorMessage: null
};

// Slice
const orderStoreSlice = createSlice({
  name: 'orderStore',
  initialState,
  reducers: {
    resetOrderState(state) {
      state.currentOrder = null;
      state.isSubmitting = false;
      state.isLoading = false;
      state.errorMessage = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Submit order
      .addCase(submitOrder.pending, (state) => {
        state.isSubmitting = true;
        state.isLoading = true;
        state.errorMessage = null;
      })
      .addCase(submitOrder.rejected, (state, action) => {
        state.isSubmitting = false;
        state.isLoading = false;
        state.errorMessage = action.error.message ?? 'Order creation failed';
      })
      .addCase(submitOrder.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.isLoading = false;
        state.currentOrder = action.payload.order;
      })
      // Fetch order by number
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.error.message ?? 'Order not found';
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentOrder = action.payload?.orders?.[0] ?? null;
      });
  }
});

// Exports
export const { resetOrderState } = orderStoreSlice.actions;
export const orderReducer = orderStoreSlice.reducer;

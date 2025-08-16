import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';
import { TOrder } from '@utils-types';

export const fetchFeedData = createAsyncThunk(
  'liveFeed/fetch',
  async () => await getFeedsApi()
);

type FeedState = {
  items: TOrder[];
  totalCount: number;
  todayCount: number;
  isLoading: boolean;
  errorMessage: string | null;
};

export const initialState: FeedState = {
  items: [],
  totalCount: 0,
  todayCount: 0,
  isLoading: false,
  errorMessage: null
};

const liveFeedSlice = createSlice({
  name: 'liveFeed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedData.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
      })
      .addCase(fetchFeedData.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.error.message ?? 'Feed fetch failed';
      })
      .addCase(fetchFeedData.fulfilled, (state, action) => {
        const { orders, total, totalToday } = action.payload;
        state.items = orders;
        state.totalCount = total;
        state.todayCount = totalToday;
        state.isLoading = false;
      });
  }
});

export const feedReducer = liveFeedSlice.reducer;

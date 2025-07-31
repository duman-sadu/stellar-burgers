import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';

export const fetchIngredientList = createAsyncThunk(
  'ingredients/fetchAll',
  async () => await getIngredientsApi()
);

type IngredientsState = {
  ingredients: TIngredient[];
  isFetching: boolean;
  fetchError: string | null;
};

const initialState: IngredientsState = {
  ingredients: [],
  isFetching: false,
  fetchError: null,
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredientList.pending, (state) => {
        state.isFetching = true;
        state.fetchError = null;
      })
      .addCase(fetchIngredientList.rejected, (state, action) => {
        state.isFetching = false;
        state.fetchError = action.error.message ?? 'Error fetching ingredients';
      })
      .addCase(fetchIngredientList.fulfilled, (state, action) => {
        state.isFetching = false;
        state.ingredients = action.payload;
      });
  },
});

export const ingredientsReducer = ingredientsSlice.reducer;

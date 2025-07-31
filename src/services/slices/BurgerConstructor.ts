import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, TConstructorIngredient } from '@utils-types';

type ConstructorState = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: ConstructorState = {
  bun: null,
  ingredients: [],
};

const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer(state, action: PayloadAction<TConstructorIngredient>) {
        const item = action.payload;
        if (item.type === 'bun') {
          state.bun = item;
        } else {
          state.ingredients.push(item);
        }
      },
      prepare(ingredient: TIngredient) {
        return {
          payload: {
            ...ingredient,
            id: nanoid(),
          },
        };
      },
    },

    removeIngredient(state, action: PayloadAction<string>) {
      state.ingredients = state.ingredients.filter(
        (item) => item._id !== action.payload
      );
    },

    moveIngredientUp(state, action: PayloadAction<number>) {
      const idx = action.payload;
      if (idx > 0) {
        const temp = state.ingredients[idx];
        state.ingredients.splice(idx, 1);
        state.ingredients.splice(idx - 1, 0, temp);
      }
    },

    moveIngredientDown(state, action: PayloadAction<number>) {
      const idx = action.payload;
      if (idx < state.ingredients.length - 1) {
        const temp = state.ingredients[idx];
        state.ingredients.splice(idx, 1);
        state.ingredients.splice(idx + 1, 0, temp);
      }
    },

    resetConstructor(state) {
      state.bun = null;
      state.ingredients = [];
    },
  },
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  resetConstructor,
} = constructorSlice.actions;

export const constructorReducer = constructorSlice.reducer;

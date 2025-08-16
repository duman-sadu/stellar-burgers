// src/services/slices/BurgerConstructor.ts
import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';
import { TIngredient, TConstructorIngredient } from '@utils-types';

type TConstructorState = {
  bun: TIngredient | null;
  ingredients: Array<TConstructorIngredient>;
};

export const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

export const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      // Принимаем TIngredient ИЛИ TConstructorIngredient.
      // Если у входа уже есть id — оставляем его, иначе генерируем.
      prepare: (ingredient: TIngredient | TConstructorIngredient) => {
        const hasId = 'id' in ingredient && typeof ingredient.id === 'string';
        const id = hasId ? (ingredient as TConstructorIngredient).id : nanoid();
        const payload = {
          ...(ingredient as TIngredient),
          id
        } as TConstructorIngredient;
        return { payload };
      }
    },

    // Поддерживаем удаление либо по индексу (как в тесте "0"),
    // либо по _id/id.
    removeIngredient: (state, action: PayloadAction<string>) => {
      const key = action.payload;

      // если передали индекс (строкой)
      if (/^\d+$/.test(key)) {
        const index = Number(key);
        if (index >= 0 && index < state.ingredients.length) {
          state.ingredients.splice(index, 1);
        }
        return;
      }

      // иначе пробуем по _id или id
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient._id !== key && ingredient.id !== key
      );
    },

    moveIngredientUp(state, action: PayloadAction<number>) {
      const index = action.payload;
      if (index > 0 && index < state.ingredients.length) {
        const item = state.ingredients[index];
        state.ingredients.splice(index, 1);
        state.ingredients.splice(index - 1, 0, item);
      }
    },

    moveIngredientDown(state, action: PayloadAction<number>) {
      const index = action.payload;
      if (index >= 0 && index < state.ingredients.length - 1) {
        const item = state.ingredients[index];
        state.ingredients.splice(index, 1);
        state.ingredients.splice(index + 1, 0, item);
      }
    },

    resetConstructor(state) {
      state.bun = null;
      state.ingredients = [];
    }
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  resetConstructor
} = constructorSlice.actions;

export const constructorReducer = constructorSlice.reducer;

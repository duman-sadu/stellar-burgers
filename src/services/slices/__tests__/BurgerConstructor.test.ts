import {
  initialState,
  constructorReducer,
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  resetConstructor
} from '../BurgerConstructor';
import { TConstructorIngredient } from '../../../utils/types';

describe('BurgerConstructor slice', () => {
  const bun: TConstructorIngredient = {
    _id: 'bun1',
    id: 'bun1',
    name: 'Булка',
    type: 'bun',
    proteins: 10,
    fat: 5,
    carbohydrates: 20,
    calories: 200,
    price: 100,
    image: '',
    image_large: '',
    image_mobile: ''
  };

  const ingredient: TConstructorIngredient = {
    _id: 'ing1',
    id: 'ing1',
    name: 'Начинка',
    type: 'main',
    proteins: 1,
    fat: 0,
    carbohydrates: 2,
    calories: 5,
    price: 10,
    image: '',
    image_large: '',
    image_mobile: ''
  };

  it('должен вернуть initialState по умолчанию', () => {
    expect(constructorReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('должен добавить булку', () => {
    const state = constructorReducer(initialState, addIngredient(bun));
    expect(state.bun).toEqual(bun);
  });

  it('должен добавить ингредиент', () => {
    const state = constructorReducer(initialState, addIngredient(ingredient));
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toEqual(ingredient);
  });

  it('должен удалить ингредиент', () => {
    const stateWithIngredient = { ...initialState, ingredients: [ingredient] };
    const newState = constructorReducer(stateWithIngredient, removeIngredient("0"));
    expect(newState.ingredients).toHaveLength(0);
  });

  it('должен переместить ингредиент вверх', () => {
    const ing2: TConstructorIngredient = { ...ingredient, id: 'ing2', _id: 'ing2' };
    const stateWithTwo = { ...initialState, ingredients: [ingredient, ing2] };
    const newState = constructorReducer(stateWithTwo, moveIngredientUp(1));
    expect(newState.ingredients[0].id).toBe('ing2');
    expect(newState.ingredients[1].id).toBe('ing1');
  });

  it('должен переместить ингредиент вниз', () => {
    const ing2: TConstructorIngredient = { ...ingredient, id: 'ing2', _id: 'ing2' };
    const stateWithTwo = { ...initialState, ingredients: [ingredient, ing2] };
    const newState = constructorReducer(stateWithTwo, moveIngredientDown(0));
    expect(newState.ingredients[0].id).toBe('ing2');
    expect(newState.ingredients[1].id).toBe('ing1');
  });

  it('должен сбросить конструктор', () => {
    const stateWithData = {
      bun,
      ingredients: [ingredient]
    };
    const newState = constructorReducer(stateWithData, resetConstructor());
    expect(newState.bun).toBeNull();
    expect(newState.ingredients).toHaveLength(0);
  });
});

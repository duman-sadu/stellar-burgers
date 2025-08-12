import {
  constructorReducer,
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  resetConstructor,
} from '../BurgerConstructor';
import { TIngredient, TConstructorIngredient } from '@utils-types';

const bun: TIngredient = {
  _id: 'bun1',
  name: 'Булка 1',
  type: 'bun',
  proteins: 10,
  fat: 5,
  carbohydrates: 20,
  calories: 200,
  price: 100,
  image: 'image.png',
  image_mobile: 'image-mobile.png',
  image_large: 'image-large.png',
};

const main: TIngredient = {
  _id: 'main1',
  name: 'Начинка 1',
  type: 'main',
  proteins: 15,
  fat: 10,
  carbohydrates: 5,
  calories: 150,
  price: 50,
  image: 'image.png',
  image_mobile: 'image-mobile.png',
  image_large: 'image-large.png',
};

describe('BurgerConstructor slice', () => {
  const initialState = { bun: null, ingredients: [] as TConstructorIngredient[] };

  it('возвращает initial state по умолчанию', () => {
    expect(constructorReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('добавляет булку в bun', () => {
    const state = constructorReducer(initialState, addIngredient(bun));
    // bun должен содержать все поля булки + generated id
    expect(state.bun).toMatchObject(bun);
    expect(typeof (state.bun as any).id).toBe('string');
    expect(state.ingredients).toHaveLength(0);
  });

  it('добавляет начинку в ingredients', () => {
    const state = constructorReducer(initialState, addIngredient(main));
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toMatchObject(main);
    expect(typeof state.ingredients[0].id).toBe('string');
  });

  it('удаляет ингредиент по _id', () => {
    const startState = {
      bun: null,
      ingredients: [{ ...main, id: 'some-id' }],
    } as typeof initialState;
    // removeIngredient фильтрует по _id (action.payload = _id)
    const state = constructorReducer(startState, removeIngredient(main._id));
    expect(state.ingredients).toHaveLength(0);
  });

  it('перемещает ингредиент вверх (moveIngredientUp)', () => {
    const ing1 = { ...main, id: 'id-1', _id: 'ing1' };
    const ing2 = { ...main, id: 'id-2', _id: 'ing2' };
    const startState = { bun: null, ingredients: [ing1, ing2] } as any;
    const state = constructorReducer(startState, moveIngredientUp(1));
    expect(state.ingredients[0].id).toBe('id-2');
    expect(state.ingredients[1].id).toBe('id-1');
  });

  it('перемещает ингредиент вниз (moveIngredientDown)', () => {
    const ing1 = { ...main, id: 'id-1', _id: 'ing1' };
    const ing2 = { ...main, id: 'id-2', _id: 'ing2' };
    const startState = { bun: null, ingredients: [ing1, ing2] } as any;
    const state = constructorReducer(startState, moveIngredientDown(0));
    expect(state.ingredients[0].id).toBe('id-2');
    expect(state.ingredients[1].id).toBe('id-1');
  });

  it('сбрасывает конструктор (resetConstructor)', () => {
    const startState = {
      bun: { ...bun, id: 'bun-id' },
      ingredients: [{ ...main, id: 'main-id' }],
    } as any;
    const state = constructorReducer(startState, resetConstructor());
    expect(state).toEqual(initialState);
  });
});

import { ingredientsReducer, fetchIngredientList } from '../BurgerIngredient';
import { TIngredient } from '../../../utils/types';

describe('BurgerIngredient (ingredients) slice', () => {
  const initialState = {
    ingredients: [] as TIngredient[],
    isFetching: false,
    fetchError: null as string | null
  };

  const mockIngredients: TIngredient[] = [
    {
      _id: '1',
      name: 'Булка',
      type: 'bun',
      proteins: 10,
      fat: 20,
      carbohydrates: 30,
      calories: 200,
      price: 100,
      image: 'image.jpg',
      image_mobile: 'image_mobile.jpg',
      image_large: 'image_large.jpg'
    }
  ];

  it('возвращает initial state', () => {
    expect(ingredientsReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('pending ставит isFetching = true и очищает fetchError', () => {
    const state = ingredientsReducer(initialState, {
      type: fetchIngredientList.pending.type
    });
    expect(state.isFetching).toBe(true);
    expect(state.fetchError).toBeNull();
  });

  it('fulfilled записывает ingredients и сбрасывает isFetching', () => {
    const state = ingredientsReducer(initialState, {
      type: fetchIngredientList.fulfilled.type,
      payload: mockIngredients
    });
    expect(state.ingredients).toEqual(mockIngredients);
    expect(state.isFetching).toBe(false);
  });

  it('rejected записывает ошибку и сбрасывает isFetching', () => {
    const state = ingredientsReducer(initialState, {
      type: fetchIngredientList.rejected.type,
      error: { message: 'Ошибка' }
    });
    expect(state.fetchError).toBe('Ошибка');
    expect(state.isFetching).toBe(false);
  });
});

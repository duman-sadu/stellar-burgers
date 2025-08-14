import { orderReducer, resetOrderState, submitOrder, fetchOrderByNumber } from '../BurgerOrder';
import { TOrder } from '../../../utils/types';

describe('BurgerOrder slice', () => {
  const initialState = {
    currentOrder: null,
    isSubmitting: false,
    isLoading: false,
    errorMessage: null,
  };

  const mockOrder: TOrder = {
    _id: '1',
    status: 'done',
    name: 'Test Burger',
    createdAt: '2025-08-10',
    updatedAt: '2025-08-10',
    number: 1234,
    ingredients: [],
  };

  it('возвращает initial state', () => {
    expect(orderReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('resetOrderState сбрасывает состояние', () => {
    const stateWithData = {
      currentOrder: mockOrder,
      isSubmitting: true,
      isLoading: true,
      errorMessage: 'Ошибка',
    };
    expect(orderReducer(stateWithData as any, resetOrderState())).toEqual(initialState);
  });

  it('submitOrder.pending устанавливает isSubmitting и isLoading', () => {
    const state = orderReducer(initialState, { type: submitOrder.pending.type });
    expect(state.isSubmitting).toBe(true);
    expect(state.isLoading).toBe(true);
    expect(state.errorMessage).toBeNull();
  });

  it('submitOrder.fulfilled записывает currentOrder', () => {
    const state = orderReducer(initialState, {
      type: submitOrder.fulfilled.type,
      payload: { order: mockOrder },
    });
    expect(state.currentOrder).toEqual(mockOrder);
    expect(state.isSubmitting).toBe(false);
    expect(state.isLoading).toBe(false);
  });

  it('submitOrder.rejected записывает ошибку и сбрасывает флаги', () => {
    const state = orderReducer(initialState, { type: submitOrder.rejected.type, error: { message: 'Ошибка создания заказа' } });
    expect(state.errorMessage).toBe('Ошибка создания заказа');
    expect(state.isSubmitting).toBe(false);
    expect(state.isLoading).toBe(false);
  });

  it('fetchOrderByNumber.pending ставит isLoading=true', () => {
    const state = orderReducer(initialState, { type: fetchOrderByNumber.pending.type });
    expect(state.isLoading).toBe(true);
    expect(state.errorMessage).toBeNull();
  });

  it('fetchOrderByNumber.fulfilled записывает currentOrder', () => {
    const state = orderReducer(initialState, { type: fetchOrderByNumber.fulfilled.type, payload: { orders: [mockOrder] } });
    expect(state.currentOrder).toEqual(mockOrder);
    expect(state.isLoading).toBe(false);
  });

  it('fetchOrderByNumber.rejected записывает ошибку', () => {
    const state = orderReducer(initialState, { type: fetchOrderByNumber.rejected.type, error: { message: 'Заказ не найден' } });
    expect(state.errorMessage).toBe('Заказ не найден');
    expect(state.isLoading).toBe(false);
  });
});

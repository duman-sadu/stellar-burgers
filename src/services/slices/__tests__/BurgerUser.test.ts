import {
  userReducer,
  setAuthChecked,
  setUser,
  login,
  logout,
  fetchUserOrders,
  initialState
} from '../BurgerUser';
import { TUser, TOrder } from '../../../utils/types';

describe('BurgerUser slice', () => {
  const mockUser: TUser = {
    name: 'Test',
    email: 'test@example.com'
  } as unknown as TUser;

  it('возвращает initial state', () => {
    expect(userReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('setAuthChecked устанавливает флаг', () => {
    const state = userReducer(initialState, setAuthChecked());
    expect(state.isAuthChecked).toBe(true);
  });

  it('setUser устанавливает пользователя (payload должен быть { user })', () => {
    const state = userReducer(initialState, setUser({ user: mockUser }));
    expect(state.user).toEqual(mockUser);
  });

  it('login.pending ставит loading = true', () => {
    const state = userReducer(initialState, { type: login.pending.type });
    expect(state.loading).toBe(true);
    expect(state.errorMessage).toBeNull();
  });

  it('login.fulfilled сохраняет user и отмечает isAuthChecked', () => {
    const state = userReducer(initialState, {
      type: login.fulfilled.type,
      payload: mockUser
    });
    expect(state.user).toEqual(mockUser);
    expect(state.loading).toBe(false);
    expect(state.isAuthChecked).toBe(true);
  });

  it('login.rejected записывает ошибку и отмечает isAuthChecked', () => {
    const state = userReducer(initialState, {
      type: login.rejected.type,
      error: { message: 'Ошибка' }
    });
    expect(state.loading).toBe(false);
    expect(state.errorMessage).toBe('Ошибка');
    expect(state.isAuthChecked).toBe(true);
  });

  it('logout.fulfilled очищает пользователя', () => {
    const stateWithUser = { ...initialState, user: mockUser };
    const state = userReducer(stateWithUser, {
      type: logout.fulfilled.type
    });
    expect(state.user).toBeNull();
  });

  it('fetchUserOrders.fulfilled записывает orders', () => {
    const mockOrders = [{ _id: '1' }] as unknown as TOrder[];
    const state = userReducer(initialState, {
      type: fetchUserOrders.fulfilled.type,
      payload: mockOrders
    });
    expect(state.orders).toEqual(mockOrders);
    expect(state.loading).toBe(false);
  });
});

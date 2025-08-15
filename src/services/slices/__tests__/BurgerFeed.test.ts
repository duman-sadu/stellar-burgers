import { feedReducer, fetchFeedData, initialState } from '../BurgerFeed';
import { getFeedsApi } from '@api';
import { TOrder } from '../../../utils/types';

// Мокаем API
jest.mock('@api', () => ({
  getFeedsApi: jest.fn()
}));

const mockedGetFeedsApi = getFeedsApi as jest.MockedFunction<typeof getFeedsApi>;

describe('BurgerFeed slice', () => {
  it('возвращает initial state', () => {
    expect(feedReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('pending ставит isLoading = true и очищает errorMessage', () => {
    const state = feedReducer(initialState, {
      type: fetchFeedData.pending.type
    });
    expect(state.isLoading).toBe(true);
    expect(state.errorMessage).toBeNull();
  });

  it('fulfilled заполняет orders и счетчики', () => {
    const payload = {
      success: true,
      orders: [
        {
          _id: '1',
          name: 'Заказ 1',
          status: 'done',
          ingredients: [],
          createdAt: '',
          updatedAt: '',
          number: 1
        }
      ] as TOrder[],
      total: 10,
      totalToday: 3
    };
    const state = feedReducer(initialState, {
      type: fetchFeedData.fulfilled.type,
      payload
    });
    expect(state.items).toEqual(payload.orders);
    expect(state.totalCount).toBe(10);
    expect(state.todayCount).toBe(3);
    expect(state.isLoading).toBe(false);
  });

  it('rejected устанавливает errorMessage', () => {
    const error = { message: 'Ошибка сети' };
    const state = feedReducer(initialState, {
      type: fetchFeedData.rejected.type,
      error
    });
    expect(state.isLoading).toBe(false);
    expect(state.errorMessage).toBe('Ошибка сети');
  });

  it('thunk: успешный fetchFeedData диспатчит pending и fulfilled', async () => {
    const dispatch = jest.fn();
    const getState = jest.fn();

    mockedGetFeedsApi.mockResolvedValueOnce({
      success: true,
      orders: [
        {
          _id: '2',
          name: 'Заказ 2',
          status: 'pending',
          ingredients: [],
          createdAt: '',
          updatedAt: '',
          number: 2
        }
      ] as TOrder[],
      total: 5,
      totalToday: 1
    });

    const thunk = fetchFeedData();
    await thunk(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: fetchFeedData.pending.type })
    );
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: fetchFeedData.fulfilled.type })
    );
  });

  it('thunk: неуспешный fetchFeedData диспатчит pending и rejected', async () => {
    const dispatch = jest.fn();
    const getState = jest.fn();

    mockedGetFeedsApi.mockRejectedValueOnce(new Error('API error'));

    const thunk = fetchFeedData();
    await thunk(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: fetchFeedData.pending.type })
    );
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: fetchFeedData.rejected.type })
    );
  });
});

import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchFeedData } from '../../services/slices/BurgerFeed';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const { items: orders, isLoading: loading } = useSelector((state) => state.feed);

  useEffect(() => {
    dispatch(fetchFeedData());
  }, [dispatch]);

  if (loading) {
    return <Preloader />;
  }
  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(fetchFeedData());
      }}
    />
  );
};

import { ProfileOrdersUI } from '@ui-pages';
import { FC } from 'react';
import { useSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const { orders } = useSelector((state) => state.user);
  return <ProfileOrdersUI orders={orders} />;
};

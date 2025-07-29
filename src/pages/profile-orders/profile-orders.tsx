import { ProfileOrdersUI } from '@ui-pages';
import { FC } from 'react';
import { useAppSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const { orders } = useAppSelector((state) => state.user);
  return <ProfileOrdersUI orders={orders} />;
};

import React, { FC, HTMLAttributes } from 'react';
import { OrderStatusProps } from './type';
import { OrderStatusUI } from '@ui';

const statusText: { [key: string]: string } = {
  pending: 'Готовится',
  done: 'Выполнен',
  created: 'Создан'
};

type Props = OrderStatusProps & HTMLAttributes<HTMLDivElement>;

export const OrderStatus: FC<Props> = ({ status, ...props }) => {
  let textStyle = '';
  switch (status) {
    case 'pending':
      textStyle = '#E52B1A';
      break;
    case 'done':
      textStyle = '#00CCCC';
      break;
    case 'created':
      textStyle = '#F2F2F3';
      break;
    default:
      textStyle = '#F2F2F3';
  }

  return (
    <OrderStatusUI textStyle={textStyle} text={statusText[status]} {...props} />
  );
};

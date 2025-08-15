import { FC, useEffect, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import {
  submitOrder,
  resetOrderState
} from '../../services/slices/BurgerOrder';
import { resetConstructor } from '../../services/slices/BurgerConstructor';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { bun, ingredients } = useSelector((state) => state.burgerConstructor);
  const { currentOrder, isSubmitting } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(resetOrderState());
  }, [dispatch]);

  const constructorItems = {
    bun,
    ingredients
  };

  const onOrderClick = () => {
    if (!constructorItems.bun || isSubmitting) return;
    if (!user) {
      navigate('/login');
      return;
    }
    const ingredientsId = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((ingredient) => ingredient._id)
    ];

    dispatch(submitOrder(ingredientsId));
  };

  const closeOrderModal = () => {
    dispatch(resetOrderState());
    dispatch(resetConstructor());
  };

  const price = useMemo(() => {
    const bunPrice = constructorItems.bun ? constructorItems.bun.price * 2 : 0;

    const ingredientsPrice = constructorItems.ingredients.reduce(
      (s: number, v: TConstructorIngredient) => s + v.price,
      0
    );
    return bunPrice + ingredientsPrice;
  }, [constructorItems]);

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={isSubmitting}
      constructorItems={constructorItems}
      orderModalData={currentOrder}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};

import { useState, useRef, useEffect, FC } from 'react';
import { useInView } from 'react-intersection-observer';
import { BurgerIngredientsUI } from '../ui/burger-ingredients';
import { useSelector } from '../../services/store';
import { TIngredient, TTabMode } from '@utils-types';

export const BurgerIngredients: FC = () => {
  const { ingredients } = useSelector((state) => state.ingredients);

  const buns = ingredients?.filter((i) => i.type === 'bun');
  const mains = ingredients?.filter((i) => i.type === 'main');
  const sauces = ingredients?.filter((i) => i.type === 'sauce');

  const [currentTab, setCurrentTab] = useState<TTabMode>('bun');

  const titleBunRef = useRef<HTMLHeadingElement>(null);
  const titleMainRef = useRef<HTMLHeadingElement>(null);
  const titleSaucesRef = useRef<HTMLHeadingElement>(null);

  const [bunsRef, inViewBuns] = useInView({ threshold: 0 });
  const [mainsRef, inViewMains] = useInView({ threshold: 0 });
  const [saucesRef, inViewSauces] = useInView({ threshold: 0 });

  useEffect(() => {
    if (inViewBuns) setCurrentTab('bun');
    else if (inViewMains) setCurrentTab('main');
    else if (inViewSauces) setCurrentTab('sauce');
  }, [inViewBuns, inViewMains, inViewSauces]);

  // onTabClick теперь принимает string, приводим к TTabMode внутри
  const onTabClick = (tab: string) => {
    const value = tab as TTabMode;
    setCurrentTab(value);

    if (value === 'bun')
      titleBunRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (value === 'main')
      titleMainRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (value === 'sauce')
      titleSaucesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <BurgerIngredientsUI
      currentTab={currentTab}
      buns={buns}
      mains={mains}
      sauces={sauces}
      titleBunRef={titleBunRef}
      titleMainRef={titleMainRef}
      titleSaucesRef={titleSaucesRef}
      bunsRef={bunsRef}
      mainsRef={mainsRef}
      saucesRef={saucesRef}
      onTabClick={onTabClick}
    />
  );
};

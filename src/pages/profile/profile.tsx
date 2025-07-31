import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { updateProfile, fetchUserOrders } from '../../services/slices/BurgerUser';

export const Profile: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, []);

  if (user) {
    const [formValue, setFormValue] = useState({
      name: user.name,
      email: user.email,
      password: ''
    });

    useEffect(() => {
      console.log('upd form:', user);
      setFormValue((prevState) => ({
        ...prevState,
        name: user.name || '',
        email: user.email || ''
      }));
      console.log('form value:', formValue);
    }, [user]);

    const isFormChanged =
      formValue.name !== user?.name ||
      formValue.email !== user?.email ||
      !!formValue.password;

    const handleSubmit = (e: SyntheticEvent) => {
      e.preventDefault();
      dispatch(updateProfile(formValue));
    };

    const handleCancel = (e: SyntheticEvent) => {
      e.preventDefault();
      setFormValue({
        name: user.name,
        email: user.email,
        password: ''
      });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormValue((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value
      }));
    };

    return (
      <ProfileUI
        formValue={formValue}
        isFormChanged={isFormChanged}
        handleCancel={handleCancel}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
      />
    );
  }
};

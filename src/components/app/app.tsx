import { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import '../../index.css';
import styles from './app.module.css';

import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';

import {
  AppHeader,
  IngredientDetails,
  Modal,
  OrderInfo
} from '../../components';

import { ProtectedRoute } from '../protected-route/protected-route';
import { useAppDispatch } from '../../services/store';
import { fetchUser } from '../../services/slices/BurgerUser';
import { fetchIngredientList } from '../../services/slices/BurgerIngredient';

const App = () => {
  const location = useLocation();
  const goBack = useNavigate();
  const dispatch = useAppDispatch();

  const modalBg = location.state?.background;

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchIngredientList());
  }, [dispatch]);

  const renderModalWithOrder = (path: string) => (
    <Modal
      title={`#${String(location.pathname.split('/').pop()).padStart(6, '0')}`}
      onClose={() => goBack(-1)}
    >
      <OrderInfo />
    </Modal>
  );

  return (
    <div className={styles.app}>
      <AppHeader />

      <Routes location={modalBg || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />

        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <OrderInfo />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {modalBg && (
        <Routes>
          <Route
            path='/feed/:number'
            element={renderModalWithOrder('/feed/:number')}
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={() => goBack(-1)}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                {renderModalWithOrder('/profile/orders/:number')}
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  loginUserApi,
  registerUserApi,
  logoutApi,
  getUserApi,
  updateUserApi,
  getOrdersApi,
  forgotPasswordApi,
  resetPasswordApi,
  TRegisterData,
} from '@api';
import { TUser, TOrder } from '@utils-types';
import { setCookie, deleteCookie, getCookie } from '../../utils/cookie';

export const login = createAsyncThunk(
  'user/login',
  async ({ email, password }: Omit<TRegisterData, 'name'>) => {
    const response = await loginUserApi({ email, password });
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response.user;
  }
);

export const register = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) => {
    const response = await registerUserApi(data);
    return response.user;
  }
);

export const logout = createAsyncThunk('user/logout', async () => {
  await logoutApi();
  deleteCookie('accessToken');
  deleteCookie('refreshToken');
  localStorage.clear();
});

export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async (data: TRegisterData) => {
    const response = await updateUserApi(data);
    return response.user;
  }
);

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (_, { dispatch }) => {
    const accessToken = getCookie('accessToken');
    if (!accessToken) {
      dispatch(setAuthChecked());
      return null;
    }

    try {
      const response = await getUserApi();
      dispatch(setUser(response));
      return response.user;
    } catch {
      localStorage.clear();
      dispatch(setAuthChecked());
      return null;
    }
  }
);

export const fetchUserOrders = createAsyncThunk(
  'user/fetchUserOrders',
  async () => await getOrdersApi()
);

export const sendResetEmail = createAsyncThunk(
  'user/sendResetEmail',
  async (email: { email: string }) => await forgotPasswordApi(email)
);

export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async (data: { password: string; token: string }) =>
    await resetPasswordApi(data)
);

type UserState = {
  isAuthChecked: boolean;
  user: TUser | null;
  orders: TOrder[];
  loading: boolean;
  errorMessage: string | null;
};

const initialState: UserState = {
  isAuthChecked: false,
  user: null,
  orders: [],
  loading: false,
  errorMessage: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthChecked: (state) => {
      state.isAuthChecked = true;
    },
    setUser: (state, action) => {
      state.user = action.payload.user;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.error.message ?? null;
        state.isAuthChecked = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthChecked = true;
      })

      .addCase(register.pending, (state) => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.error.message ?? null;
        state.isAuthChecked = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthChecked = true;
      })

      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.error.message ?? null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
      })

      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.error.message ?? null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })

      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.error.message ?? null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })

      .addCase(sendResetEmail.pending, (state) => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(sendResetEmail.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.error.message ?? null;
      })
      .addCase(sendResetEmail.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.error.message ?? null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.isAuthChecked = true;
        state.loading = false;
        state.user = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthChecked = true;
      });
  },
});

export const { setAuthChecked, setUser } = userSlice.actions;
export const userReducer = userSlice.reducer;

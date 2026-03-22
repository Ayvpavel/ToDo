import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import {
  changePasswordApi,
  fetchUserProfile,
  loginApi,
  registerUserApi,
  type ChangePasswordRequest,
  type ChangePasswordResponse,
  type LoginData,
  type UserProfile,
} from "../src/api/user";

interface UserData {
  email: string;
  age: number;
  password: string;
}
interface UserState {
  tokens: AuthTokens | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  profile: UserProfile | null;
  loading: boolean;
  success: string | null;
  user: boolean | null;
  isLoggedIn: boolean;
}
interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export const registerUser = createAsyncThunk<AuthTokens, UserData>(
  "auth/registerUser",
  async (userData, thunkAPI) => {
    try {
      const data = await registerUserApi(
        userData.email,
        userData.age,
        userData.password,
      );
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "Ошибка регистрации");
    }
  },
);
export const loginUser = createAsyncThunk<
  { accessToken: string; refreshToken: string; profile: UserProfile },
  LoginData,
  { rejectValue: string }
>("auth/loginUser", async (loginData, thunkAPI) => {
  try {
    const tokens = await loginApi(loginData);

    localStorage.setItem("accessToken", tokens.accessToken);
    localStorage.setItem("refreshToken", tokens.refreshToken);

    const profile = await fetchUserProfile();
    return { ...tokens, profile };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message || "Ошибка входа");
  }
});

export const changePasswordThunk = createAsyncThunk<
  ChangePasswordResponse,
  ChangePasswordRequest,
  { rejectValue: string }
>("user/changePassword", async (data, { rejectWithValue }) => {
  try {
    const response = await changePasswordApi(data);
    return response;
  } catch (err: any) {
    if (err.response?.status === 401) {
      return rejectWithValue("Неверный старый пароль");
    }

    if (err.response?.status === 404) {
      return rejectWithValue("Пользователь не найден");
    }

    return rejectWithValue("Произошла ошибка. Попробуйте позже.");
  }
});

const initialState: UserState = {
  tokens: null,
  status: "idle",
  error: null,
  profile: null,
  loading: false,
  success: null,
  user: null,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload.user;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.user = null;
      state.isLoggedIn = false;
    },
    removeTokens(state) {
      state.tokens = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<AuthTokens>) => {
          state.status = "succeeded";
          state.tokens = action.payload;
          localStorage.setItem("accessToken", action.payload.accessToken);
          localStorage.setItem("refreshToken", action.payload.refreshToken);
        },
      )
      .addCase(registerUser.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tokens = {
          accessToken: action.payload.accessToken,
          refreshToken: action.payload.refreshToken,
        };
        state.profile = action.payload.profile;
        localStorage.setItem("accessToken", action.payload.accessToken);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(changePasswordThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePasswordThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "Пароль успешно изменён";
      })
      .addCase(changePasswordThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Unknown error";
      });
  },
});
export const { logout } = userSlice.actions;
export const { removeTokens } = userSlice.actions;
export default userSlice.reducer;

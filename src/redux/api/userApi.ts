import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { BaseUrl } from '../Baseurl';

interface User {
  _id: any;
  userName?: string;
  email?: string;
  token?: string;
}

interface UserState {
  user: User | null;
  users: User[]; 
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: UserState = {
  user:  null,
  users: [],
  loading: false,
  error: null,
  success: false,
};

// Register
export const registerUser = createAsyncThunk<
  User,
  { userName: string; email: string; password: string },
  { rejectValue: string }
>('user/registerUser', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${BaseUrl}User/create`, userData);
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || '註冊發生錯誤');
  }
});

// Login
export const loginUser = createAsyncThunk<
  User,
  { email: string; password: string },
  { rejectValue: string }
>('user/loginUser', async (loginData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${BaseUrl}User/login`, loginData);
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || '登入發生錯誤');
  }
});

// Get All Users
export const getAllUser = createAsyncThunk<
User[], 
  void,   
  { rejectValue: string }
>('user/getAllUser', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${BaseUrl}User/getall?page_no=1&page_size=11`);
   console.log(response,"responseresponseresponse");
   
    return response.data.data || [];

  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || '獲取使用者發生錯誤');
  }
});


// Slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearStatus: (state) => {
      state.error = null;
      state.success = false;
    },
    logout: (state) => {
      state.user = null;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || '註冊失敗';
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
        state.success = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === 'string' ? action.payload : '登入失敗';
      })

      // Get All Users
      .addCase(getAllUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUser.fulfilled, (state, action) => {
        console.log('actionactionaction', action)
        state.loading = false;  
        state.users = action.payload;
        state.success = true;
      })
      .addCase(getAllUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  
  },
});

export const { clearStatus, logout } = userSlice.actions;
export default userSlice.reducer;




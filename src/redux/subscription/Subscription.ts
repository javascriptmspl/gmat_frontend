import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Subscription {
  id: number;
  planName: string;
  price: number;
  duration: string;
  benefits: string[];
  expiry: string;
}

interface SubscriptionsState {
  items: Subscription[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: SubscriptionsState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchSubscriptions = createAsyncThunk(
  'subscriptions/fetchSubscriptions',
  async ({ page_no = 1, page_size = 11 }: { page_no?: number; page_size?: number }, thunkAPI) => {
    try {
      const response = await axios.get(`http://38.242.230.126:5476/Subscription/getall?page_no=${page_no}&page_size=${page_size}`);
      return response.data.data as Subscription[]; // adapt this if your response shape differs
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const subscriptionsSlice = createSlice({
  name: 'subscriptions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubscriptions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSubscriptions.fulfilled, (state, action: PayloadAction<Subscription[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchSubscriptions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default subscriptionsSlice.reducer;
export type { Subscription };

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BaseUrl } from '../Baseurl';

interface ChatEntry {
  _id: string;
  userId: string;
  user: {
    _id: string;
    userName: string;
    email: string;
    role: string;
  };
  botId: string;
  bot: {
    _id: string;
    name: string;
    displayName: string;
    description: string;
  };
  question: string;
  answer: string;
  createdAt: string;
  updatedAt: string;
}


interface ChatHistoryResponse {
  history: ChatEntry[];
  total: number;
  page_no: number;
  page_size: number;
}

interface ChatHistoryState {
  chathistory: ChatHistoryResponse | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ChatHistoryState = {
  chathistory: null,
  status: 'idle',
  error: null,
};

export const fetchChatHistory = createAsyncThunk(
  'chatHistory/fetchChatHistory',
  async ({ userId, pageNo = 1, pageSize = 100 }: { userId: string, pageNo?: number, pageSize?: number }) => {
    const response = await axios.get(`${BaseUrl}User/history/${userId}?page_no=${pageNo}&page_size=${pageSize}`);
    return response.data.data;
  }
);

export const ChatHistoryById = createAsyncThunk(
  'chatHistory/ChatHistoryById',
  async ({ userId,botId, pageNo = 1, pageSize = 100 }: { userId: string,botId: string, pageNo?: number, pageSize?: number }) => {
    const response = await axios.get(`${BaseUrl}User/history/${userId}/${botId}?page_no=${pageNo}&page_size=${pageSize}`);
    return response.data.data;
  }
);

const chatHistorySlice = createSlice({
  name: 'chatHistory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatHistory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchChatHistory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.chathistory = action.payload;
      })
      .addCase(fetchChatHistory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch chat history';
      })

      .addCase(ChatHistoryById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(ChatHistoryById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.chathistory = action.payload;
      })
      .addCase(ChatHistoryById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch chat history';
      });
  },
});

export default chatHistorySlice.reducer;

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BaseUrl } from '../Baseurl';

interface Message {
  user: string;
  reply: string;
}

interface ChatState {
  messages: Message[];
  loading: boolean;
  error: string | null;
}

interface AskQuestionParams {
  question: string;
  userId: string;
  botId: string;
}

export const askQuestion = createAsyncThunk(
  'chat/askQuestion',
  async ({ question, userId, botId }: AskQuestionParams) => {
    const response = await fetch(`${BaseUrl}User/ask/${userId}?botId=${botId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch reply.');
    }

    const data = await response.json();
    return data;
  }
);

const initialState: ChatState = {
  messages: [],
  loading: false,
  error: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addUserMessage: (state, action: PayloadAction<string>) => {
      state.messages.push({ user: action.payload, reply: '...' });
    },
    setAllMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(askQuestion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(askQuestion.fulfilled, (state, action) => {
        const last = state.messages.length - 1;
        if (last >= 0) {
          state.messages[last].reply = action.payload.answer;
        }
        state.loading = false;
      })
      .addCase(askQuestion.rejected, (state, action) => {
        const last = state.messages.length - 1;
        if (last >= 0) {
          state.messages[last].reply = '發生錯誤，請稍後再試。';
        }
        state.loading = false;
        state.error = action.error.message || 'Unknown error';
      });
  },
});

export const { addUserMessage, setAllMessages } = chatSlice.actions;
export default chatSlice.reducer;

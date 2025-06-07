import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { BaseUrl } from "../Baseurl";

export interface Bot {
  _id: string;
  Name: string; 
  description?: string;
  avatar: any;
}

interface BotState {
  bots: Bot[];
  loading: boolean;
  error: string | null;
}

const initialState: BotState = {
  bots: [],
  loading: false,
  error: null,
};

export const fetchBots = createAsyncThunk<Bot[]>(
  "bot/fetchBots",
  async () => {
    const response = await axios.get(`${BaseUrl}Bot/getall?page_no=1&page_size=100`);
    return response.data.data as Bot[];
  }
);

export const BotsById = createAsyncThunk<Bot, { botId: string }>(
  "bot/BotsById",
  async ({ botId }) => {
    const response = await axios.get(`${BaseUrl}Bot/getById/${botId}`);
    return response.data.data as Bot;
  }
);

export const updateBot = createAsyncThunk<
  Bot,
  { botId: string; botData: Partial<Bot> }
>(
  "bot/updateBot",
  async ({ botId, botData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${BaseUrl}Bot/update/${botId}`,
        botData
      );
      return response.data.data as Bot;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to update bot");
    }
  }
);

export const deleteBot = createAsyncThunk<
  { botId: string },
  { botId: string }
>(
  "bot/deleteBot",
  async ({ botId }, { rejectWithValue }) => {
    try {
      await axios.delete(`${BaseUrl}Bot/remove/${botId}`);
      return { botId };
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to delete bot");
    }
  }
);

const botSlice = createSlice({
  name: "bot",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBots.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBots.fulfilled, (state, action: PayloadAction<Bot[]>) => {
        state.bots = action.payload;
        state.loading = false;
      })
      .addCase(fetchBots.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch bots";
      })

      .addCase(BotsById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(BotsById.fulfilled, (state, action: PayloadAction<Bot>) => {
        const index = state.bots.findIndex(bot => bot._id === action.payload._id);
        if (index !== -1) {
          state.bots[index] = action.payload;
        } else {
          state.bots.push(action.payload);
        }
        state.loading = false;
      })
      .addCase(BotsById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch bot by ID";
      })

      .addCase(updateBot.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBot.fulfilled, (state, action: PayloadAction<Bot>) => {
        const index = state.bots.findIndex(bot => bot._id === action.payload._id);
        if (index !== -1) {
          state.bots[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateBot.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update bot";
      })

      .addCase(deleteBot.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBot.fulfilled, (state, action: PayloadAction<{ botId: string }>) => {
        state.bots = state.bots.filter(bot => bot._id !== action.payload.botId);
        state.loading = false;
      })
      .addCase(deleteBot.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete bot";
      });
  },
});

export default botSlice.reducer;

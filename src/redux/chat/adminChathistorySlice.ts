import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BaseUrl } from "../Baseurl";

interface Log {
  tool: string;
  date: string;
}

interface LogState {
  logs: Log[];
  loading: boolean;
  error: string | null;
}

const initialState: LogState = {
  logs: [],
  loading: false,
  error: null,
};

export const fetchLogs = createAsyncThunk("logs/fetchLogs", async () => {
  const response = await axios.get(`${BaseUrl}User/history?page_no=${1}&page_size=${100}`
  );
  return response.data.data as Log[]; 
});

export const DeleteLogs = createAsyncThunk(
  "logs/DeleteLogs",
  async (ids: string[]) => {
    const response = await axios.delete(`${BaseUrl}User/history/delete-multiple`, {
      data: { ids },
    });
    return response.data.data as Log[];
  }
);


const logSlice = createSlice({
  name: "logs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLogs.fulfilled, (state, action) => {
        state.loading = false;
        state.logs = action.payload;
      })
      .addCase(fetchLogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch logs.";
      })

      .addCase(DeleteLogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(DeleteLogs.fulfilled, (state, action) => {
        state.loading = false;
        state.logs = action.payload;
      })
      .addCase(DeleteLogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch logs.";
      })
  },
});

export default logSlice.reducer;

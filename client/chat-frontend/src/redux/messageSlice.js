import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 🌐 Base API
const API_URL = "http://localhost:8080/rooms";

// ✅ Fetch messages
export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async ({ roomId, userId, page = 1, limit = 20 }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/${roomId}/messages`,
        { params: { userId, page, limit } }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ Send message
export const sendMessage = createAsyncThunk(
  "messages/sendMessage",
  async ({ roomId, userId, content }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/${roomId}/messages`,
        { senderId: userId, content },
        { params: { userId } }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const messageSlice = createSlice({
  name: "messages",
  initialState: {
    items: [],   // list of messages
    status: "idle",
    error: null,
  },
  reducers: {
    clearMessages: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔹 fetchMessages
      .addCase(fetchMessages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Backend returns { messages: [...], page, limit, total }
        state.items = action.payload.messages;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // 🔹 sendMessage
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.items.push(action.payload); // append new message
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearMessages } = messageSlice.actions;
export default messageSlice.reducer;

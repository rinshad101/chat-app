import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8080/rooms";

// ✅ Get rooms for a user
export const fetchRooms = createAsyncThunk(
  "rooms/fetchRooms",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const res = await axios.get(API_URL, { params: { userId } });
      return res.data.rooms; // backend returns { rooms: [...] }
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ Create room
export const createRoom = createAsyncThunk(
  "rooms/createRoom",
  async ({ userId, name, type, members = [] }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        API_URL,
        { name, type, members },
        { params: { userId } }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ Get single room
export const fetchRoomById = createAsyncThunk(
  "rooms/fetchRoomById",
  async ({ userId, roomId }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/${roomId}`, { params: { userId } });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ Update room
export const updateRoom = createAsyncThunk(
  "rooms/updateRoom",
  async ({ userId, roomId, name }, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `${API_URL}/${roomId}`,
        { name },
        { params: { userId } }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ Delete room
export const deleteRoom = createAsyncThunk(
  "rooms/deleteRoom",
  async ({ userId, roomId }, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${API_URL}/${roomId}`, {
        params: { userId },
      });
      return { roomId, message: res.data.message };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const roomSlice = createSlice({
  name: "rooms",
  initialState: {
    list: [],       // list of all rooms
    current: null,  // selected room
    status: "idle",
    error: null,
  },
  reducers: {
    clearCurrentRoom: (state) => {
      state.current = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔹 fetchRooms
      .addCase(fetchRooms.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // 🔹 createRoom
      .addCase(createRoom.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      // 🔹 fetchRoomById
      .addCase(fetchRoomById.fulfilled, (state, action) => {
        state.current = action.payload;
      })
      // 🔹 updateRoom
      .addCase(updateRoom.fulfilled, (state, action) => {
        const index = state.list.findIndex((r) => r.id === action.payload.id);
        if (index !== -1) state.list[index] = action.payload;
        if (state.current?.id === action.payload.id) {
          state.current = action.payload;
        }
      })
      // 🔹 deleteRoom
      .addCase(deleteRoom.fulfilled, (state, action) => {
        state.list = state.list.filter((r) => r.id !== action.payload.roomId);
        if (state.current?.id === action.payload.roomId) {
          state.current = null;
        }
      });
  },
});

export const { clearCurrentRoom } = roomSlice.actions;
export default roomSlice.reducer;

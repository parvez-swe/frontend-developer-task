import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userDataService from "./userDataService";

// Get user from localStorage
const user = JSON.parse(localStorage.getItem("taskUser"));

const initialState = {
  user: user ? user : null,
  sectorData: [],
  isSending: false,
  isGetting: false,
  isUpdating: false,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// add user Data
export const addUserData = createAsyncThunk(
  "user-data/add",
  async (userData, thunkAPI) => {
    try {
      return await userDataService.addUserData(userData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// add user Data
export const updateUserData = createAsyncThunk(
  "user-data/update",
  async (userData, thunkAPI) => {
    try {
      return await userDataService.updateUserData(userData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// add user Data
export const deleteUserData = createAsyncThunk(
  "user-data/delete",
  async (id, thunkAPI) => {
    try {
      return await userDataService.deleteUserData(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// add user Data
export const getSectorData = createAsyncThunk(
  "sector-data/get",
  async (_, thunkAPI) => {
    try {
      return await userDataService.getSectorData();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const userDataSlice = createSlice({
  name: "user-data",
  initialState,
  reducers: {
    reset: (state) => {
      state.isSending = false;
      state.isGetting = false;
      state.isUpdating = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addUserData.pending, (state) => {
        state.isSending = true;
      })
      .addCase(addUserData.fulfilled, (state, action) => {
        state.isSending = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(addUserData.rejected, (state, action) => {
        state.isSending = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(deleteUserData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUserData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = null;
      })
      .addCase(deleteUserData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(updateUserData.pending, (state) => {
        state.isUpdating = true;
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.isUpdating = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(updateUserData.rejected, (state, action) => {
        state.isUpdating = false;
        state.isError = true;
        state.message = action.payload;
        // state.user = null;
      })
      .addCase(getSectorData.pending, (state) => {
        state.isGetting = true;
      })
      .addCase(getSectorData.fulfilled, (state, action) => {
        state.isGetting = false;
        state.isSuccess = true;
        state.sectorData = action.payload.sectors;
      })
      .addCase(getSectorData.rejected, (state, action) => {
        state.isGetting = false;
        state.isError = true;
        state.message = action.payload;
        state.sectorData = [];
      });
  },
});

export const { reset } = userDataSlice.actions;
export default userDataSlice.reducer;

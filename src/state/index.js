import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import serverUrl from "../server";

const initialState = {
  user: null,
  userType: "user",
  locations: [],
};

export const fetchLocations = createAsyncThunk(
  "locations/fetchLocations",
  async (dispatch, getState) => {
    const response = await axios.get(`${serverUrl}/api/location`);
    return response?.data?.locations;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
    },
    setLogout: (state) => {
      state.user = null;
    },
    setUserType: (state, action) => {
      state.userType =
        action.payload.userType === "user" ? "user" : state.userType;
    },
  },
  extraReducers: {
    [fetchLocations.pending]: (state) => {
      state.locations = [];
    },
    [fetchLocations.fulfilled]: (state, action) => {
      state.locations = action.payload;
    },
    [fetchLocations.rejected]: (state) => {
      state.locations = [];
    },
  },
});

export const { setUser, setLogout, setUserType } = authSlice.actions;
export default authSlice.reducer;

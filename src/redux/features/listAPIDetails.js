import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getDetails = createAsyncThunk(
  "posts/id",
  async (args, { rejectWithValue }) => {
    try {
      const { name } = args;
      let response = await axios.get(
        `http://localhost:4200/api/user/getuser/${name}`
      );
      console.log(response)
      if (response.status === 200) {
        return response.data.Result;
      } else {
        const message = response.data;
        throw new Error(message.error);
      }
    } catch (e) {
      rejectWithValue(e.response.data);
    }
  }
);

const listAPIDetails = createSlice({
  name: "listDetailsAPI",
  initialState: { value: "--", loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDetails.fulfilled, (state, action) => {
        state.value = action.payload;
        state.loading = false;
      });
  },
});

export default listAPIDetails;

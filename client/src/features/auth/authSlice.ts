import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/axios";

const authSlice = createSlice({
  name: "auth",
  initialState: {},
  reducers: {},
});

export default authSlice.reducer;

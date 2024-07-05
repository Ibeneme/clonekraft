import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseApiUrl } from "../Baseurl/Baseurl";

// Define the initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  status: "idle",
  error: null,
};

export const registerAffiliate = createAsyncThunk(
  "marketers/registerAffiliate",
  async (payload) => {
    try {
      const response = await axios.post(`${baseApiUrl}/marketer/register`, {
        email: payload.email,
        password: payload.password,
        //username: payload.email,
      });

      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error, "order_id");
      throw new Error(error.message);
    }
  }
);

export const loginAffiliate = createAsyncThunk(
  "marketers/loginAffiliate",
  async (payload) => {
    try {
      const response = await axios.post(`${baseApiUrl}/marketer/login`, {
        email: payload.email,
        password: payload.password,
      });

      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error, "order_id");
      throw new Error(error.message);
    }
  }
);

export const forgotPasswordAffiliate = createAsyncThunk(
  "marketers/forgotPasswordAffiliate",
  async (payload) => {
    try {
      console.log(payload);
      const response = await axios.post(
        `${baseApiUrl}/marketer/forgot`,
        payload
      );

      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error, "order_id");
      throw new Error(error.message);
    }
  }
);

export const validatePasswordAffiliate = createAsyncThunk(
  "marketers/validatePasswordAffiliate",
  async (payload) => {
    try {
      const response = await axios.post(
        `${baseApiUrl}/marketer/validate`,
        payload
      );

      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error, "order_id");
      throw new Error(error.message);
    }
  }
);

const marketersSlice = createSlice({
  name: "marketers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAffiliate.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginAffiliate.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loginAffiliate.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(registerAffiliate.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerAffiliate.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(registerAffiliate.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(forgotPasswordAffiliate.pending, (state) => {
        state.status = "loading";
      })
      .addCase(forgotPasswordAffiliate.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(forgotPasswordAffiliate.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(validatePasswordAffiliate.pending, (state) => {
        state.status = "loading";
      })
      .addCase(validatePasswordAffiliate.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(validatePasswordAffiliate.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Export the async thunks and reducer
export default marketersSlice.reducer;

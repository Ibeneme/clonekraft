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

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (credentials) => {
    try {
      const token = localStorage.getItem("clone_kraft_user_token");

      // Set the authorization header with the token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Make the POST request with credentials and config
      const response = await axios.post(
        `${baseApiUrl}/order/create`,
        credentials,
        config
      );
      console.log(response.data, "pl");
      return response.data;
    } catch (error) {
      console.log(error, "lerror");
      throw new Error(error.message);
    }
  }
);

export const getOrders = createAsyncThunk("order/getOrders", async () => {
  try {
    const token = localStorage.getItem("clone_kraft_user_token");

    // Set the authorization header with the token
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Make the POST request with credentials and config
    const response = await axios.get(`${baseApiUrl}/order/users`, config);
    console.log(response.data, "pl");
    return response.data;
  } catch (error) {
    console.log(error, "lerror");
    throw new Error(error.message);
  }
});

export const isReadUpdate = createAsyncThunk(
  "order/isReadUpdate",
  async (order_id) => {
    try {
      const token = localStorage.getItem("clone_kraft_user_token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Make the POST request with credentials and config
      const response = await axios.get(
        `${baseApiUrl}/read/${order_id}`,
        config
      );
      console.log(response.data, "pl");
      return response.data;
    } catch (error) {
      console.log(error, "lerror");
      throw new Error(error.message);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(isReadUpdate.pending, (state) => {
        state.status = "loading";
      })
      .addCase(isReadUpdate.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(isReadUpdate.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(getOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Export the async thunks and reducer
export default orderSlice.reducer;

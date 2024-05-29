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

export const adminLogin = createAsyncThunk(
  "admin/adminLogin",
  async (credentials) => {
    try {
      const response = await axios.post(
        `${baseApiUrl}/admin/login`,
        credentials
      );
      const clone_kraft_admin = response?.data?.token;
      localStorage.setItem("clone_kraft_admin", clone_kraft_admin);

      const clone_kraft_admin_user = response?.data?.admin;
      localStorage.setItem(
        "clone_kraft_admin_user",
        JSON.stringify(clone_kraft_admin_user)
      );

      console.log(response.data, "response.dataresponse.data");
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

export const getUsers = createAsyncThunk("order/getUsers", async () => {
  try {
    // Retrieve token from localStorage
    const token = localStorage.getItem("clone_kraft_admin");

    // Set the authorization header with the token
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${baseApiUrl}/auth/users`, config);
    console.log(response.data, "pl");
    return response.data;
  } catch (error) {
    console.log(error, "lerror");
    throw new Error(error.message);
  }
});

export const getOrdersAdmin = createAsyncThunk(
  "order/getOrdersAdmin",
  async () => {
    try {
      // Retrieve token from localStorage
      const token = localStorage.getItem("clone_kraft_admin");

      // Set the authorization header with the token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Make the POST request with credentials and config
      const response = await axios.get(`${baseApiUrl}/order/`, config);
      console.log(response.data, "pl");
      return response.data;
    } catch (error) {
      console.log(error, "lerror");
      throw new Error(error.message);
    }
  }
);

export const updateOrder = createAsyncThunk(
  "order/updateOrder",
  async ({ order_id, payload }) => {
    try {
      console.log(payload, order_id, "order_idorder_id");
      // Retrieve token from localStorage
      const token = localStorage.getItem("clone_kraft_admin");

      // Set the authorization header with the token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Make the POST request with payload and config
      const response = await axios.put(
        `${baseApiUrl}/order/${order_id}`,
        payload,
        config
      );
      console.log(response.data, "order_id", payload, order_id);
      return response.data;
    } catch (error) {
      console.log(error, "order_id");
      throw new Error(error.message);
    }
  }
);

export const getMessages = createAsyncThunk(
  "order/getMessages",
  async (order_id) => {
    try {
      console.log(order_id, "order_idorder_id");
      // Retrieve token from localStorage
      //const token = localStorage.getItem("clone_kraft_admin");

      // Set the authorization header with the token
      //   const config = {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   };

      // Make the POST request with payload and config
      const response = await axios.get(
        `${baseApiUrl}/order/messages/${order_id}`
      );
      console.log(response.data, "order_id", order_id);
      return response.data;
    } catch (error) {
      console.log(error, "order_id");
      throw new Error(error.message);
    }
  }
);

export const getAdmin = createAsyncThunk("order/getAdmin", async () => {
  try {
    // Retrieve token from localStorage
    const token = localStorage.getItem("clone_kraft_admin");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Make the POST request with payload and config
    const response = await axios.get(`${baseApiUrl}/admin/profiler`, config);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error, "order_id");
    throw new Error(error.message);
  }
});

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(adminLogin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(getUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(getOrdersAdmin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getOrdersAdmin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(getOrdersAdmin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(updateOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(getMessages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Export the async thunks and reducer
export default adminSlice.reducer;

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

export const createOrderRating = createAsyncThunk(
  "order/createOrderRating",
  async () => {
    try {
      const token = localStorage.getItem("clone_kraft_user_token");

      // Set the authorization header with the token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Make the POST request with credentials and config
      const response = await axios.post(`${baseApiUrl}/order/rate`, config);
      console.log(response.data, "pl");
      return response.data;
    } catch (error) {
      console.log(error, "lerror");
      throw new Error(error.message);
    }
  }
);

export const createRating = createAsyncThunk(
  "order/createRating",
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
        `${baseApiUrl}/rating/rate`,
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

export const editRating = createAsyncThunk(
  "order/editRating",
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
      const response = await axios.put(
        `${baseApiUrl}/rating/ratings/${credentials?.rating_id}`,
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

export const deleteRating = createAsyncThunk(
  "order/deleteRating",
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
      const response = await axios.delete(
        `${baseApiUrl}/rating/ratings/${credentials?.rating_id}`,
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

export const getRatings = createAsyncThunk("order/getRatings", async () => {
  try {
    const token = localStorage.getItem("clone_kraft_user_token");

    // Set the authorization header with the token
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Make the POST request with credentials and config
    const response = await axios.get(`${baseApiUrl}/rating/ratings`, config);
    console.log(response.data, "pl");
    return response.data;
  } catch (error) {
    console.log(error, "lerror");
    throw new Error(error.message);
  }
});

export const getRatingsPerOrder = createAsyncThunk(
  "order/getRatingsPerOrder",
  async (id) => {
    try {
      const token = localStorage.getItem("clone_kraft_user_token");

      // Set the authorization header with the token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Make the POST request with credentials and config
      const response = await axios.get(
        `${baseApiUrl}/rating/ratings/order/${id}`,
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

export const updateOrderPhotos = createAsyncThunk(
  "order/updateOrderPhotos",
  async ({ credentials, orderID }) => {
    try {
      const token = localStorage.getItem("clone_kraft_user_token");

      // Set the authorization header with the token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Make the POST request with credentials and config
      const response = await axios.put(
        `${baseApiUrl}/order/update-progress/${orderID}`,
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

export const updateOrderClient = createAsyncThunk(
  "order/updateOrderClient",
  async ({ order_id, credentials }) => {
    try {
      const token = localStorage.getItem("clone_kraft_user_token");

      // Set the authorization header with the token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Make the PUT request with credentials and config
      const response = await axios.put(
        `${baseApiUrl}/order/payment/${order_id}`,
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
export const getSingleOrder = createAsyncThunk(
  "order/getSingleOrder",
  async (id) => {
    try {
      // Make the POST request with credentials and config
      const response = await axios.get(`${baseApiUrl}/order/single/${id}`);
      console.log(response.data, "pl");
      return response.data;
    } catch (error) {
      console.log(error, "lerror");
      throw new Error(error.message);
    }
  }
);

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

export const subscribeToNewsletter = createAsyncThunk(
  "order/subscribeToNewsletter",
  async (email) => {
    try {
      // Make the POST request with credentials and config
      const response = await axios.post(`${baseApiUrl}/newsletter/subscribe`, {
        email: email,
      });
      console.log(response.data, "pl");
      return response.data;
    } catch (error) {
      console.log(error, "lerror");
      throw new Error(error.message);
    }
  }
);
export const unsubscribeToNewsletter = createAsyncThunk(
  "order/unsubscribeToNewsletter",
  async (email) => {
    try {
      // Make the POST request with email and config
      const response = await axios.delete(
        `${baseApiUrl}/newsletter/subscribers/${email}`
      );
      console.log(response.data, "pl");
      return response.data;
    } catch (error) {
      console.log(error, "lerror");
      throw new Error(error.message);
    }
  }
);

export const getNewsletterEmails = createAsyncThunk(
  "order/getNewsletterEmails",
  async () => {
    try {
      // Make the POST request with email and config
      const response = await axios.get(`${baseApiUrl}/newsletter/subscribers`);
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
    builder
      .addCase(updateOrderClient.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateOrderClient.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(updateOrderClient.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(getSingleOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSingleOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(getSingleOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(createOrderRating.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrderRating.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(createOrderRating.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(createRating.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createRating.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(createRating.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(getRatings.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getRatings.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(getRatings.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(editRating.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editRating.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(editRating.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(getRatingsPerOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getRatingsPerOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(getRatingsPerOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(deleteRating.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteRating.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(deleteRating.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    builder
      .addCase(subscribeToNewsletter.pending, (state) => {
        state.status = "loading";
      })
      .addCase(subscribeToNewsletter.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(subscribeToNewsletter.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    builder
      .addCase(unsubscribeToNewsletter.pending, (state) => {
        state.status = "loading";
      })
      .addCase(unsubscribeToNewsletter.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(unsubscribeToNewsletter.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(getNewsletterEmails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getNewsletterEmails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(getNewsletterEmails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(updateOrderPhotos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateOrderPhotos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(updateOrderPhotos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Export the async thunks and reducer
export default orderSlice.reducer;

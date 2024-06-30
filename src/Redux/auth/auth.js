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

export const register = createAsyncThunk("auth/register", async (userData) => {
  try {
    const response = await axios.post(`${baseApiUrl}/auth/register`, {
      email: userData?.email,
      password: userData?.password,
      username: userData?.username,
      phoneNumber: userData?.phoneNumber,
      address: userData?.address,
      
    });
    const clone_kraft_user_token = response?.data?.token;
    localStorage.setItem("clone_kraft_user_token", clone_kraft_user_token);

    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const validateOtp = createAsyncThunk(
  "auth/validateOtp",
  async (userData) => {
    try {
      const response = await axios.post(`${baseApiUrl}/auth/validate`, {
        email: userData?.email,
        otp: userData?.otp,
      });

      const clone_kraft_user_token = response?.data?.token;
      localStorage.setItem("clone_kraft_user_token", clone_kraft_user_token);

      console.log(response.data, "tokes");
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const resendOtp = createAsyncThunk("auth/resendOtp", async (email) => {
  try {
    const response = await axios.post(`${baseApiUrl}/auth/resend`, {
      email: email,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const login = createAsyncThunk("auth/login", async (credentials) => {
  try {
    const response = await axios.post(`${baseApiUrl}/auth/login`, credentials);
    const clone_kraft_user_token = response?.data?.token;
    localStorage.setItem("clone_kraft_user_token", clone_kraft_user_token);

    const clone_kraft_user = response?.data?.user;
    localStorage.setItem("clone_kraft_user", JSON.stringify(clone_kraft_user));

    console.log(response.data, "response.dataresponse.data");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
});
export const forgot = createAsyncThunk("auth/forgot", async (credentials) => {
  try {
    const response = await axios.post(`${baseApiUrl}/auth/forgot`, credentials);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
});

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (credentials) => {
    try {
      const response = await axios.post(
        `${baseApiUrl}/auth/reset`,
        credentials
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

export const profile = createAsyncThunk("auth/profile", async () => {
  try {
    // Retrieve token from localStorage
    const token = localStorage.getItem("clone_kraft_user_token");

    // Set the authorization header with the token
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Make the POST request with credentials and config
    const response = await axios.get(`${baseApiUrl}/auth/user`, config);
    console.log(response.data, "pl");
    return response.data;
  } catch (error) {
    console.log(error, "lerror");
    throw new Error(error.message);
  }
});
export const crossUser = createAsyncThunk("auth/crossUser", async (orderId) => {
  try {
    // Retrieve token from localStorage
    const token = localStorage.getItem("clone_kraft_user_token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    console.log(config,'clone_kraft_user_token')

    // Make the POST request with credentials and config
    const response = await axios.put(`${baseApiUrl}/order/cross/${orderId}`, config);
    console.log(response.data, "localStorage");
    return response.data;
  } catch (error) {
    console.log(error, "lerror");
    throw new Error(error.message);
  }
});

export const updateUserImage = createAsyncThunk(
  "auth/updateUserImage",
  async (credentials) => {
    try {
      // Retrieve token from localStorage
      const token = localStorage.getItem("clone_kraft_user_token");

      // Set the authorization header with the token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Make the POST request with credentials and config
      const response = await axios.put(
        `${baseApiUrl}/auth/image`,
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

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (credentials) => {
    try {
      // Retrieve token from localStorage
      const token = localStorage.getItem("clone_kraft_user_token");

      // Set the authorization header with the token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Make the POST request with credentials and config
      const response = await axios.put(
        `${baseApiUrl}/auth/update`,
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

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    await axios.post("${baseApiUrl}/logout");
    return null;
  } catch (error) {
    throw new Error(error.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.status = "loading";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(updateUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(updateUserImage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserImage.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(updateUserImage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    builder
      .addCase(resetPassword.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(forgot.pending, (state) => {
        state.status = "loading";
      })
      .addCase(forgot.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(forgot.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(resendOtp.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resendOtp.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(resendOtp.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(profile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(profile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(profile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(validateOtp.pending, (state) => {
        state.status = "loading";
      })
      .addCase(validateOtp.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(validateOtp.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(logout.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = "succeeded";
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Export the async thunks and reducer
export default authSlice.reducer;

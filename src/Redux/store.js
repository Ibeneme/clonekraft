import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/auth";
import orderReducer from "./order/order";
const store = configureStore({
  reducer: {
    auth: authReducer,
    order: orderReducer,
  },
});

export default store;
//mongodb+srv://ikennaibenemee:ikennaibenemee@cluster0.vheofmm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

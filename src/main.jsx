import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/store.js";
import { ToastContainer } from "react-toastify";
import { SocketProvider } from "./chat/context/useSocket.jsx";
// import dotenv from "dotenv";
// dotenv.config();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <SocketProvider>
        <BrowserRouter>
          <App />
          <ToastContainer />
        </BrowserRouter>
      </SocketProvider>
    </Provider>
  </React.StrictMode>
);

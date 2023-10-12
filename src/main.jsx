import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
// import { AuthContextProvider } from "./context/user/AuthContextProvider.jsx";
import { UserProvider } from "./context/user/UserProvider";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <BrowserRouter>
    {/* <AuthContextProvider> */}
    <UserProvider>
      <App />
    </UserProvider>
    {/* </AuthContextProvider> */}
  </BrowserRouter>
  // </React.StrictMode>
);

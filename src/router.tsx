import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import OTPVerification from "./pages/OTPVerification";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/verify-otp",
    element: <OTPVerification />,
  },
]);

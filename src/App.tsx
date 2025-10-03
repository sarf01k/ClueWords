import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import SignIn from "./pages/auth/Sign-In";
import SignUp from "./pages/auth/Sign-Up";
import ForgotPassword from "./pages/auth/Forgot-Password";
import Root from "./pages/home/Root";
import { PrivateRoute } from "./context/AuthContext";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Root />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route element={<PrivateRoute />}>
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<div>Profile page</div>} />
      </Route>
    </Routes>
  );
}

export default App;

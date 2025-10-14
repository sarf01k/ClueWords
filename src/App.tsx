import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import SignIn from "./pages/auth/Sign-In";
import SignUp from "./pages/auth/Sign-Up";
import ForgotPassword from "./pages/auth/Forgot-Password";
import Root from "./pages/home/Root";
import { PrivateRoute } from "./context/AuthContext";
import Play from "./pages/quiz/Play";
import Results from "./pages/quiz/Results";
import Account from "./pages/Account";
import { Toaster } from "./components/retroui/Sonner";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/play" element={<Play />} />
          <Route path="/results" element={<Results />} />
          <Route path="/account" element={<Account />} />
          <Route path="/scoreboard" element={<Account />} />
        </Route>

        <Route path="*" element={<div>404 | Not Found</div>} />
      </Routes>

      <Toaster richColors />
    </>
  );
}

export default App;

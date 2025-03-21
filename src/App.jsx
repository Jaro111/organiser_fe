import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { authCheck } from "./utils/user";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { userContext } from "./common/context";
import { Navbar } from "./components/Navbar/Navbar";
import { Footer } from "./components/Footer/Footer";
import { Home } from "./pages/Home";
import { ResetPassword } from "./pages/ResetPassword";
import { ResetPasswordRequest } from "./pages/ResetPasswordRequest";
import { Notifications } from "./pages/Notifications";
import "./App.css";
const url = import.meta.env.VITE_URL;

function App() {
  const [user, setUser] = useState({});
  const [numberOfInv, setNumberOfInv] = useState(0);

  const logInWithToken = async (token) => {
    const persUser = await authCheck(token);
    persUser.user["token"] = token;
    setUser(persUser.user);
  };

  useEffect(() => {
    if (document.cookie) {
      let token = Cookies.get("jwt-token");
      if (token === false) {
        setUser({});
      } else {
        logInWithToken(token, setUser);
      }
    }
  }, [numberOfInv]);

  return (
    <userContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      <BrowserRouter basename="">
        <Navbar numberOfInv={numberOfInv} setNumberOfInv={setNumberOfInv} />
        <Routes>
          <Route
            path=""
            element={
              <Home numberOfInv={numberOfInv} setNumberOfInv={setNumberOfInv} />
            }
          />
          <Route
            path="/notifications"
            element={
              <Notifications
                numberOfInv={numberOfInv}
                setNumberOfInv={setNumberOfInv}
              />
            }
          />
          <Route path="/resetPassordForm" element={<ResetPassword />} />
          <Route
            path="/resetPassordRequest/:token"
            element={<ResetPasswordRequest />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </userContext.Provider>
  );
}

export default App;

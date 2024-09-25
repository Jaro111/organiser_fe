import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { authCheck } from "./utils/user";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { userContext } from "./common/context";
import { Navbar } from "./components/Navbar/Navbar";
import { Footer } from "./components/Footer/Footer";
import { Home } from "./pages/Home";
import { Notifications } from "./pages/Notifications";

import "./App.css";

function App() {
  const [user, setUser] = useState({});
  const [owner, setOwner] = useState(undefined);

  const logInWithToken = async (token) => {
    const persUser = await authCheck(token);
    console.log("persUser: ", persUser.user);
    setUser(persUser.user);
  };

  useEffect(() => {
    if (document.cookie) {
      let token = Cookies.get("jwt-token");
      console.log("jwt token", token);
      if (token === false) {
        setUser({});
      } else {
        logInWithToken(token, setUser);
      }
    }
  }, []);

  return (
    <userContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      <BrowserRouter basename="">
        <Navbar owner={owner} setOwner={setOwner} />
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/notifications" element={<Notifications />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </userContext.Provider>
  );
}

export default App;

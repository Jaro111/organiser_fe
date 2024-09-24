import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { userContext } from "./common/context";
import { Navbar } from "./components/Navbar/Navbar";
import { Footer } from "./components/Footer/Footer";
import { Home } from "./pages/Home";
import { Notifications } from "./pages/Notifications";

import "./App.css";

function App() {
  const [user, setUser] = useState({});
  return (
    <userContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      <BrowserRouter basename="">
        <Navbar />
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

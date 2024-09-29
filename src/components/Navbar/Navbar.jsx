import React from "react";
import { useState, useContext } from "react";
import { userContext } from "../../common/context";
import { useNavigate } from "react-router-dom";
import { SignUp } from "../SignUp/SignUp";
import { FaBell } from "react-icons/fa6";
import { ModalSignUp } from "../SignUp/ModalSignUp/ModalSignUp";

import "./Navbar.css";

export const Navbar = () => {
  const [isModalSignInVisible, setIsmodalSignInVisible] = useState(false);

  const user = useContext(userContext).user;
  const navigate = useNavigate();

  const clickSignUp = () => {
    setIsmodalSignInVisible(true);
  };

  const navigateToPage = (path) => {
    navigate(path);
  };
  return (
    <div className="navbar-wrapper">
      <div className="leftNav">
        <p className="appName-content" onClick={() => navigateToPage("/")}>
          SHARED ORGANISER
        </p>
        {isModalSignInVisible && (
          <ModalSignUp setIsmodalSignInVisible={setIsmodalSignInVisible} />
        )}
      </div>
      <div className="rightNav">
        <SignUp clickSignUp={clickSignUp} />
        <div>
          <FaBell
            className="notificationIcon"
            onClick={() => navigateToPage("/notifications")}
          />
        </div>
      </div>
    </div>
  );
};

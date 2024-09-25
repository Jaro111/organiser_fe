import React from "react";
import { useState, useContext } from "react";
import { userContext } from "../../common/context";
import { SignUp } from "../SignUp/SignUp";
import { FaBell } from "react-icons/fa6";
import { ModalSignUp } from "../SignUp/ModalSignUp/ModalSignUp";

import "./Navbar.css";

export const Navbar = () => {
  const [isModalSignInVisible, setIsmodalSignInVisible] = useState(false);

  const user = useContext(userContext).user;

  const clickSignUp = () => {
    setIsmodalSignInVisible(true);
  };
  return (
    <div className="navbar-wrapper">
      <div className="leftNav">
        <p>TO DO ORGANISER</p>
        {isModalSignInVisible && (
          <ModalSignUp setIsmodalSignInVisible={setIsmodalSignInVisible} />
        )}
      </div>
      <div className="rightNav">
        <SignUp clickSignUp={clickSignUp} />
        <div>
          <FaBell />
        </div>
      </div>
    </div>
  );
};

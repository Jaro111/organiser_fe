import React from "react";
import { useState, useContext } from "react";
import { userContext } from "../../common/context";
import { SignUp } from "../SignUp/SignUp";
import { FaBell } from "react-icons/fa6";
import { ModalSignUp } from "../SignUp/ModalSignUp/ModalSignUp";

import "./Navbar.css";

export const Navbar = ({ owner, setOwner }) => {
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
          <ModalSignUp
            setOwner={setOwner}
            setIsmodalSignInVisible={setIsmodalSignInVisible}
          />
        )}
      </div>
      <div className="rightNav">
        <SignUp clickSignUp={clickSignUp} owner={owner} setOwner={setOwner} />
        <div>
          <FaBell />
        </div>
      </div>
    </div>
  );
};

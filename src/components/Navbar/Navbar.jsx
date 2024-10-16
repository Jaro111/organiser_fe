import React, { useEffect } from "react";
import { useState, useContext } from "react";
import { userContext } from "../../common/context";
import { useNavigate } from "react-router-dom";
import { SignUp } from "../SignUp/SignUp";
import { FaBell } from "react-icons/fa6";
import { ModalSignUp } from "../SignUp/ModalSignUp/ModalSignUp";

import "./Navbar.css";

export const Navbar = (props) => {
  const [isModalSignInVisible, setIsmodalSignInVisible] = useState(false);

  const user = useContext(userContext).user;
  const navigate = useNavigate();

  const date = new Date();

  const clickSignUp = () => {
    setIsmodalSignInVisible(true);
  };

  const navigateToPage = (path) => {
    navigate(path);
  };

  useEffect(() => {}, [props.numberOfInv]);

  return (
    <div className="navbar-wrapper">
      <div className="leftNav">
        <p className="appName-content" onClick={() => navigateToPage("/")}>
          MULTI-USER TASK ORGANISER
        </p>
      </div>
      <div className="rightNav">
        {user.username ? (
          <p className="dateToday-content">{`${date.getDate().toString()}-${(
            date.getMonth() + 1
          ).toString()}-${date.getFullYear().toString()}`}</p>
        ) : null}

        <SignUp clickSignUp={clickSignUp} />

        {user.username ? (
          <div className="notificationIcon-wrapper">
            <FaBell
              className="notificationIcon"
              onClick={() => navigateToPage("/notifications")}
            />
            <div className="notificationIcon-conten-wrapper">
              <p className="notificationIcon-content">{props.numberOfInv}</p>
            </div>
          </div>
        ) : null}
      </div>
      {isModalSignInVisible && (
        <ModalSignUp setIsmodalSignInVisible={setIsmodalSignInVisible} />
      )}
    </div>
  );
};

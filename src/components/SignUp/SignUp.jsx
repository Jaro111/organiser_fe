import React from "react";
import { useContext, useEffect, useState } from "react";
import { UserSettings } from "../UserSettings/UserSettings";
import { userContext } from "../../common/context";
import "./SignUp.css";

export const SignUp = (props) => {
  const user = useContext(userContext).user;
  const setUser = useContext(userContext).setUser;
  const [isSettingsVisible, setIsSettingeVisible] = useState(false);

  const logOut = () => {
    setUser({});
    document.cookie =
      "jwt-token=; expires= Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  const openSettings = () => {
    setIsSettingeVisible(true);
  };

  return (
    <div className="signUp-wrapper">
      {isSettingsVisible && (
        <UserSettings setIsSettingeVisible={setIsSettingeVisible} />
      )}
      {user.username ? (
        <div className="signUpContent-wrapper">
          <p className="signUp-username-content" onClick={openSettings}>
            {user.username}
          </p>

          <p className="signUp-content" onClick={logOut}>
            Log Out
          </p>
        </div>
      ) : (
        <p className="signUp-content" onClick={props.clickSignUp}>
          Log in/Sign Up
        </p>
      )}
    </div>
  );
};

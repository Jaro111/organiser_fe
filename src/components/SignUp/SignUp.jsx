import React from "react";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../../common/context";
import "./SignUp.css";

export const SignUp = (props) => {
  const setUser = useContext(userContext).setUser;

  const logOut = () => {
    setUser({});
    props.setOwner(undefined);
    document.cookie =
      "jwt-token=; expires= Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  return (
    <div className="signUp-wrapper">
      {props.owner ? (
        <>
          <p>{props.owner}</p>
          <p className="signUp-content" onClick={logOut}>
            Log Out
          </p>
        </>
      ) : (
        <p className="signUp-content" onClick={props.clickSignUp}>
          Log in/Sign Up
        </p>
      )}
    </div>
  );
};

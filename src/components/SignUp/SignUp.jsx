import React from "react";
import "./SignUp.css";

export const SignUp = (props) => {
  return (
    <div onClick={props.clickSignUp} className="signUp-wrapper">
      <p>Log in / Sign Up</p>
    </div>
  );
};

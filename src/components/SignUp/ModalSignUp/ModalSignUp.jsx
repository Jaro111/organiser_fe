import React from "react";
import { useState } from "react";
import { LogIn } from "../Login/Login";
import { Register } from "../Register/Register";
import { IoMdClose } from "react-icons/io";
import "./ModalSignUp.css";

export const ModalSignUp = (props) => {
  const setIsmodalSignInVisible = props.setIsmodalSignInVisible;
  const setOwner = props.setOwner;
  return (
    <div className="modalSignUp-wrapper">
      <div className="modalSignUpWindow">
        <div className="modalSignUpClose-wrapper">
          <IoMdClose onClick={() => setIsmodalSignInVisible(false)} />
        </div>
        <div className="modalSignUpContent-wrapper">
          <LogIn setIsmodalSignInVisible={setIsmodalSignInVisible} />
          <Register />
        </div>
      </div>
    </div>
  );
};

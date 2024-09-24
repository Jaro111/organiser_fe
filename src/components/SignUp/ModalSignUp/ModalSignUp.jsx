import React from "react";
import { useState } from "react";
import { LogIn } from "../Login/Login";
import { Register } from "../Register/Register";
import { IoMdClose } from "react-icons/io";
import "./ModalSignUp.css";

export const ModalSignUp = (props) => {
  return (
    <div className="modalSignUp-wrapper">
      <div className="modalSignUpWindow">
        <div className="modalSignUpClose-wrapper">
          <IoMdClose onClick={() => props.setIsmodalSignInVisible(false)} />
        </div>
        <div className="modalSignUpContent-wrapper">
          <LogIn />
          <Register />
        </div>
      </div>
    </div>
  );
};

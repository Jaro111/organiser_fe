import React from "react";
import { useState } from "react";
import { LogIn } from "../Login/Login";
import { Register } from "../Register/Register";
import { IoMdClose } from "react-icons/io";
import "./ModalSignUp.css";

export const ModalSignUp = (props) => {
  const [isLoginVisible, setIsLogInVisible] = useState(false);
  const [isRegisterVisible, setIsRegisterInVisible] = useState(false);
  const [registerMessage, setRegisterMessage] = useState(null);

  const setIsmodalSignInVisible = props.setIsmodalSignInVisible;
  const setOwner = props.setOwner;

  const logInClick = () => {
    setRegisterMessage(null);
    setIsLogInVisible(true);
    setIsRegisterInVisible(false);
  };

  const registerClick = () => {
    setRegisterMessage(null);
    setIsRegisterInVisible(true);
    setIsLogInVisible(false);
  };

  return (
    <div className="modalSignUp-wrapper">
      <div className="modalSignUpWindow">
        <div className="modalSignUpClose-wrapper">
          <IoMdClose onClick={() => setIsmodalSignInVisible(false)} />
        </div>
        <div className="modalSignUp-content-wrapper">
          <div className="loginRegister-content-wrapper">
            <p onClick={logInClick} className="moddal-content">
              Log In
            </p>
            <p className="moddal-content">/</p>
            <p className="moddal-content" onClick={registerClick}>
              Register
            </p>
          </div>
          <div className="loginRegister-form-wrapper">
            {isLoginVisible && (
              <LogIn setIsmodalSignInVisible={setIsmodalSignInVisible} />
            )}
            {isRegisterVisible && (
              <Register
                setIsLogInVisible={setIsLogInVisible}
                setIsRegisterInVisible={setIsRegisterInVisible}
                setRegisterMessage={setRegisterMessage}
              />
            )}
            <p
              style={{
                color:
                  registerMessage === "Wrong email format"
                    ? "red"
                    : "greenYellow",
              }}
              className="reqisterMessage"
            >
              {registerMessage}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from "react";
import { useState } from "react";
import { EditInput } from "./EditInput";
import { IoMdClose } from "react-icons/io";
import "./UserSettings.css";

export const UserSettings = (props) => {
  //
  const [choice, setChoice] = useState("username");
  const [choiceValue, setChoiceValue] = useState("");
  const [password, setPassword] = useState("");

  //

  const clickUsernameBth = () => {
    setChoice("username");
    setChoiceValue("");
    setPassword("");
  };
  const clickPasswordBth = () => {
    setChoice("password");
    setChoiceValue("");
    setPassword("");
  };
  const clickEmailBth = () => {
    setChoice("email");
    setChoiceValue("");
    setPassword("");
  };

  return (
    <div className="userSettings-modal-wrapper">
      <div className="userSettings-wrapper">
        <div className="userSettings-close-wrapper">
          <IoMdClose
            onClick={() => {
              props.setIsSettingeVisible(false);
            }}
            className="userSettings-close-Icon"
          />
        </div>
        <div className="userSettings-options-wrapper">
          <div className="userSettings-options-buttons-wrapper">
            <button
              className="userSettings-options-btn-username"
              onClick={clickUsernameBth}
              style={{
                backgroundColor: choice === "username" ? "black" : "white",
                color: choice === "username" ? "white" : "black",
              }}
            >
              Username
            </button>
            <button
              className="userSettings-options-btn-email"
              onClick={clickEmailBth}
              style={{
                backgroundColor: choice === "email" ? "black" : "white",
                color: choice === "email" ? "white" : "black",
              }}
            >
              Email
            </button>
            <button
              className="userSettings-options-btn-password"
              onClick={clickPasswordBth}
              style={{
                backgroundColor: choice === "password" ? "black" : "white",
                color: choice === "password" ? "white" : "black",
              }}
            >
              Passord
            </button>
          </div>
          <EditInput
            choice={choice}
            setChoice={setChoice}
            choiceValue={choiceValue}
            setChoiceValue={setChoiceValue}
            password={password}
            setPassword={setPassword}
          />
        </div>
      </div>
    </div>
  );
};

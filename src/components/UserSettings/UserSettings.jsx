import React from "react";
import { useState, useContext } from "react";
import { userContext } from "../../common/context";
import { EditInput } from "./EditInput";
import { IoMdClose } from "react-icons/io";
import "./UserSettings.css";

export const UserSettings = (props) => {
  //
  const user = useContext(userContext).user;
  const [displayDetails, setDisplayDetails] = useState(user.username);
  const [choice, setChoice] = useState("username");
  const [choiceValue, setChoiceValue] = useState("");
  const [password, setPassword] = useState("");

  //

  const clickUsernameBth = () => {
    setDisplayDetails(user.username);
    setChoice("username");
    setChoiceValue("");
    setPassword("");
    console.log(displayDetails);
  };
  const clickPasswordBth = () => {
    setDisplayDetails(user.username);
    setChoice("password");
    setChoiceValue("");
    setPassword("");
    console.log(displayDetails);
  };
  const clickEmailBth = () => {
    setDisplayDetails(user.email);
    setChoice("email");
    setChoiceValue("");
    setPassword("");
    console.log(displayDetails);
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
            displayDetails={displayDetails}
            setDisplayDetails={setDisplayDetails}
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

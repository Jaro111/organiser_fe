import React from "react";
import { emailCheck } from "../../common/emailCheck";
import { updateUser } from "../../utils/user";
import { useState, useContext, useEffect } from "react";
import { userContext } from "../../common/context";
import "./EditInput.css";

export const EditInput = (props) => {
  const {
    choice,
    setChoice,
    choiceValue,
    setChoiceValue,
    password,
    setPassword,
    setDisplayDetails,
    displayDetails,
  } = props;

  const [updateMessage, setUpdateMessage] = useState("");
  const user = useContext(userContext).user;

  const changeHandler = (e, setter, state) => {
    setter(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (choice === "email" && !emailCheck(choiceValue)) {
      setUpdateMessage(`Wrong emial format`);
      return;
    }
    const data = await updateUser(choice, choiceValue, password, user.token);
    if (data.message === "Success") {
      if (choice === "username" || choice === "email") {
        setUpdateMessage(`Successfully changed ${choice} to: ${choiceValue}`);
        setPassword("");
        setDisplayDetails(choiceValue);
        setTimeout(() => {
          setUpdateMessage("");
        }, 2000);
      } else {
        setUpdateMessage(`Successfully changed ${choice}`);
        setPassword("");
        setTimeout(() => {
          setUpdateMessage("");
        }, 2000);
      }
    } else if (data.message === "Wrong Password") {
      setUpdateMessage(data.message);
      setTimeout(() => {
        setUpdateMessage("");
      }, 2000);
    }
  };

  return (
    <div className="editInput-wrapper">
      <p className="displayDetailsContent">{displayDetails}</p>
      <p>
        Change <span className="editInput-content-choice">{choice}</span>
      </p>
      <form className="editInput-form" onSubmit={handleSubmit}>
        <input
          className="editInput-input"
          placeholder={
            choice === "Password"
              ? `New ${choice}`
              : `New ${choice.slice(0, 1).toUpperCase()}${choice.slice(
                  1,
                  choice.length
                )}`
          }
          onChange={(e) => changeHandler(e, setChoiceValue, choiceValue)}
          type={choice === "password" ? "password" : "text"}
          value={choiceValue}
        ></input>
        <input
          className="editInput-input"
          placeholder={choice === "password" ? `Current ${choice}` : "password"}
          onChange={(e) => changeHandler(e, setPassword, password)}
          type="password"
          value={password}
        ></input>
        <button type="submit" className="editInput-confirm-btn">
          Confirm
        </button>
      </form>

      <p className="editInput-input-message-content">{updateMessage}</p>
    </div>
  );
};

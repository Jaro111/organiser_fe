import React, { useReducer } from "react";
import { useContext } from "react";
import { userContext } from "../../../common/context";
import { logIn } from "../../../utils/user";
import { useState } from "react";

export const LogIn = (props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const setUser = useContext(userContext).setUser;

  const changeHandler = (e, setter, state) => {
    setter(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await logIn(username, password);
    console.log(data);
    setUser(data);
    props.setIsmodalSignInVisible(false);
  };

  return (
    <div className="logIn-wrapper">
      <form onSubmit={handleSubmit}>
        <input
          placeholder="userName"
          onChange={(e) => changeHandler(e, setUsername, username)}
        ></input>
        <input
          placeholder="password"
          onChange={(e) => changeHandler(e, setPassword, password)}
        ></input>
        <button type="submit"> Log In</button>
      </form>
    </div>
  );
};
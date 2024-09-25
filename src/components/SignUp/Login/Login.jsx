import React from "react";
import { logIn } from "../../../utils/user";
import { useState } from "react";

export const LogIn = (props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const changeHandler = (e, setter, state) => {
    setter(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await logIn(username, password);
    console.log(data);
    props.setIsmodalSignInVisible(false);
    props.setOwner(data.username);
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

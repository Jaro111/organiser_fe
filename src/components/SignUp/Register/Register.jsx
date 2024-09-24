import React, { useState } from "react";
import { signUp } from "../../../utils/user";
import { useContext } from "react";
import { userContext } from "../../../common/context";
import "./Register.css";

export const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const changeHandler = (e, setter, state) => {
    setter(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await signUp(username, email, password);
    console.log(data);
  };

  return (
    <div className="register-wrapper">
      <form onSubmit={handleSubmit}>
        <input
          placeholder="user name"
          onChange={(e) => changeHandler(e, setUsername, username)}
        ></input>
        <input
          placeholder="email"
          onChange={(e) => changeHandler(e, setEmail, email)}
        ></input>
        <input
          placeholder="password"
          onChange={(e) => changeHandler(e, setPassword, password)}
        ></input>
        <button type="submit"> Register</button>
      </form>
    </div>
  );
};

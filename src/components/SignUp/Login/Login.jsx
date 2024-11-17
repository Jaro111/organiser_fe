import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../../common/context";
import { logIn } from "../../../utils/user";
import { useState } from "react";
import "./Login.css";

export const LogIn = (props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const setUser = useContext(userContext).setUser;
  const navigate = useNavigate();

  const changeHandler = (e, setter, state) => {
    setter(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await logIn(username, password);
    console.log(data);
    setUser(data);
    props.setIsmodalSignInVisible(false);
    navigate("/");
  };

  return (
    <div className="logIn-wrapper">
      <form className="logIn-form" onSubmit={handleSubmit}>
        <div className="logIn-input-wrapper">
          <input
            placeholder="userName"
            onChange={(e) => changeHandler(e, setUsername, username)}
          ></input>
          <input
            placeholder="password"
            onChange={(e) => changeHandler(e, setPassword, password)}
            type="password"
          ></input>
          <a href="/resetPassordForm">
            <p className="forgotPassword-content">Forgot password</p>
          </a>
        </div>

        <button className="signUp-btn" type="submit">
          {" "}
          Log In
        </button>
      </form>
    </div>
  );
};

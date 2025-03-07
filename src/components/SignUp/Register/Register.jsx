import React, { useState } from "react";
import { emailCheck } from "../../../common/emailCheck";
import { signUp } from "../../../utils/user";
import { useContext } from "react";
import { userContext } from "../../../common/context";
import "./Register.css";

export const Register = (props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const changeHandler = (e, setter, state) => {
    setter(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await signUp(username, email, password);
    console.log(data.message);

    if (data.message.includes("username") || data.message.includes("email")) {
      props.setRegisterMessage("Username or email already registered");
    }
    if (emailCheck(email)) {
      if (data.message === "User created") {
        props.setIsLogInVisible(false);
        props.setIsRegisterInVisible(false);
        props.setRegisterMessage("Succesfull Register. You can Log In");
      }
    } else {
      props.setRegisterMessage("Wrong email format");
    }
  };

  return (
    <div className="register-wrapper">
      <form className="register-form-wrapper" onSubmit={handleSubmit}>
        <div className="register-input-wrapper">
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
            type="password"
          ></input>
        </div>

        <button className="signUp-btn" type="submit">
          {" "}
          Register
        </button>
      </form>
    </div>
  );
};

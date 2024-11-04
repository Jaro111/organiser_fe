import React from "react";
import { resetPassword } from "../../utils/user";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./resetPasswordRequestForm.css";

export const ResetPasswordRequestForm = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPasssword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [resetMessage, setResetMessage] = useState("");

  const handleChange = (e, setter) => {
    setter(e.target.value);
  };

  const confirmReset = async (e) => {
    e.preventDefault();
    console.log(token);
    if (password === passwordConfirm) {
      const data = await resetPassword(token, password);
      setResetMessage(data.message);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      setResetMessage("Passwords doesn't match");
    }
  };

  return (
    <div className="ResetPasswordRequestForm-wrapper">
      {resetMessage === "Password has been changed" ? (
        <>
          <p>{resetMessage}</p>
          <p>You can Log in</p>
        </>
      ) : (
        <>
          <input
            placeholder="New password"
            onChange={(e) => handleChange(e, setPasssword)}
            type="password"
          ></input>
          <input
            type="password"
            placeholder="Confirm new password"
            onChange={(e) => handleChange(e, setPasswordConfirm)}
          ></input>
          <button onClick={(e) => confirmReset(e)}>Confirm</button>
          <p>{resetMessage}</p>
        </>
      )}
    </div>
  );
};

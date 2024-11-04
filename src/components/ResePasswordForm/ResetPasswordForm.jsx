import React from "react";
import { useState } from "react";
import { sendResetLink } from "../../utils/user";
import "./ResetPasswordForm.css";

export const ResetPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [sendMessage, setSendMessage] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const confirmSend = async (e) => {
    e.preventDefault();
    const data = await sendResetLink(email);
    setSendMessage(data.message);
  };

  return (
    <div className="resetPassword-wrapper">
      <p>Send reset link</p>
      <input onChange={(e) => handleChange(e)} placeholder="email"></input>
      <button onClick={(e) => confirmSend(e)}>Send</button>
      <p>{sendMessage}</p>
    </div>
  );
};

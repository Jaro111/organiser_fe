import React from "react";
import "./AddToListPanel.css";

export const AddToListPanel = () => {
  return (
    <div className="addToListPanel-wrapper">
      <input className="addToListPanel-input" placeholder="item name"></input>
      <button className="addToListPanel-btn">+</button>
    </div>
  );
};

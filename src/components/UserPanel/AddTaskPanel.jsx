import React from "react";
import "./AddTaskPanel.css";

export const AddTaskPanel = () => {
  return (
    <div className="addTaskPanel-wrapper">
      <input className="newTask-input" placeholder="New Task"></input>
      <button className="addTask-btn">Add</button>
    </div>
  );
};

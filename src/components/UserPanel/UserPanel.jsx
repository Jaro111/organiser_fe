import React from "react";
import { AddTaskPanel } from "./AddTaskPanel";
import { TasksPanel } from "./TasksPanel";

import "./UserPanel.css";

export const UserPanel = (props) => {
  const tasks = props.tasks;
  const userId = props.userId;
  return (
    <div className="userPanel-wrapper">
      <button className="username-btn">
        <p>{props.username}</p>
      </button>
      <>
        <AddTaskPanel />
        <TasksPanel tasks={tasks} userId={userId} />
      </>
    </div>
  );
};

import React from "react";
import { useState, useEffect } from "react";
import { AddTaskPanel } from "./AddTaskPanel";
import { TasksPanel } from "./TasksPanel";

import "./UserPanel.css";

export const UserPanel = (props) => {
  const tasks = props.tasks;
  const userId = props.userId;
  const jobId = props.jobId;
  const taskLength = props.taskLength;
  const setTaskLength = props.setTaskLength;
  const users = props.users;
  const tempTaskUser = props.tempTaskUser;
  const setTempTaskUser = props.setTempTaskUser;

  const colorFunc = () => {
    const colors = ["pink", "orange", "lightgrey", "lightblue", "lightviolet"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    return randomColor;
  };

  colorFunc();

  return (
    <div className="userPanel-wrapper">
      <button
        style={{
          backgroundColor:
            userId === props.owner ? " rgb(6, 185, 6)" : colorFunc(),
        }}
        className="username-btn"
      >
        <p>{props.username}</p>
      </button>
      <>
        <AddTaskPanel
          jobId={jobId}
          userId={userId}
          taskLength={taskLength}
          setTaskLength={setTaskLength}
          tasks={tasks}
        />

        <TasksPanel
          tasks={tasks}
          userId={userId}
          users={users}
          jobId={jobId}
          taskLength={taskLength}
          setTaskLength={setTaskLength}
          tempTaskUser={tempTaskUser}
          setTempTaskUser={setTempTaskUser}
          taskStatus={props.taskStatus}
          setTaskStatus={props.setTaskStatus}
        />
      </>
    </div>
  );
};

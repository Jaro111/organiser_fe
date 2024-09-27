import React from "react";
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

  return (
    <div className="userPanel-wrapper">
      <button className="username-btn">
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
        />
      </>
    </div>
  );
};

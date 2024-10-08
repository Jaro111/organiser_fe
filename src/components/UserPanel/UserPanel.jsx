import React from "react";
import { useState, useEffect } from "react";
import { AddTaskPanel } from "./AddTaskPanel";
import { TasksPanel } from "./TasksPanel";
import { BsCart4 } from "react-icons/bs";

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
      <div className="userPanel-btnCart-wrapper">
        <div className="userPanel-btn-wrapper">
          <button
            style={{
              backgroundColor: props.colors[userId],
              // userId === props.owner ? " rgb(6, 185, 6)" : colorFunc(),
            }}
            className="username-btn"
          >
            <p>{props.username}</p>
          </button>
        </div>
        <div className="userPanel-icon-wrapper">
          <BsCart4
            onClick={() => {
              props.setIsshopingModalVisible(!props.isShopingModalVisible);
            }}
            className="cartIcon"
          />
        </div>
      </div>

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

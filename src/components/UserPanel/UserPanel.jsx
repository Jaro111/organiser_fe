import React from "react";
import { useContext, useState } from "react";
import { removeFromJob } from "../../utils/job";
import { userContext } from "../../common/context";
import { AddTaskPanel } from "./AddTaskPanel";
import { TasksPanel } from "./TasksPanel";
import { BsCart4 } from "react-icons/bs";
import { RiDeleteBin2Line } from "react-icons/ri";

import "./UserPanel.css";

export const UserPanel = (props) => {
  const user = useContext(userContext).user;
  //
  const [deleteUserConfirmation, setDeleteUserConfirmation] = useState(false);
  //
  const tasks = props.tasks;
  const userId = props.userId;
  const jobId = props.jobId;
  const taskLength = props.taskLength;
  const setTaskLength = props.setTaskLength;
  const users = props.users;
  const tempTaskUser = props.tempTaskUser;
  const setTempTaskUser = props.setTempTaskUser;
  //
  const deleteUserFunc = async () => {
    const data = await removeFromJob(jobId, userId, user.token);
    console.log(data);
    setDeleteUserConfirmation(!deleteUserConfirmation);
  };

  return (
    <div className="userPanel-wrapper">
      <div className="userPanel-btnCart-wrapper">
        <div className="userPanel-btn-wrapper">
          <button
            style={{
              backgroundColor: props.colors[userId],
            }}
            className="username-btn"
          >
            <p>{props.username}</p>
          </button>
          {userId !== props.owner && user.id === props.owner ? (
            deleteUserConfirmation ? (
              <div className="deleteUserConfirmation-wrapper">
                <p className="deleteUserConfirmation-content">Sure?</p>
                <p
                  className="deleteUserConfirmation-content-YN"
                  onClick={deleteUserFunc}
                >
                  Y
                </p>
                <p className="deleteUserConfirmation-content">/</p>
                <p
                  className="deleteUserConfirmation-content-YN"
                  onClick={() =>
                    setDeleteUserConfirmation(!deleteUserConfirmation)
                  }
                >
                  N
                </p>
              </div>
            ) : (
              <RiDeleteBin2Line
                onClick={() =>
                  setDeleteUserConfirmation(!deleteUserConfirmation)
                }
                className="userPanel-deleteUser-icon"
              />
            )
          ) : null}
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

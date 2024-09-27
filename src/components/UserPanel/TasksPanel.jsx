import React, { useState } from "react";
import { FaRegWindowClose } from "react-icons/fa";
import { UpdateTaskModal } from "./updateTaskModal";
import "./TasksPanel.css";

export const TasksPanel = (props) => {
  //
  const [isTaskModalVisible, setIsTaskModalVisible] = useState(false);
  const [tempTask, setTempTask] = useState({});
  const taskClick = (item) => {
    setIsTaskModalVisible(!isTaskModalVisible);
    setTempTask(item);
  };
  const users = props.users;
  const userId = props.userId;
  const jobId = props.jobId;
  const tempTaskUser = props.tempTaskUser;
  const setTempTaskUser = props.setTempTaskUser;

  return (
    <div className="taskPanel-wrappeer">
      {props.tasks.length > 0
        ? props.tasks.map((item, index) => {
            if (item.userId === props.userId) {
              return (
                <p
                  onClick={() => taskClick(item)}
                  className="taskTitle-content"
                  key={index}
                >
                  {item.taskTitle}
                </p>
              );
            }
          })
        : null}
      {isTaskModalVisible && (
        <UpdateTaskModal
          setIsTaskModalVisible={setIsTaskModalVisible}
          tempTask={tempTask}
          users={users}
          userId={userId}
          jobId={jobId}
          tempTaskUser={tempTaskUser}
          setTempTaskUser={setTempTaskUser}
          isTaskModalVisible={isTaskModalVisible}
        />
      )}
    </div>
  );
};

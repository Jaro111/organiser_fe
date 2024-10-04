import React, { useState, useContext, useEffect } from "react";
import { userContext } from "../../common/context";
import { updateTaskStatus } from "../../utils/task";
import { deleteTask } from "../../utils/task";
import { UpdateTaskModal } from "./updateTaskModal";
import { IoArrowRedo } from "react-icons/io5";
import { ImBin } from "react-icons/im";
import "./TasksPanel.css";

export const TasksPanel = (props) => {
  const user = useContext(userContext).user;
  //
  const [isTaskModalVisible, setIsTaskModalVisible] = useState(false);
  const [tempTask, setTempTask] = useState({});

  //

  const users = props.users;
  const userId = props.userId;
  const jobId = props.jobId;
  const tempTaskUser = props.tempTaskUser;
  const setTempTaskUser = props.setTempTaskUser;

  //

  //
  const taskClick = (item) => {
    console.log(item);
    if (!item.status) setIsTaskModalVisible(!isTaskModalVisible);
    setTempTask(item);
  };
  //
  const changeTaskStatus = async (item) => {
    props.setTaskStatus(item.status);
    const data = await updateTaskStatus(jobId, item._id, user.token);
    console.log(data);
    props.setTaskStatus(data.task.status);
  };

  const removeTask = async (item) => {
    const data = await deleteTask(jobId, item._id, user.token);
    console.log(data);
    props.setTaskLength(props.tasks.length + -1);
  };

  return (
    <div className="taskPanel-wrappeer">
      {props.tasks.length > 0
        ? props.tasks.map((item, index) => {
            if (item.userId === props.userId) {
              return (
                <div key={index} className="task-wrapper">
                  <div className="taskItems-wrapper">
                    <p
                      className="taskPanelTitle-content"
                      style={{
                        textDecoration: !item.status ? "none" : "line-through",
                        fontWeight: !item.status ? "700" : "500",
                        color: !item.status ? "green" : "red",
                      }}
                      onClick={() => changeTaskStatus(item)}
                    >
                      {item.taskTitle}
                    </p>
                  </div>
                  {item.in}
                  <div className="taskItems-wrapper">
                    <IoArrowRedo
                      className="arrowTask-Icon"
                      onClick={() => taskClick(item)}
                    />
                  </div>
                  {/* <div className="taskItems-wrapper">
                    <FaCheckCircle className="checkTask-icon" />
                  </div> */}
                  <div className="taskItems-wrapper">
                    <ImBin
                      className="binTask-icon"
                      onClick={() => removeTask(item)}
                    />
                  </div>
                </div>
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

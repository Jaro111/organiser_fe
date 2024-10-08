import React, { useState } from "react";
import { addTask } from "../../utils/task";
import { pressEnter } from "../../common";
import { useContext } from "react";
import { userContext } from "../../common/context";

import "./AddTaskPanel.css";

export const AddTaskPanel = (props) => {
  //

  const user = useContext(userContext).user;
  const [taskTitle, setTaskTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setTaskTitle(e.target.value);
  };

  //   const fetchAddTask = async () => {

  //   };

  const clickAdd = async (e) => {
    if (taskTitle === "") {
      console.log("click");
    } else {
      const data = await addTask(
        props.userId,
        props.jobId,
        taskTitle,
        user.token
      );
      props.setTaskLength(props.tasks.length + 1);
      setTaskTitle("");
    }
  };

  return (
    <div className="addTaskPanel-wrapper">
      <input
        className="newTask-input"
        placeholder="New Task"
        onChange={(e) => handleSubmit(e)}
        value={taskTitle}
        onKeyDown={(e) => pressEnter(e, clickAdd)}
      ></input>
      <button className="addTask-btn" onClick={(e) => clickAdd()}>
        +
      </button>
    </div>
  );
};

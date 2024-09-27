import React from "react";
import "./TasksPanel.css";

export const TasksPanel = (props) => {
  //

  const editTask = (item) => {
    console.log(item.taskTitle);
  };

  return (
    <div className="taskPanel-wrappeer">
      {props.tasks.length > 0 ? (
        props.tasks.map((item, index) => {
          if (item.userId === props.userId) {
            return (
              <p
                onClick={() => editTask(item)}
                className="taskTitle-content"
                key={index}
              >
                {item.taskTitle}
              </p>
            );
          }
        })
      ) : (
        <p>Loading...</p>
      )}
      <p></p>
    </div>
  );
};

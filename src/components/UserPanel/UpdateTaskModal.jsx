import React from "react";
import { useContext } from "react";
import { userContext } from "../../common/context";
import { updateTask } from "../../utils/task";
import "./UpdateTaskModal.css";
import { FaRegWindowClose } from "react-icons/fa";

export const UpdateTaskModal = (props) => {
  const user = useContext(userContext).user;
  //
  const reassignTask = async (item) => {
    //
    const data = await updateTask(
      props.jobId,
      props.tempTask._id,
      "userId",
      item._id,
      user.token
    );
    props.setTempTaskUser(data.task);
    props.setIsTaskModalVisible(false);
  };

  return (
    <div className="updateTaskModal-wrapper">
      <div className="updateTaskModal-close-wrapper">
        <FaRegWindowClose onClick={() => props.setIsTaskModalVisible(false)} />;
      </div>
      <div className="updateTaskModal-content-wrapper">
        <p>{props.tempTask.taskTitle}</p>
        {/* <p className="updateModalContent">Rename</p> */}
        <p className="updateModalContent">{"-->"}</p>
        {props.users.map((item, index) => {
          if (props.userId !== item._id) {
            return (
              <p
                key={index}
                onClick={() => reassignTask(item)}
                className="updateModalContent-title"
              >
                {item.username}
              </p>
            );
          }
        })}
      </div>
    </div>
  );
};

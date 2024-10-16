import React from "react";
import { deleteJob } from "../../utils/job";
import { removeFromJob } from "../../utils/job";
import { useState, useContext } from "react";
import { userContext } from "../../common/context";
import { RiDeleteBin2Line } from "react-icons/ri";
import { IoMdExit } from "react-icons/io";
import "./DeleteJobPanel.css";

export const DeleteJobPanel = (props) => {
  //
  const user = useContext(userContext).user;
  const [deleteJobConfirmation, setDeleteJobConfirmation] = useState(false);
  //
  const deleteOptionsFunc = () => {
    setDeleteJobConfirmation(!deleteJobConfirmation);
  };
  //
  const deleteJobFunc = async () => {
    const data = await deleteJob(user.token, props.jobId);
    console.log(data);
    if (data.jobs.length > 0) {
      props.setMainJobId(data.jobs[0]._id);
      console.log(props.jobsLength);
      props.setJobsLength(props.jobsLength - 1);
      setDeleteJobConfirmation(!deleteJobConfirmation);
    } else {
      setDeleteJobConfirmation(!deleteJobConfirmation);
      props.setMainJobId("");
    }
  };

  const leaveJobFunc = async () => {
    const data = await removeFromJob(props.jobId, user.id, user.token);
    console.log(data);
    if (data.jobs.length > 0) {
      props.setMainJobId(data.jobs[0]._id);
      console.log(props.mainJonId);
      setDeleteJobConfirmation(!deleteJobConfirmation);
    } else {
      setDeleteJobConfirmation(!deleteJobConfirmation);
      props.setMainJobId("");
    }
  };

  //
  return (
    <div className="deleteJobPanel-wrapper">
      {deleteJobConfirmation ? (
        <div className="deleteJobConfirmation-wrapper">
          <p className="deleteJobConfirmation-content">Sure?</p>
          {user.id === props.owner ? (
            <p
              className="deleteJobConfirmation-content-YN"
              onClick={deleteJobFunc}
            >
              Y
            </p>
          ) : (
            <p
              className="deleteJobConfirmation-content-YN"
              onClick={leaveJobFunc}
            >
              Y
            </p>
          )}

          <p className="deleteJobConfirmation-content">/</p>
          <></>
          <p
            className="deleteJobConfirmation-content-YN"
            onClick={deleteOptionsFunc}
          >
            N
          </p>
        </div>
      ) : user.id === props.owner ? (
        <RiDeleteBin2Line
          className="deleteJob-bin-icon"
          onClick={deleteOptionsFunc}
        />
      ) : (
        <IoMdExit className="deleteJob-bin-icon" onClick={deleteOptionsFunc} />
      )}
    </div>
  );
};

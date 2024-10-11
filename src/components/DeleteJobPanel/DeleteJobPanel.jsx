import React from "react";

import { deleteJob } from "../../utils/job";
import { useState, useContext } from "react";
import { userContext } from "../../common/context";
import { RiDeleteBin2Line } from "react-icons/ri";
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
    props.setJobsLength(props.jobsLength - 1);
    props.setMainJobId(data.jobs[0]._id);
    setDeleteJobConfirmation(!deleteJobConfirmation);
  };

  //
  return (
    <div className="deleteJobPanel-wrapper">
      {deleteJobConfirmation ? (
        <div className="deleteJobConfirmation-wrapper">
          <p className="deleteJobConfirmation-content">Sure?</p>
          <p
            className="deleteJobConfirmation-content-YN"
            onClick={deleteJobFunc}
          >
            Y
          </p>
          <p className="deleteJobConfirmation-content">/</p>
          <p
            className="deleteJobConfirmation-content-YN"
            onClick={deleteOptionsFunc}
          >
            N
          </p>
        </div>
      ) : (
        <RiDeleteBin2Line
          className="deleteJob-bin-icon"
          onClick={deleteOptionsFunc}
        />
      )}
    </div>
  );
};

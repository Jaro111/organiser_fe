import React from "react";
import { addNewJob } from "../../utils/job";
import { userContext } from "../../common/context";
import { useState, useContext } from "react";

import "./JobTabs.css";

export const JobTabs = (props) => {
  const user = useContext(userContext).user;

  const changeHandler = (e) => {
    e.preventDefault();
    const title = e.target.value;
    props.setNewJobTitle(title);
  };

  const addJob = async () => {
    const newJob = await addNewJob(user.token, props.newJobTitle);
    props.setJobsLength(props.jobs.length + 1);
  };

  const changeJob = (item) => {
    props.setMainJobId(item._id);
  };

  return (
    <div className="jobTab-wrapper">
      {props.jobs.length > 0 ? (
        <>
          <div className="jobTabs-Wrapper">
            {props.jobs.map((item, index) => {
              return (
                <button onClick={() => changeJob(item)} key={index}>
                  {item.title}
                </button>
              );
            })}
          </div>

          <div className="addJob-wrapper">
            <input
              className="newJobInput"
              onChange={(e) => changeHandler(e)}
              placeholder="new Job Title"
            ></input>
            <button className="addJobBtn" onClick={addJob}>
              ADD
            </button>
          </div>
        </>
      ) : (
        <div className="addJob-wrapper">
          <input
            className="newJobInput"
            onChange={(e) => changeHandler(e)}
            placeholder="new Job Title"
          ></input>
          <button className="addJobBtn" onClick={addJob}>
            ADD
          </button>
        </div>
      )}
    </div>
  );
};

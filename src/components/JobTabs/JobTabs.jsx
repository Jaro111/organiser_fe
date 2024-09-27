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
    if (props.newJobTitle === "") {
      console.log("click");
    } else {
      const newJob = await addNewJob(user.token, props.newJobTitle);
      props.setJobsLength(props.jobs.length + 1);
    }
  };

  // const pressEnter = (e) => {
  //   if (e.keyCode === 13 || e.which === 13) {
  //     console.log("enter");
  //   }
  // };

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
              onKeyPress={(e) => console.log(e)}
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
            onKeyPress={(e) => console.log(e)}
          ></input>
          <button className="addJobBtn" onClick={addJob}>
            ADD
          </button>
        </div>
      )}
    </div>
  );
};

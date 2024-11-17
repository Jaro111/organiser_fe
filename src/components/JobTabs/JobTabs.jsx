import React from "react";
import { addNewJob } from "../../utils/job";
import Cookies from "js-cookie";
import { pressEnter } from "../../common";
import { userContext } from "../../common/context";
import { useState, useContext, useEffect } from "react";

import "./JobTabs.css";

export const JobTabs = (props) => {
  const user = useContext(userContext).user;
  const [activeBorder, setActiveBorder] = useState(false);

  const dateFunc = (item) => {
    const creationDate = new Date(item.createdAt);
    const stringDate = `${creationDate.getDate()}-${
      creationDate.getMonth() + 1
    }-${creationDate.getFullYear()}`;
    return stringDate;
  };

  const changeHandler = (e) => {
    e.preventDefault();
    const title = e.target.value;
    props.setNewJobTitle(title);
  };

  const addJob = async () => {
    if (props.newJobTitle === "") {
      console.log("");
    } else {
      const newJob = await addNewJob(user.token, props.newJobTitle);
      props.setJobsLength(props.jobsLength + 1);
      props.setNewJobTitle("");
      props.setMainJobId(newJob.job._id);
      window.matchMedia;
    }
  };

  const changeJob = (item) => {
    props.setMainJobId(item._id);
    setActiveBorder(!activeBorder);
    Cookies.set("mainJobId", item._id, { expires: 7, path: "/" });
  };

  useEffect(() => {
    const mainJobCookie = Cookies.get("mainJobId");
    if (props.jobs.length > 0) {
      if (
        props.jobData.includes(mainJobCookie) &&
        props.jobs[0]._id !== mainJobCookie
      ) {
        props.setMainJobId(props.jobs[0]._id);
      }
    } else {
      props.setMainJobId("");
    }
  }, [props.jobData, props.jobDeleteData]);

  return (
    <div className="jobTab-wrapper">
      {props.jobs.length > 0 && props.mainJobId.length > 0 ? (
        <>
          <div className="jobTabs-wrapper">
            {props.jobs.map((item, index) => {
              return (
                <div className="jobTab-btn-content-wrapper" key={index}>
                  <div
                    className="jobTab-btn-wrapper"
                    style={{
                      border:
                        item._id === props.mainJobId
                          ? "7px solid greenyellow"
                          : "5px solid rgb(110, 129, 235)",
                    }}
                  >
                    <button
                      className="jobTab-btn"
                      onClick={() => changeJob(item)}
                    >
                      {item.title}
                    </button>
                  </div>

                  <p className="job-creationDate-content">{dateFunc(item)}</p>
                </div>
              );
            })}
          </div>

          <div className="addJob-wrapper">
            <input
              className="newJobInput"
              onChange={(e) => changeHandler(e)}
              placeholder="new Job Title"
              onKeyDown={(e) => pressEnter(e, addJob)}
              value={props.newJobTitle}
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
            onKeyDown={(e) => pressEnter(e, addJob)}
            value={props.newJobTitle}
          ></input>
          <button className="addJobBtn" onClick={addJob}>
            ADD
          </button>
        </div>
      )}
    </div>
  );
};

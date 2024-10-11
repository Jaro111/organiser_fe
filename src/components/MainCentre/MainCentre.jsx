import React from "react";
import { getAllJobs } from "../../utils/job";
import { getInvitations } from "../../utils/job";
import { useState, useEffect, useContext } from "react";
import { userContext } from "../../common/context";
import { JobTabs } from "../JobTabs/JobTabs";
import { JobCentre } from "../JobCentre/JobCentre";
import "./MainCentre.css";
import { io } from "socket.io-client";

export const MainCentre = (props) => {
  //
  const user = useContext(userContext).user;
  const [newJobTitle, setNewJobTitle] = useState("");
  const [jobsLength, setJobsLength] = useState(0);
  const [mainJobId, setMainJobId] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobs, setJobs] = useState([]);

  const checkInvitations = async () => {
    const data = await getInvitations(user.token, user.id);
    props.setNumberOfInv(data.length);
  };

  const fetchJobs = async () => {
    const data = await getAllJobs(user.token);
    setJobs(data);
    if (data.length > 0) {
      if (mainJobId.length === 0) {
        setTimeout(() => {
          setMainJobId(data[0]._id);
        }, 1000);
      }
    }
    checkInvitations();
  };
  // tempJobData
  const [jobData, setJobData] = useState([]);
  const url = import.meta.env.VITE_URL;

  useEffect(() => {
    //
    fetchJobs();
    //

    const socket = io(url);
    //

    socket.on("updateJob", (updatedJob) => {
      setJobData((prevJobs) =>
        prevJobs.map((job) =>
          job._id === updatedJob._id ? { ...job, ...updatedJob } : job
        )
      );
    });
    return () => {
      socket.disconnect(); // Clean up when component unmounts
    };
  }, [jobsLength, jobTitle, jobData, props.numberOfInv]);

  return (
    <div className="mainCentre-wrapper">
      <div className="jobs-wrapper">
        <JobTabs
          newJobTitle={newJobTitle}
          setNewJobTitle={setNewJobTitle}
          jobsLength={jobsLength}
          setJobsLength={setJobsLength}
          mainJobId={mainJobId}
          setMainJobId={setMainJobId}
          jobs={jobs}
          numberOfInv={props.numberOfInv}
        />
      </div>

      <JobCentre
        mainJobId={mainJobId}
        jobTitle={jobTitle}
        setJobTitle={setJobTitle}
        jobsLength={jobsLength}
        setJobsLength={setJobsLength}
        setMainJobId={setMainJobId}
      />
    </div>
  );
};

import React from "react";
import { getAllJobs } from "../../utils/job";
import { useState, useEffect, useContext } from "react";
import { userContext } from "../../common/context";
import { JobTabs } from "../JobTabs/JobTabs";
import "./MainCentre.css";

export const MainCentre = () => {
  //
  const user = useContext(userContext).user;
  const [newJobTitle, setNewJobTitle] = useState("");
  const [jobsLength, setJobsLength] = useState(0);
  const [mainJobId, setMainJobId] = useState("");
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    const data = await getAllJobs(user.token);
    setJobsLength(data.jobsLength);
    console.log(data);
    setJobs(data);
  };

  useEffect(() => {
    fetchJobs();
  }, [jobsLength]);

  return (
    <div className="mainCentre-wrapper">
      <div className="jobs-wrapper">
        <JobTabs
          newJobTitle={newJobTitle}
          setNewJobTitle={setNewJobTitle}
          jobsLength={jobsLength}
          setJobsLength={setJobsLength}
          setMainJobId={setMainJobId}
          jobs={jobs}
        />
      </div>

      <p>{mainJobId}</p>
    </div>
  );
};

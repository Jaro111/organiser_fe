import React from "react";
import { getAllJobs } from "../../utils/job";
import { useState, useEffect, useContext } from "react";
import { userContext } from "../../common/context";
import { JobTabs } from "../JobTabs/JobTabs";
import { JobCentre } from "../JobCentre/JobCentre";
import "./MainCentre.css";

export const MainCentre = () => {
  //
  const user = useContext(userContext).user;
  const [newJobTitle, setNewJobTitle] = useState("");
  const [jobsLength, setJobsLength] = useState(0);
  const [mainJobId, setMainJobId] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobs, setJobs] = useState([]);

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
  };

  useEffect(() => {
    fetchJobs();
  }, [jobsLength, jobTitle]);

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

      <JobCentre
        mainJobId={mainJobId}
        jobTitle={jobTitle}
        setJobTitle={setJobTitle}
      />
    </div>
  );
};

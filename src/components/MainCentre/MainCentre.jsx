import React from "react";
import Cookies from "js-cookie";
import { connectSocket, disconnectSocket } from "../../common/socket";
import { getAllJobs } from "../../utils/job";
import { getInvitations } from "../../utils/job";
import { useState, useEffect, useContext } from "react";
import { userContext } from "../../common/context";
import { JobTabs } from "../JobTabs/JobTabs";
import { JobCentre } from "../JobCentre/JobCentre";
import "./MainCentre.css";

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
    const mainJobCookie = Cookies.get("mainJobId");
    setJobs(data);
    const jobsArray = [];
    data.map((job) => {
      jobsArray.push(job._id);
    });

    if (data.length > 0) {
      if (mainJobId.length === 0) {
        setTimeout(() => {
          if (mainJobCookie && jobsArray.includes(mainJobCookie)) {
            setMainJobId(mainJobCookie);
          } else {
            setMainJobId(data[0]._id);
          }
        }, 1000);
      }
    }
    checkInvitations();
  };
  // tempJobData
  const [jobData, setJobData] = useState([]);
  const url = import.meta.env.VITE_URL;

  useEffect(() => {
    const socket = connectSocket(url, user.userId);

    //
    socket.on("deleteJob", (jobId) => {
      const newArray = [];
      newArray.push(jobId.jobId);
      setJobData(newArray);
    });
    fetchJobs();

    return () => {
      socket.off("deleteJob");
      // disconnectSocket(); // Clean up when component unmounts
    };
  }, [jobsLength, jobTitle, jobData, props.numberOfInv, mainJobId]);

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
          const
          numberOfInv={props.numberOfInv}
          jobData={jobData}
          setJobData={setJobData}
        />
      </div>

      <JobCentre
        mainJobId={mainJobId}
        jobTitle={jobTitle}
        setJobTitle={setJobTitle}
        jobsLength={jobsLength}
        setJobsLength={setJobsLength}
        setMainJobId={setMainJobId}
        jobData={jobData}
        setJobData={setJobData}
      />
    </div>
  );
};

import React from "react";
import { getJobDetils } from "../../utils/job";
import { useState, useEffect, useContext } from "react";
import { userContext } from "../../common/context";
import { UserPanel } from "../UserPanel/UserPanel";
import "./JobCentre.css";

export const JobCentre = (props) => {
  //
  const user = useContext(userContext).user;
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [jobId, setJobId] = useState("");

  const [taskLength, setTaskLength] = useState(0);

  const fetchJobDetails = async () => {
    if (props.mainJobId.length > 0) {
      const data = await getJobDetils(props.mainJobId, user.token);
      setUsers(data.job.users);
      setTasks(data.job.task);
      setJobId(data.job.id);
    } else {
      setTimeout(() => {
        console.log("Loading job detail...");
      }, 1000);
    }
  };

  useEffect(() => {
    fetchJobDetails();
  }, [props.mainJobId, taskLength]);

  return (
    <div className="jobCentre-wrapper">
      {users.map((item, index) => {
        return (
          <UserPanel
            key={index}
            username={item.username}
            userId={item._id}
            tasks={tasks}
            jobId={jobId}
            taskLength={taskLength}
            setTaskLength={setTaskLength}
          />
        );
      })}
    </div>
  );
};

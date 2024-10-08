import React from "react";
import { getJobDetils } from "../../utils/job";
import { ShopingListModal } from "../ShopingListModal/ShopingListModal";
import { io } from "socket.io-client";
import { useState, useEffect, useContext } from "react";
import { userContext } from "../../common/context";
import { UserPanel } from "../UserPanel/UserPanel";
import { SearchBar } from "../SearchBar/SearchBar";

import "./JobCentre.css";

export const JobCentre = (props) => {
  //
  const [isShopingModalVisible, setIsshopingModalVisible] = useState(false);
  const user = useContext(userContext).user;

  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [jobId, setJobId] = useState("");
  const [owner, setOwner] = useState("");
  const [tempTaskUser, setTempTaskUser] = useState({});
  const [taskLength, setTaskLength] = useState(0);
  const [taskStatus, setTaskStatus] = useState(false);

  //
  const url = import.meta.env.VITE_URL;
  // temp task data
  const [taskdData, setTaskData] = useState([]);
  // // tempJobData
  const [jobData, setJobData] = useState([]);
  //

  const fetchJobDetails = async () => {
    //
    //
    if (props.mainJobId.length > 0) {
      const data = await getJobDetils(props.mainJobId, user.token);
      setUsers(data.job.users);
      setTasks(data.job.task);
      setJobId(data.job.id);
      setOwner(data.job.owner._id);
      props.setJobTitle(data.job.title);
    } else {
      setTimeout(() => {
        console.log("Loading job detail...");
      }, 1000);
    }
  };

  // const data = props.data; // Receive data from Listener

  useEffect(() => {
    fetchJobDetails();
    //
    const socket = io(url);
    // socket.off("insertTask");
    // socket.off("updateTask");
    // socket.off("deleteTask");
    // socket.off("updateJob");
    //
    socket.on("insertTask", (newTask) => {
      setTaskData((prevTask) => [...prevTask, newTask]);
      console.log("taskData", taskdData);
    });
    //
    socket.on("updateTask", (updatedTask) => {
      setTaskData((prevTasks) =>
        prevTasks.map((task) =>
          task._id === updatedTask._id ? { ...task, ...updatedTask } : task
        )
      );
    });
    //
    socket.on("deleteTask", ({ taskId }) => {
      setTaskData((prevTasks) =>
        prevTasks.filter((task) => task._id !== taskId)
      );
    });
    //
    socket.on("updateJob", (updatedJob) => {
      setJobData((prevJobs) =>
        prevJobs.map((job) =>
          job._id === updatedJob._id ? { ...job, ...updatedJob } : job
        )
      );
    });
    //
    return () => {
      socket.disconnect(); // Clean up when component unmounts
    };
    //
  }, [
    props.mainJobId,
    taskLength,
    tempTaskUser,
    taskStatus,
    taskdData,
    jobData,
  ]);

  return (
    <div className="jobCentre-wrapper">
      <SearchBar jobId={jobId} users={users} numberOfInv={props.numberOfInv} />
      <div className="jobCentre-jobTitle-wrapper">
        <p className="jobCentre-jobTitle">{props.jobTitle}</p>
      </div>

      <div className="users-wrapper">
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
              users={users}
              tempTaskUser={tempTaskUser}
              setTempTaskUser={setTempTaskUser}
              taskStatus={taskStatus}
              setTaskStatus={setTaskStatus}
              owner={owner}
              isShopingModalVisible={isShopingModalVisible}
              setIsshopingModalVisible={setIsshopingModalVisible}
            />
          );
        })}
      </div>
      {isShopingModalVisible && (
        <ShopingListModal
          setIsshopingModalVisible={setIsshopingModalVisible}
          jobId={jobId}
        />
      )}
    </div>
  );
};

import React from "react";
import { getJobDetils } from "../../utils/job";
import { ShopingListModal } from "../ShopingListModal/ShopingListModal";
import { connectSocket } from "../../common/socket";
import Cookies from "js-cookie";
import { BsCart4 } from "react-icons/bs";
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
  const [colors, setColors] = useState({});

  const colorFunc = () => {
    const colors = [
      "pink",
      "orange",
      "lightblue",
      "yellow",
      "lightpink",
      "lightskyblue",
      "lightseagreen",
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    return randomColor;
  };

  const setColorsFunc = () => {
    const newObj = {};
    users.map((u) => {
      if (u._id === owner) {
        newObj[u._id] = "lightgreen";
      } else {
        newObj[u._id] = colorFunc();
      }
    });
    setColors(newObj);
  };
  //
  const url = import.meta.env.VITE_URL;
  // temp task data
  const [taskdData, setTaskData] = useState([]);

  const fetchJobDetails = async () => {
    if (
      props.mainJobId.length > 0 &&
      props.mainJobId !== props.jobDeleteData[0]
    ) {
      const data = await getJobDetils(props.mainJobId, user.token);
      setUsers(data.job.users);
      setTasks(data.job.task);
      setJobId(data.job.id);
      setOwner(data.job.owner._id);
      props.setJobTitle(data.job.title);
      setColorsFunc();
    } else {
      null;
    }
    if (document.cookie.includes("shopingModal")) {
      let condition = Cookies.get("shopingModal");
      setIsshopingModalVisible(condition);
      console.log(condition);
    } else {
      // setIsshopingModalVisible(isShopingModalVisible);
      console.log("No cookie");
    }
  };

  const openShopingModal = () => {
    setIsshopingModalVisible(!isShopingModalVisible);
    Cookies.set("shopingModal", true, {
      expires: 7,
      path: "/",
    });
  };

  useEffect(() => {
    //
    fetchJobDetails();
    const socket = connectSocket(url, user.userId);

    socket.on("updateJob", (updatedJob) => {
      props.setJobData((prevJobs) =>
        prevJobs.map((job) =>
          job._id === updatedJob._id ? { ...job, ...updatedJob } : job
        )
      );
    });

    socket.on("updateTask", (updatedTask) => {
      setTaskData((prevTasks) =>
        prevTasks.map((task) =>
          task._id === updatedTask._id ? { ...task, ...updatedTask } : task
        )
      );
    });

    return () => {
      socket.off("updateJob");
      socket.off("insertTask");
      socket.off("updateTask");
      socket.off("deleteTask");
    };
  }, [
    props.mainJobId,
    taskLength,
    tempTaskUser,
    taskStatus,
    taskdData,
    props.jobData,
    users.length,
    props.jobTitle,
  ]);

  return (
    <div className="jobCentre-wrapper">
      <SearchBar
        jobId={jobId}
        users={users}
        numberOfInv={props.numberOfInv}
        jobsLength={props.jobsLength}
        setJobsLength={props.setJobsLength}
        setMainJobId={props.setMainJobId}
        mainJobId={props.mainJobId}
        owner={owner}
        setJobDeleteData={props.setJobDeleteData}
      />
      {props.jobs.length > 0 && props.mainJobId ? (
        <div className="jobCentre-jobTitle-wrapper">
          <p className="jobCentre-jobTitle">{props.jobTitle}</p>

          <div className="userPanel-icon-wrapper">
            <BsCart4
              onClick={() => {
                openShopingModal();
              }}
              className="cartIcon"
            />
          </div>
        </div>
      ) : null}

      <div className="users-wrapper">
        {props.jobs.length > 0
          ? users.map((item, index) => {
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
                  colors={colors}
                />
              );
            })
          : null}
      </div>
      {isShopingModalVisible && (
        <ShopingListModal
          setIsshopingModalVisible={setIsshopingModalVisible}
          jobId={jobId}
          colors={colors}
          jobData={props.jobData}
          setJobData={props.setJobData}
          jobTitle={props.jobTitle}
        />
      )}
    </div>
  );
};

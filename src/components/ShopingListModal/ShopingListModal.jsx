import React from "react";
import { useState, useContext, useEffect } from "react";
import { getJobById, editShopingList } from "../../utils/job";
import { io } from "socket.io-client";
import { AddToListPanel } from "./AddToListPanel/AddToListPanel";
import { IoMdClose } from "react-icons/io";
import { IoCheckmarkOutline } from "react-icons/io5";
import { MdOutlineCancel } from "react-icons/md";
import "./ShopingListModal.css";
import { userContext } from "../../common/context";

export const ShopingListModal = (props) => {
  const user = useContext(userContext).user;
  const letter = user.username.slice(0, 1);
  //
  const url = import.meta.env.VITE_URL;
  // // tempJobData
  const [jobData, setJobData] = useState([]);

  const [shopingList, setShopingLIst] = useState([]);
  const [shopingListLength, setShopingListLength] = useState(0);
  const [shopingListTitle, setShopingLIstTitle] = useState("");
  const [itemStatus, setItemStatus] = useState(false);
  const [confimationClear, setConfirmationClear] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  //
  const getJob = async () => {
    const data = await getJobById(props.jobId, user.token);
    setShopingLIst(data.job.shopingList.sort((a, b) => a.status - b.status));
    setShopingLIstTitle(data.job.title);
    setShopingListLength(data.job.shopingList.length);
  };

  //change status
  const changeStatusItem = async (item) => {
    setItemStatus(item.status);
    const data = await editShopingList(
      user.token,
      props.jobId,
      "updateStatus",
      "",
      item._id
    );
    console.log(item);
    setItemStatus(data.item.status);
  };
  // delete item
  const deleteItem = async (item) => {
    const data = await editShopingList(
      user.token,
      props.jobId,
      "delete",
      "",
      item._id
    );
    setShopingListLength(shopingListLength - 1);
  };
  // clear list
  const clearList = async () => {
    const data = await editShopingList(user.token, props.jobId, "clear");
    console.log(data);
    setShopingListLength(0);
  };

  useEffect(() => {
    getJob();
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
  }, [shopingListLength, itemStatus, jobData]);

  return (
    <div className="shopingListModal">
      <div className="closeShopingModal-wrapper">
        <IoMdClose
          onClick={() => {
            props.setIsshopingModalVisible(false);
          }}
          className="closeShopingModal-icon"
        />
      </div>

      <div className="shopingListModal-wrapper">
        <p className="shopingListTitle-content">
          {" "}
          Shoping list{" "}
          <span className="shopingListTitle-content-span">
            {shopingListTitle}
          </span>
        </p>
        <AddToListPanel
          jobId={props.jobId}
          shopingListLength={shopingListLength}
          setShopingListLength={setShopingListLength}
        />
        <div className="shopingItems-wrapper">
          {shopingListLength > 0
            ? shopingList.map((item, index) => {
                return (
                  <div className="shopingListItem-wrapper" key={index}>
                    <div
                      className="user-letter-wrapper"
                      style={{
                        color: props.colors[item.userId._id],
                        border: `1px solid ${props.colors[item.userId._id]}`,
                      }}
                    >
                      <p className="user-letter-content">
                        {item.userId.username.slice(0, 1)}
                      </p>
                    </div>
                    <p
                      className="shopingListItem-title-content"
                      style={{
                        textDecoration: item.status ? "line-through" : "none",
                        color: item.status ? "rgb(235, 114, 114)" : "white",
                      }}
                    >
                      {item.title}
                    </p>
                    <IoCheckmarkOutline
                      onClick={() => changeStatusItem(item)}
                      className="checkIcon"
                      style={{
                        color: item.status
                          ? "rgb(235, 114, 114)"
                          : " rgb(9, 253, 9)",
                      }}
                    />
                    <MdOutlineCancel
                      className="cancelIcon"
                      onClick={() => deleteItem(item)}
                    />
                  </div>
                );
              })
            : null}
        </div>
      </div>

      {!confimationClear ? (
        <div className="clearShopingListModal-wrapper">
          <p onClick={() => setConfirmationClear(true)}>(Clear List)</p>
        </div>
      ) : (
        <div className="clearShopingListModal-confirm-wrapper">
          <p
            className="confirmClear-content"
            onClick={() => setConfirmationClear(false)}
          >
            Sure?
          </p>
          <p className="confirmClear-content" onClick={clearList}>
            Y
          </p>
          <p className="confirmClear-content">/</p>
          <p
            className="confirmClear-content"
            onClick={() => setConfirmationClear(false)}
          >
            N
          </p>
        </div>
      )}
    </div>
  );
};

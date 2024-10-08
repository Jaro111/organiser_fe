import React from "react";
import { editShopingList } from "../../../utils/job";

import { pressEnter } from "../../../common";
import { useState, useContext } from "react";
import { userContext } from "../../../common/context";
import "./AddToListPanel.css";

export const AddToListPanel = (props) => {
  const [itemTitle, setItemTitle] = useState("");
  const user = useContext(userContext).user;

  const changeHandler = async (e) => {
    e.preventDefault();
    setItemTitle(e.target.value);
  };

  const addToList = async () => {
    if (itemTitle.length > 0) {
      const data = await editShopingList(
        user.token,
        props.jobId,
        "add",
        itemTitle
      );
      console.log(data);
      props.setShopingListLength(props.shopingListLength + 1);
    }
    setItemTitle("");
  };

  return (
    <div className="addToListPanel-wrapper">
      <input
        className="addToListPanel-input"
        onChange={(e) => changeHandler(e)}
        placeholder="item"
        value={itemTitle}
        autoFocus
        onFocus={(e) => e.currentTarget.select()}
        onKeyDown={(e) => pressEnter(e, addToList)}
      ></input>
      <button className="addToListPanel-btn" onClick={addToList}>
        +
      </button>
    </div>
  );
};

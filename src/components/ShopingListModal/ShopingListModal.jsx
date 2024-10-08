import React from "react";
import { useState, useContext, useEffect } from "react";
import { UserPanel } from "../UserPanel/UserPanel";
import { AddToListPanel } from "./AddToListPanel/AddToListPanel";
import { IoMdClose } from "react-icons/io";
import "./ShopingListModal.css";
import { userContext } from "../../common/context";

export const ShopingListModal = (props) => {
  const user = useContext(userContext).user;
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
        <AddToListPanel />
        <div className="shopingItems-wrapper">
          <div></div>
        </div>
      </div>
    </div>
  );
};

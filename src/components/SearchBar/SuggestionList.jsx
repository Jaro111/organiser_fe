import React from "react";
import { InviteModal } from "./InviteModal";
import { userContext } from "../../common/context";
import { useContext, useState } from "react";
import { GoDotFill } from "react-icons/go";
import "./SuggerstionList.css";

export const SuggestionList = (props) => {
  const [isInviteModalVisible, setIsInviteModalVisible] = useState(false);
  const [userToInvite, setUserToInvite] = useState({});

  const user = useContext(userContext).user;
  const jobId = props.jobId;

  const inviteFunc = (item) => {
    setIsInviteModalVisible(!isInviteModalVisible);
    setUserToInvite(item);
  };

  return (
    <ul className="suggestionList">
      {props.suggestions.map((item, index) => {
        return (
          <li className="suggestionUser" key={index}>
            {user.id !== item._id ? <p> {item.username}</p> : null}

            {props.invitedUsersArray.includes(item._id) ? (
              <GoDotFill className="dotIcon" />
            ) : (
              <p
                key={index}
                className="inviteContent"
                onClick={() => inviteFunc(item)}
              >
                invite
              </p>
            )}
          </li>
        );
      })}
      {isInviteModalVisible && (
        <InviteModal
          jobId={props.jobId}
          setIsInviteModalVisible={setIsInviteModalVisible}
          userToInvite={userToInvite}
          setSearchInput={props.setSearchInput}
          setSuggestions={props.setSuggestions}
          setSuggestionsLength={props.setSuggestionsLength}
        />
      )}
    </ul>
  );
};

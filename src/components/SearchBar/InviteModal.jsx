import React from "react";
import { useContext, useState } from "react";
import { userContext } from "../../common/context";
import { inViteToJob } from "../../utils/job";
import "./InviteModal.css";

export const InviteModal = (props) => {
  //
  const user = useContext(userContext).user;
  const [invitedMessage, setInvitedMessage] = useState(null);

  const inviteUser = async () => {
    const data = await inViteToJob(
      props.jobId,
      props.userToInvite._id,
      user.token
    );

    if (data.message) {
      setInvitedMessage(data.message);
    }
  };

  const confirmInvite = () => {
    inviteUser();
    setTimeout(() => {
      props.setIsInviteModalVisible(false);
      setInvitedMessage(null);
      props.setSearchInput("");
      props.setSuggestions([]);
      props.setSuggestionsLength(0);
    }, 1500);
  };

  return (
    <div className="inviteModal-wrapper">
      <div className="inviteModalContent">
        {invitedMessage ? (
          <p className="invitedMessage-content">{invitedMessage}</p>
        ) : (
          <>
            <p>
              Are You Sure You want to invite{" "}
              <span className="inviteName-content">
                {" "}
                {props.userToInvite.username}
              </span>
              ?
            </p>

            <div className="inviteModalDecisionContent-wrapper">
              <p className="confirmInvite-content" onClick={confirmInvite}>
                Yes
              </p>
              <p>{}</p>
              <p>/</p>
              <p>{}</p>
              <p
                className="declineInvite-content"
                onClick={() => props.setIsInviteModalVisible(false)}
              >
                No
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default InviteModal;

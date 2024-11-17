import React from "react";
import { getInvitations, acceptInvitation } from "../../utils/job";
import { rejectInvitation } from "../../utils/job";
import { userContext } from "../../common/context";
import { useEffect, useState, useContext } from "react";
import "./NotificationsCentre.css";

export const NotificationsCentre = (props) => {
  //
  const user = useContext(userContext).user;
  const [invitations, setInvitations] = useState([]);

  const loadInv = async () => {
    const data = await getInvitations(user.token, user.id);
    setInvitations(data);
    props.setNumberOfInv(data.length);
  };

  //
  const clickAccept = async (item) => {
    const data = await acceptInvitation(user.token, item._id);
    if (data.message === "Invitation accepted")
      props.setNumberOfInv(props.numberOfInv - 1);
  };
  //
  const clickReject = async (item) => {
    const data = await rejectInvitation(user.token, item._id);
    if (data.message === "Invitation rejected")
      props.setNumberOfInv(props.numberOfInv - 1);
  };
  //
  useEffect(() => {
    loadInv();
  }, [user.id, props.numberOfInv]);

  return (
    <div className="notificationsCentre-wrapper">
      <div className="allNotifications-wrapper">
        {invitations
          ? invitations.map((item, index) => {
              return (
                <div key={index} className="notification-content-wraper">
                  <p>Invitation to job: </p>
                  <p className="invItemsTitle-content">{item.title}</p>
                  <p>from: </p>
                  <p className="invItemsUsername-content">
                    {item.owner.username}
                  </p>
                  <>
                    <p
                      className="invItemsAccept-content"
                      onClick={() => clickAccept(item)}
                    >
                      Accept
                    </p>
                    <p
                      className="invItemsReject-content"
                      onClick={() => clickReject(item)}
                    >
                      Reject
                    </p>
                  </>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

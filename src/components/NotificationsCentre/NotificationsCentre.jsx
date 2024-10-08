import React from "react";
import { getInvitations, acceptInvitation } from "../../utils/job";
import { userContext } from "../../common/context";
import { useEffect, useState, useContext } from "react";
import "./NotificationsCentre.css";

export const NotificationsCentre = () => {
  //
  const user = useContext(userContext).user;
  const [invitations, setInvitations] = useState([]);
  const [invLength, setInvLength] = useState(0);

  const loadInv = async () => {
    const data = await getInvitations(user.token, user.id);
    console.log(data);
    setInvitations(data);
    setInvLength(data.length);
  };

  //
  const clickAccept = async (item) => {
    console.log(item);
    const data = await acceptInvitation(user.token, item._id);
    console.log(data);
    if (data.message === "Invitation accepted") setInvLength(invLength - 1);
  };
  //
  useEffect(() => {
    loadInv();
  }, [user.id, invLength]);

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
                    <p className="invItemsReject-content">Reject</p>
                  </>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};
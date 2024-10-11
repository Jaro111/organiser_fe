import { useEffect } from "react";
import { NotificationsCentre } from "../components/NotificationsCentre/NotificationsCentre";

export const Notifications = ({ numberOfInv, setNumberOfInv }) => {
  return (
    <NotificationsCentre
      numberOfInv={numberOfInv}
      setNumberOfInv={setNumberOfInv}
    />
  );
};

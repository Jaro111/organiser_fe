import { MainCentre } from "../components/MainCentre/MainCentre";
import { StartUpCentre } from "../components/StartUpCentre/StartUpCentre";
import { useContext } from "react";
import { userContext } from "../common/context";

export const Home = ({ numberOfInv, setNumberOfInv }) => {
  const user = useContext(userContext).user;

  return (
    <>
      {user.username ? (
        <MainCentre numberOfInv={numberOfInv} setNumberOfInv={setNumberOfInv} />
      ) : (
        <StartUpCentre />
      )}
    </>
  );
};

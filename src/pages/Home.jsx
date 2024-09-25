import { MainCentre } from "../components/MainCentre/MainCentre";
import { useContext } from "react";
import { userContext } from "../common/context";

export const Home = () => {
  const user = useContext(userContext).user;

  return <>{user.username ? <MainCentre /> : <p>Not Logged</p>}</>;
};

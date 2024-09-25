import { useContext } from "react";
import { userContext } from "../common/context";

export const Home = () => {
  const user = useContext(userContext).user;

  return (
    <>
      <p>{user.username}</p>
    </>
  );
};

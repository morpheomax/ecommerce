import { useContext } from "react";
import { UserContext } from "../context/user/userContext";

import { Header } from "../components/Header/Header";
import { Sold } from "../components/Sold/Sold";
import { BlockInfo } from "../components/BlockInfo/BlockInfo";
export const HomePage = () => {
  const [state] = useContext(UserContext);
  // const [user, dispatch] = useContext(UserContext);
  return (
    <>
      <Header />

      <BlockInfo />
      <hr />

      {state?.user && (
        <h2>
          Bienvenido {state.user.name} {state.user.lastname}
        </h2>
      )}
      {/* {JSON.stringify(user, null, 2)} */}
      <div>
        <Sold />
      </div>
    </>
  );
};

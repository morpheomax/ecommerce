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

      <div className="flex">
        <div>
          <h2>Usuario Administrador</h2>
          <h3>Usuario: admin@admin.cl</h3>
          <h3>Password: Aa1234567</h3>
        </div>

        <div>
          <h2>Usuario Cliente</h2>
          <h3>Usuario: cliente@cliente.cl</h3>
          <h3>Password: Aa1234567</h3>
        </div>
        <hr />
      </div>
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

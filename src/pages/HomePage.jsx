import { useContext } from "react";
import { Header } from "../components/Header/Header";
import { Sold } from "../components/Sold/Sold";
import { UserContext } from "../context/user/userContext";
import { BlockInfo } from "../components/BlockInfo/BlockInfo";
export const HomePage = () => {
  const [state] = useContext(UserContext);

  return (
    <>
      <Header />

      <BlockInfo />
      <hr />

      {state?.user && <h2>Bienvenido {state.user.username}</h2>}
      <div>
        <Sold />
      </div>
      <h1>Más Visto</h1>
      <h2>Ofertas</h2>
      <h2>Nuevos Productos</h2>
      <h2>Categorías destacadas</h2>
    </>
  );
};

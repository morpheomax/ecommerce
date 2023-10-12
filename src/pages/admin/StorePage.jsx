import { UserContext } from "../../context/user/userContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Store } from "../../components/admin/Store/Store";

export const StorePage = () => {
  const [state] = useContext(UserContext);
  if (state?.user?.rol !== "SuperAdmin") {
    return <Navigate to="/" />;
  }
  //   console.log(editUser);

  return (
    <>
      <Store />
    </>
  );
};

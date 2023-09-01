import { UserContext } from "../../context/user/userContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Products } from "../../components/admin/Products/Products";

export const ProductPage = () => {
  const [state] = useContext(UserContext);
  if (state?.user?.rol !== "SuperAdmin") {
    return <Navigate to="/" />;
  }
  //   console.log(editUser);

  return (
    <>
      <Products />
    </>
  );
};

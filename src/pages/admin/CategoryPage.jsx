import { UserContext } from "../../context/user/userContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Categories } from "../../components/admin/Categories/Categories";

export const CategoryPage = () => {
  const [state] = useContext(UserContext);
  if (state?.user?.rol !== "SuperAdmin") {
    return <Navigate to="/" />;
  }
  //   console.log(editUser);

  return (
    <>
      <Categories />
    </>
  );
};

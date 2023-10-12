import { useContext } from "react";
import { UserContext } from "../../context/user/userContext";
import { Navigate } from "react-router-dom";
import { Profile } from "../../components/User/Profile/Profile";

export const ProfilePage = () => {
  const [state] = useContext(UserContext);
  if (state?.user?.rol !== "Cliente" && state?.user?.rol !== "SuperAdmin") {
    return <Navigate to="/" />;
  }

  return (
    <>
      <h1>PERFIL USUARIO</h1>
      <Profile />
    </>
  );
};

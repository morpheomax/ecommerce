import { UserAdmin } from "../../components/admin/UserAdmin/UserAdmin";
import { CreateUser } from "../../components/admin/UserAdmin/CreateUser";
import { UserContext } from "../../context/user/userContext";
import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";

export const AdminPage = () => {
  const [editUser, setEditUser] = useState(null);
  const [refresh, setRefresh] = useState(null);

  const [state] = useContext(UserContext);
  if (state?.user?.rol !== "SuperAdmin") {
    return <Navigate to="/" />;
  }
  console.log(editUser);

  return (
    <>
      <CreateUser editUser={editUser} setRefresh={setRefresh} />
      <UserAdmin setEditUser={setEditUser} refresh={refresh} />

      {/* <AdminUser /> */}
    </>
  );
};

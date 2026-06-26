import type { RouteObject } from "react-router-dom";
import CreateUser from "../components/users/CreateUser";
import UpdateUser from "../components/users/UpdateUser";
import ViewUser from "../components/users/ViewUser";
import UsersPage from "../pages/UsersPage";

export const usersRoute : RouteObject = {
  path: "users",
  children: [
    {
      index: true,
      element: <UsersPage />,
    },
    {
      path: "create",
      element: <CreateUser />,
    },
    {
      path: ":id",
      element: <ViewUser />,
    },
    {
      path: ":id/edit",
      element: <UpdateUser />,
    },
  ],
};

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UnauthenticatedRoutes from "./UnauthenticatedRoutes";
import NotFound from "@/pages/NotFound";
import AuthenticatedRoutes from "./AuthenticatedRoutes";

const router = createBrowserRouter([
  ...UnauthenticatedRoutes,
  ...AuthenticatedRoutes,
  {
    path: "*",
    element: <NotFound />,
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;

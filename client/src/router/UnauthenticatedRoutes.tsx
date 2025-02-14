import { Navigate, Outlet, RouteObject } from "react-router-dom";
import useUser from "@/hooks/useUser";
import AuthPage from "@/pages/Auth";

const UnauthenticatedRouteWrapper: React.FC = () => {
  const { isAuthenticated } = useUser();
  return !isAuthenticated() ? <Outlet /> : <Navigate to="/" replace />;
};

const UnauthenticatedRoutes: RouteObject[] = [
  {
    path: "/auth",
    element: <UnauthenticatedRouteWrapper />,
    children: [
      {
        path: "",
        element: <AuthPage />,
      },
    ],
  },
];

export default UnauthenticatedRoutes;

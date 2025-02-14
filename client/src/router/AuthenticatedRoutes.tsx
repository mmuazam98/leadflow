import { Navigate, RouteObject } from "react-router-dom";
import useUser from "@/hooks/useUser";
import OutletWithNavbar from "@/components/OutletWithNavbar";
import Home from "@/pages/Home";

const AuthenticatedRouteWrapper: React.FC = () => {
  const { isAuthenticated } = useUser();
  return isAuthenticated() ? <OutletWithNavbar /> : <Navigate to="/auth" replace />;
};

const AuthenticatedRoutes: RouteObject[] = [
  {
    path: "/",
    element: <AuthenticatedRouteWrapper />,
    children: [{ path: "/", element: <Home /> }],
  },
];

export default AuthenticatedRoutes;

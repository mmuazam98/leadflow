import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function OutletWithNavbar() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

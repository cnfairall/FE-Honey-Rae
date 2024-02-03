import { Outlet } from "react-router-dom";

export default function Employees() {
  return (
    <>
      <h2>Employees</h2>
      <Outlet />
    </>
  );
}

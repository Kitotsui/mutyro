import React from "react";
import { Outlet } from "react-router-dom";
import { NavBar } from "../components";

const HomeLayout = () => {
  return (
    <div>
      <NavBar />
      <div className="page-wrapper" style={{ paddingTop: "var(--nav-height)" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default HomeLayout;

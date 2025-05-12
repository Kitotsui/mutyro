import React from "react";
import { Outlet } from "react-router-dom";
import { NavBar } from "../components";

const HomeLayout = () => {
  return (
    <div>
      <NavBar />
      <div
        className="page-wrapper"
        style={{
          paddingTop: "calc(var(--nav-height) + calc(var(--nav-height) / 2))",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default HomeLayout;

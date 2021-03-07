import React from "react";
import SidebarNav from "../components/Sidebar/SidebarNav";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import SettingPage from "../pages/SettingPage";
import Timeline from "../pages/Timeline";
import UserRoute from "../pages/UserRoute";

const HomeRoutes = () => {
  return (
    <div className="homeRoutes">
      <SidebarNav />
      <UserRoute path="/" exact component={Home} />
      <UserRoute path="/timeline" exact component={Timeline} />
      <UserRoute path="/profile" exact component={Profile} />
      <UserRoute path="/setting" exact component={SettingPage} />
    </div>
  );
};

export default HomeRoutes;

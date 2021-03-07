import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { GET_SELECTED_USER } from "../../../constants/messageConstants";
import "./SidebarNav.css";

const SidebarNav = () => {
  const dispatch = useDispatch();
  const [navSelected, setNavSelected] = useState("chat");
  const history = useHistory();
  const userLogin = useSelector((state) => state.userLogin);
  const { user } = userLogin;
  const selected =
    history.location.pathname.substr(1).length === 0
      ? "chat"
      : history.location.pathname.substr(1);

  const messagesUser = useSelector((state) => state.messagesUser);
  const { users } = messagesUser;
  const selectedUser = users?.find((u) => u.selected);
  // responsive
  const [responsiveNav, setResponsiveNav] = useState(false);
  useEffect(() => {
    // we want to get the pathname of the url
    // and we set to navSelected
    setNavSelected(selected);
  }, [selected]);
  return (
    <div className="sidebarNav">
      <ul className="sidebarNav__up">
        {selectedUser ? (
          <>
            <li
              className="sidebarNav__back"
              onClick={() =>
                dispatch({ type: GET_SELECTED_USER, payload: null })
              }
            >
              <span>
                <i className="fa fa-chevron-left" />
              </span>
            </li>
            <li className="sidebarNav__username">{selectedUser.username}</li>
          </>
        ) : (
          <li>
            <Link to="/">
              <img
                src="/images/logo/logo.svg"
                alt="MisterGun"
                className="sidebarNav__imgLogo"
              />
            </Link>
          </li>
        )}
        <li
          className={
            navSelected === "chat"
              ? "sidebarNav__icon active"
              : "sidebarNav__icon"
          }
          onClick={() => setNavSelected("chat")}
        >
          <Link to="/">
            <img src="/images/icons/chat.svg" alt="chat" />
          </Link>
        </li>
        <li
          className={
            navSelected === "timeline"
              ? "sidebarNav__icon active"
              : "sidebarNav__icon"
          }
          onClick={() => setNavSelected("timeline")}
        >
          <Link to="/timeline">
            <img src="/images/icons/clock.svg" alt="clock" />
          </Link>
        </li>
        <li className="sidebarNav__icon">
          <img src="/images/icons/phone_outline.svg" alt="phone_outline" />
        </li>
      </ul>
      <ul className="sidebarNav__down">
        <li
          className={
            navSelected === "profile"
              ? "sidebarNav__profile active"
              : "sidebarNav__profile"
          }
          onClick={() => setNavSelected("profile")}
        >
          <Link to="/profile">
            <img
              src={
                user?.imageUrl
                  ? `${user?.imageUrl}`
                  : "/images/icons/profile.png"
              }
              alt="profile1"
              className="sidebar__userImage"
            />
          </Link>
        </li>
        <li
          className={
            navSelected === "setting"
              ? "sidebarNav__icon active"
              : "sidebarNav__icon"
          }
          onClick={() => setNavSelected("setting")}
        >
          <Link to="/setting">
            <img src="/images/icons/settings.svg" alt="settings" />
          </Link>
        </li>
        {!selectedUser && (
          <li
            className="sidebarNav__responsive"
            onClick={() => setResponsiveNav(true)}
          >
            <span>
              <i className="fa fa-bars" />
            </span>
          </li>
        )}
      </ul>
      {responsiveNav && (
        <div className="sidebarNav__navbar">
          <span onClick={() => setResponsiveNav(false)}>
            <i className="fa fa-times" />
          </span>
          <ul onClick={() => setResponsiveNav(false)}>
            <li
              className={
                navSelected === "chat"
                  ? "sidebarNav__navbarIcon active"
                  : "sidebarNav__navbarIcon"
              }
            >
              <Link to="/">Chat</Link>
            </li>
            <li
              className={
                navSelected === "timeline"
                  ? "sidebarNav__navbarIcon active"
                  : "sidebarNav__navbarIcon"
              }
            >
              <Link to="/timeline">Timeline</Link>
            </li>
            <li
              className={
                navSelected === "profile"
                  ? "sidebarNav__navbarIcon active"
                  : "sidebarNav__navbarIcon"
              }
            >
              <Link to="/profile">Profile</Link>
            </li>
            <li
              className={
                navSelected === "settings"
                  ? "sidebarNav__navbarIcon active"
                  : "sidebarNav__navbarIcon"
              }
            >
              <Link to="/setting">Setting</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SidebarNav;

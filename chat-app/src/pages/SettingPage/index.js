import { useDispatch } from "react-redux";
import { USER_SIGNOUT } from "../../constants/userConstants";
import "./SettingPage.css";

const SettingPage = () => {
  const dispatch = useDispatch();
  const handleSignout = () => {
    localStorage.removeItem("userGetToken");
    dispatch({ type: USER_SIGNOUT });
    document.location.href = "/signin";
  };
  return (
    <div className="setting">
      <div className="setting__container">
        <ul>
          <li onClick={handleSignout}>
            <img src="/images/icons/logout.svg" alt="logout" />
            <p>Log out</p>
          </li>
        </ul>
        <div className="setting__footer">MisterGun Production 2021</div>
      </div>
    </div>
  );
};

export default SettingPage;

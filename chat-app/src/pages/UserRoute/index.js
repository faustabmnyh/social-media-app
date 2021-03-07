import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const UserRoute = ({ component: Component, ...restProps }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { user } = userLogin;
  return (
    <Route
      {...restProps}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to="/signin" />
      }
    />
  );
};

export default UserRoute;

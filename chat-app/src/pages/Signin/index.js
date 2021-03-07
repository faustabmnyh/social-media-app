import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  USER_SIGNIN_FAIL,
  USER_SIGNIN_SUCCESS,
} from "../../constants/userConstants";
import { LOGIN_USER } from "../../graphql/users";
import "./Signin.css";

const Signin = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userLogin = useSelector((state) => state.userLogin);
  const { error, user } = userLogin;
  const [variables, setVariables] = useState({
    username: "",
    password: "",
  });

  const [loginUser, { loading }] = useLazyQuery(LOGIN_USER, {
    onCompleted({ login }) {
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: login });
      localStorage.setItem("userGetToken", JSON.stringify(login.token));
      window.location.href = "/";
    },
    onError(err) {
      dispatch({
        type: USER_SIGNIN_FAIL,
        payload: err.graphQLErrors[0].extensions.exception.errors,
      });
    },
  });

  useEffect(() => {
    if (user) {
      history.push("/");
    }
  }, [user, history]);

  const handleChange = (prop) => (e) => {
    setVariables({ ...variables, [prop]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser({ variables });
  };

  return (
    <div className="signin">
      <div className="signin__logo">
        <img src="/images/logo/logo.svg" alt="mistergun" />
        <h1>
          Mister<span>Gun</span>
        </h1>
      </div>
      {loading && (
        <div className="progress-auth">
          <span>
            <i className="fa fa-spinner fa-spin" /> Loading...
          </span>
        </div>
      )}
      <div className="signin__container">
        <h3>Log in to your account</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={variables.username}
            onChange={handleChange("username")}
          />
          {error && error.username && (
            <h5 className="danger-auth">
              <img src="/images/icons/error_outline.svg" alt="alert" />
              {error.username}
            </h5>
          )}
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={variables.password}
            onChange={handleChange("password")}
          />
          {error && error.password && (
            <h5 className="danger-auth">
              <img src="/images/icons/error_outline.svg" alt="alert" />{" "}
              {error.password}
            </h5>
          )}
          <div className="signin__btnContainer">
            <button type="submit">Sign In</button>
            <div className="signin__goto">
              Dont Have an account ? <Link to="/register">Sign Up</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;

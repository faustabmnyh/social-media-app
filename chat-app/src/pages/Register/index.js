import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { REGISTER_USER } from "../../graphql/users";
import "./Register.css";
import {
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_SUCCESS,
} from "../../constants/userConstants";

const Register = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userRegister = useSelector((state) => state.userRegister);
  const { error } = userRegister;
  const userLogin = useSelector((state) => state.userLogin);
  const { user } = userLogin;
  console.log(error);
  const [variables, setVariables] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { register } }) {
      dispatch({ type: USER_REGISTER_SUCCESS, payload: register });
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: register });
      localStorage.setItem("userGetToken", JSON.stringify(register.token));
      window.location.href = "/";
    },
    onError(err) {
      dispatch({
        type: USER_REGISTER_FAIL,
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
    registerUser({ variables });
  };

  return (
    <div className="register">
      <div className="register__logo">
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
      <div className="register__container">
        <h3>Create New Account</h3>
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
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={variables.email}
            onChange={handleChange("email")}
          />
          {error && error.email && (
            <h5 className="danger-auth">
              <img src="/images/icons/error_outline.svg" alt="alert" />{" "}
              {error.email}
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
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={variables.confirmPassword}
            onChange={handleChange("confirmPassword")}
          />
          {error && error.confirmPassword && (
            <h5 className="danger-auth">
              <img src="/images/icons/error_outline.svg" alt="alert" />{" "}
              {error.confirmPassword}
            </h5>
          )}
          <div className="register__btnContainer">
            <button type="submit">Sign Up</button>
            <div className="register__goto">
              Have an account ? <Link to="/signin">Sign In</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  USER_SIGNIN_SUCCESS,
  USER_UPDATE_RESET,
} from "../../constants/userConstants";
import { UPLOAD_IMAGE } from "../../graphql/uploads";
import { UPDATE_USER } from "../../graphql/users";
import "./Profile.css";

const Profile = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { user } = userLogin;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updatedSuccess, setUpdatedSuccess] = useState(false);
  const [updatedProfileError, setUpdatedProfileError] = useState("");
  const [image, setImage] = useState("/images/icons/profile.png");

  // update user mutation
  const [updateUser, { loading: loadingUpdateUser }] = useMutation(
    UPDATE_USER,
    {
      onCompleted({ updateUser: newUser }) {
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: newUser });
        localStorage.setItem("userGetToken", JSON.stringify(newUser.token));
        setUpdatedSuccess(true);
      },
      onError(err) {
        setUpdatedProfileError(
          err.graphQLErrors[0].extensions.exception.errors
        );
        console.log(
          "this error --profile",
          err.graphQLErrors[0].extensions.exception.errors
        );
      },
    }
  );

  // upload image done yet because we have error in backend
  const [uploadImage] = useMutation(UPLOAD_IMAGE, {
    onCompleted(data) {
      console.log(data);
    },
    onError(err) {
      console.log(err);
    },
  });
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log("rhis is file", file);
    if (!file) return;
    // uploadImage({ variables: { file } });
  };

  useEffect(() => {
    if (!user) {
      dispatch({ type: USER_UPDATE_RESET });
    }
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
    }
  }, [user, dispatch]);

  const handleSubmitProfile = (e) => {
    e.preventDefault();
    updateUser({
      variables: {
        username,
        email,
        password,
        confirmPassword,
      },
    });
  };

  return (
    <div className="profile">
      <div className="profile__edit">
        <form className="profile__formEdit" onSubmit={handleSubmitProfile}>
          <div className="profile__image">
            <img
              src={user.imageUrl ? `${user.imageUrl}` : `${image}`}
              alt="human"
              className="profile__userImage"
            />
            <div className="profile__editImage">
              <img src="/images/icons/edit.svg" alt="pencil" />
              <input type="file" accept="image/*" onChange={handleFileChange} />
            </div>
            <h2>{user.username}</h2>
          </div>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {updatedProfileError && updatedProfileError.username && (
              <h5 className="danger-auth">
                <img src="/images/icons/error_outline.svg" alt="alert" />
                {updatedProfileError.username}
              </h5>
            )}
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {updatedProfileError && updatedProfileError.email && (
              <h5 className="danger-auth">
                <img src="/images/icons/error_outline.svg" alt="alert" />
                {updatedProfileError.email}
              </h5>
            )}
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {updatedProfileError && updatedProfileError.password && (
              <h5 className="danger-auth">
                <img src="/images/icons/error_outline.svg" alt="alert" />
                {updatedProfileError.password}
              </h5>
            )}
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {updatedProfileError && updatedProfileError.confirmPassword && (
              <h5 className="danger-auth">
                <img src="/images/icons/error_outline.svg" alt="alert" />
                {updatedProfileError.confirmPassword}
              </h5>
            )}
            {loadingUpdateUser ? (
              <button className="profile__formEditBtn loading-update">
                <i className="fa fa-spinner fa-spin" />
              </button>
            ) : (
              <button className="profile__formEditBtn">Update</button>
            )}
          </div>
        </form>
      </div>
      {updatedSuccess && (
        <div className="profile__successUpdate">
          <div
            className="profile__successUpdateContainer"
            onClick={() => setUpdatedSuccess(false)}
          >
            <img src="/images/pictures/tick.svg" alt="tick" />
            <h3>Profile Updated Successfuly</h3>
            <h5>Your profile has been updated</h5>
            <button>Okay</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;

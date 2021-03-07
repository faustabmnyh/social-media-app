import "./SettingPost.css";

const SettingPost = ({ setOpenSettings, setConfirmDelete }) => {
  return (
    <div className="settingPost__settingLists" onClick={setOpenSettings}>
      <ul>
        <li onClick={setConfirmDelete}>Delete Post</li>
      </ul>
    </div>
  );
};

export default SettingPost;

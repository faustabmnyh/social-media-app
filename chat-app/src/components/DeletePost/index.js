import "./DeletePost.css";

const DeletePost = ({ handleDeletePost, setConfirmDelete }) => {
  return (
    <div className="deletePost__deleteAsk">
      <div className="deletePost__deleteAskContainer">
        <p>Are you sure delete this post ?</p>
        <div className="deletePost__deleteAskBtn">
          <button onClick={handleDeletePost}>Delete</button>
          <button
            onClick={setConfirmDelete}
            className="deletePost__deleteAskBtnCancel"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePost;

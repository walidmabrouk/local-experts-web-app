import { useParams, Link,  useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// import AddComment from "../../components/comments/AddComment";
// import CommentList from "../../components/comments/CommentList";
// import UpdatePostModal from "./UpdatePostModal";
import { toast } from "react-toastify";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, fetchSinglePost, toggleLikePost, updatePostImage } from "../../redux/actions/postActions";
import CommentList from "../../components/CommentList";
import UpdatePostModal from "../../components/UpdatePostModal";
import axios from "axios";
import AddComment from "../../components/AddComment";
import Heart from "../../assets/media/heart.svg";
import HeartFilled from "../../assets/media/heartFilled.svg";
import Comment from "../../assets/media/comment.svg";
import Share from "../../assets/media/share.svg";
import Info from "../../assets/media/info.svg";

const PostDetails = ({ socket }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const post = useSelector((state) => state.posts.post);
  const user = useSelector((state) => state.auth.user);
  const { id } = useParams();

  const [updatePost, setUpdatePost] = useState(false);
  const [file, setFile] = useState(null);
  const [liked, setLiked] = useState(false);

  useEffect(async () => {
    await dispatch(fetchSinglePost(id));
  },[]);

  const updateImageSubmitHandler = (e) => {
    e.preventDefault();
    if (!file) return toast.warning("there is no file!");

    const formData = new FormData();
    formData.append("image", file);
    dispatch(updatePostImage(formData, post?._id));
  };

  const deletePostHandler = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this post!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deletePost(post?._id));
        navigate(`/profile/${user?._id}`);
      } else {
        swal("Something went wrong!");
      }
    });
  };


  const userLikeHandler = (e) => {
    if (post?.likes) {
      post.likes.map((UserId) => {
        if (UserId === user._id) {
          setLiked(true);
        } else {
          setLiked(false);
        }
      });
    }
  }

    const handleNotification = (type) => {
      socket.emit("sendNotification", {
        senderName: user.name,
        receiverName: post.user.name,
        type,
      });
    };

  return (
    <div className="post-details">
      <div className="post-details-image-wrapper">
        <img src={post?.image.url} alt="" className="post-details-image" />
        {user?.id === post?.user?._id && (
          <form
            onSubmit={updateImageSubmitHandler}
            className="update-post-image-form"
          >
            <label className="update-post-image" htmlFor="file">
              <i className="bi bi-image-fill"></i> select new image
            </label>
            <input
              style={{ display: "none" }}
              type="file"
              name="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <button type="submit">upload</button>
          </form>
        )}
      </div>
      <h1 className="post-details-title">{post?.title}</h1>
      <div className="post-details-user-info">
        <img src="" alt="" className="post-details-user-image" />
        <div className="post-details-user">
          <strong>
            <Link to={`/profile/${post?.user.id}`}>{post?.user.name}</Link>
          </strong>
          <span>{new Date(post?.createdAt).toDateString()}</span>
        </div>
      </div>
      <p className="post-details-description">{post?.description}</p>
      <div className="post-details-icon-wrapper">
        {user && (
          <div className="interaction">
            <img
              onClick={(e) => {
                dispatch(toggleLikePost(post?._id))
                  handleNotification(1);
              }}
              src={post?.likes.includes(user?.id) ? HeartFilled : Heart}
              alt=""
              className="cardIcon"
            />

            <img
              src={Comment}
              alt=""
              className="cardIcon"
              onClick={() => handleNotification(2)}
            />
            <img
              src={Share}
              alt=""
              className="cardIcon"
              onClick={() => handleNotification(3)}
            />
          </div>
        )}
        <small>{post?.likes.length} likes</small>

        {user?.id === post?.user?._id && (
          <div>
            <i
              onClick={() => setUpdatePost(true)}
              className="bi bi-pencil-square"
            ></i>
            <i onClick={deletePostHandler} className="bi bi-trash-fill"></i>
          </div>
        )}
      </div>
      {user ? (
        <AddComment postId={post?._id} />
      ) : (
        <p>to write a comment you should login first</p>
      )}

      <CommentList comments={post?.comments} />
      {updatePost && (
        <UpdatePostModal post={post} setUpdatePost={setUpdatePost} />
      )}
    </div>
  );
};

export default PostDetails;

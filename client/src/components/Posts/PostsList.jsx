import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import HomeNav from "../Home/HomeNav";
import CreatePost from "../../pages/ProfessionnelPages/CreatePost";
import { Avatar } from "@mui/material";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { GetProfile, GetProfiles } from "../../redux/actions/profileActions";
import { formatDistanceToNow } from "date-fns";
function PostsList({ posts }) {
  const dispatch = useDispatch();
  useEffect(async () => {
    await dispatch(await GetProfiles());
  }, []);
  const { loading, isPostCreated } = useSelector((state) => state.posts);
  const { profiles } = useSelector((state) => state.profiles);
  console.log();
  console.log(posts);
 return (
  <div className="post-item">
    <CreatePost />
    {posts.map((post) => {
      const postCreatedAt = new Date(post?.createdAt);
      const formattedDate = formatDistanceToNow(postCreatedAt, {
        locale: fr,
      });

      const userProfile = profiles.find((profile) => post.user.id === profile.user.id);

      return (
        <div className="create-postt" key={post.id}>
          <div className="tweetboxRoww">
            <div className="tweetboxUserIcon">
              {userProfile && (
                <Link to={`/profile/${userProfile._id}`}>
                  <Avatar
                    key={userProfile.id}
                    src={userProfile.profilePhoto?.url}
                  />
                </Link>
              )}
            </div>
          </div>
          <div style={{ width: "90%" }}>
            <div className="post-item-info">
              <div className="post-item-author">
                <Link to={`/profile/${userProfile._id}`}>
                  <span className="author">{post?.user.name}</span>
                </Link>
              </div>
              <div className="post-itme-date">{formattedDate}</div>
            </div>
            <div className="post-item-details">
              <Link
                className="post-item-category"
                to={`/posts/categories/${post?.category}`}
              ></Link>
              <p className="post-item-description">{post?.description}</p>
            </div>
            <div className="post-item-image-wrapper">
              <img
                src={post?.image.url}
                alt=""
                className="post-itme-image"
              />
            </div>
          </div>
        </div>
      );
    })}
  </div>
);


}

export default PostsList;

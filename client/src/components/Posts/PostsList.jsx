import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import HomeNav from '../Home/HomeNav';
import CreatePost from '../../pages/ProfessionnelPages/CreatePost';
import { Avatar } from '@mui/material';
import { format } from "date-fns";
import { fr } from "date-fns/locale";


function PostsList({ posts }) {
  const { loading, isPostCreated } = useSelector((state) => state.posts);

  return (
    <div className="post-item">
      <CreatePost />
      {posts.map((post) => {
        const postCreatedAt = new Date(post?.createdAt);
        const formattedDate = format(postCreatedAt, "dd MMMM yyyy", {
          locale: fr,
        });

        return (
          <div className="create-postt" key={post.id}>
            <div className="tweetboxRoww">
              <div className="tweetboxUserIcon">
                <Avatar src={""} />
              </div>
            </div>
            <div>
              <div className="post-item-info">
                <div className="post-item-author">
                  <Link to="/profile/1">
                    <span className="author">{post?.user.name}</span>
                  </Link>
                </div>
                <div className="post-itme-date">{formattedDate}</div>
              </div>
              <div className="post-item-info-wrapper">
                <div className="post-item-details">
                  <h4 className="post-item-title">{post?.title}</h4>
                  <Link
                    className="post-item-category"
                    to={`/posts/categories/${post?.category}`}
                  ></Link>
                </div>
                <p className="post-item-description">{post?.description}</p>
              </div>
              <div className="post-item-image-wrapper">
                <img src={post?.image.url} alt="" className="post-itme-image" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}


export default PostsList
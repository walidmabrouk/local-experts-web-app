import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import HomeNav from '../Home/HomeNav';
import CreatePost from '../../pages/ProfessionnelPages/CreatePost';

function PostsList({ posts }) {
  const { loading, isPostCreated } = useSelector(
    (state) => state.posts
  );

  return (
    <div className=" pl-32 md:pl-32 pr-6 lg:pl-6 post-item">
      <CreatePost/>
      {posts.map((post) => (
        <div>
          <div className="post-item-image-wrapper">
            <img src={post?.image.url} alt="" className="post-itme-image" />
          </div>
          <div className="post-item-info-wrapper">
            <div className="post-item-info">
              <div className="post-item-author">
                <strong>Author: </strong>
                <Link to="/profile/1">
                  <span>{post?.user.name}</span>
                </Link>
              </div>
              <div className="post-itme-date">
                {new Date(post?.createdAt).toDateString()}
              </div>
            </div>
            <div className="post-item-details">
              <h4 className="post-item-title">{post?.title}</h4>
              <Link
                className="post-item-category"
                to={`/posts/categories/${post?.category}`}
              ></Link>
            </div>
            <p className="post-item-description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
              natus delectus blanditiis accusamus. Fugit vitae odit accusamus,
              error nobis debitis, rerum ex saepe quisquam rem qui sint deserunt
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostsList
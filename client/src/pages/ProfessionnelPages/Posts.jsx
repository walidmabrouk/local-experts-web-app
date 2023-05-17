import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, fetchPostsBasedONCategory } from "../../redux/actions/postActions";
import { GetProfile } from "../../redux/actions/profileActions";
import { Link, useParams } from "react-router-dom";
import PostsList from "../../components/Posts/PostsList";
import NavCategory from "../../components/Posts/NavCategory";

function Posts({socket , user}) {
  const dispatch = useDispatch();
  useEffect(async () => {
    await dispatch(await fetchPosts());
    await dispatch(await GetProfile());
  }, []);
  
  const profiles = useSelector((state) => state.profiles);
  const posts = useSelector((state) => state.posts.posts);
  return (
    <div className="grid grid-cols-12 gap-x-2 pr-12 md:pr-16">
      <div
        className="nav-header pl-32 md:pl-32 pr-6 lg:pl-6"
        style={{ "grid-column": "span 3/span 3" }}
      >
        <h1>hello</h1>
      </div>
    <PostsList posts={posts} />
    <NavCategory />
    </div>
  );
}

export default Posts;

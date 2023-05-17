import { useEffect } from "react";
import { useParams } from "react-router-dom";
import PostsList from "./PostsList";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsBasedONCategory } from "../../redux/actions/postActions";

const Category = () => {
    const category = useParams();
    const dispatch = useDispatch()
       

  useEffect(async () => {
    await dispatch(
      await fetchPostsBasedONCategory(`${category.category.toString()}`)
    );
  }, []);
       const postsCategory = useSelector((state) => state.posts.posts_category);
    console.log(postsCategory);
  return (
    <div className="grid grid-cols-12 gap-x-2 pr-12 md:pr-16">
      {postsCategory ? (
        <>
          <h1 className="category-title">
            Posts based on {postsCategory[0]?.title}
          </h1>
          <PostsList posts={postsCategory} />{" "}
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Category;

import axios from "axios";
import { ADD_COMMENT_TO_POST, CLEAR_IS_POST_CREATED, CLEAR_LOADING, DELETE_COMMENT_POST, DELETE_POST, ERRORS, SET_IS_POST_CREATED, SET_LIKE, SET_LOADING, SET_POST, SET_POSTS, SET_POSTS_CATEGORY, SET_POSTS_COUNT, UPDATE_COMMENT_POST } from "../types";
import { toast } from "react-toastify";

export const fetchPosts = (pageNumber) => (dispatch) => {
    axios
        .get(`/api/posts`)
    .then((res) => {
      dispatch({
        type: SET_POSTS,
        payload: res.data
      });
    })
    .catch((err) => {
      dispatch({
        type: ERRORS,
        payload: err.response.data,
      });
    });
};
export const fetchSinglePost = (postId) => (dispatch) => {
    axios
        .get(`/api/posts/${postId}`)
    .then((res) => {
      dispatch({
        type: SET_POST,
        payload: res.data
      });
    })
    .catch((err) => {
      dispatch({
        type: ERRORS,
        payload: err.response.data,
      });
    });
};
export const toggleLikePost = (postId) => (dispatch) => {
    axios
        .put(`/api/posts/like/${postId}`, {})
    .then((res) => {
      dispatch({
        type: SET_LIKE,
        payload: res.data
      });
    })
    .catch((err) => {
      dispatch({
        type: ERRORS,
        payload: err.response.data,
      });
    });
};
 export  const updatePostImage = (newImage, postId) => (dispatch) => {
     axios.put(`/api/posts/update-image/${postId}`, newImage);
     toast.success("uploaded image successfully").catch((err) => {
       toast.success("uploaded image failed");
     });
   };
 export  const updatePost = (newPost, postId) => (dispatch) => {
     axios
       .put(`/api/posts/${postId}`, newPost)
       .then((res) => {
         dispatch({
           type: SET_POSTS,
           payload: res.data,
         });
       })
       .catch((err) => {
         toast.success("uploaded image failed");
       });
   };
 export  const deletePost = ( postId) => (dispatch) => {
     axios
       .delete(`/api/posts/${postId}`)
       .then((res) => {
toast.success(res.data.message)
       })
       .catch((err) => {
         dispatch({
           type: ERRORS,
           payload: err.response.data,
         });
       });
   };

export const fetchPostsBasedONCategory = (category) => (dispatch) => {
  axios
    .get(`/api/posts?category=${category}`)
    .then((res) => {
      dispatch({
        type: SET_POSTS_CATEGORY,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: ERRORS,
        payload: err.response.data,
      });
    });
};
export const createPost = (newPost) => (dispatch) => {
    dispatch({
      type: SET_LOADING });
    axios
      .post(`/api/posts`, newPost)
      .then((res) => {
        dispatch({
          type: SET_IS_POST_CREATED,
          payload: res.data,
        });
        setTimeout(() => {
            dispatch({
              type: CLEAR_IS_POST_CREATED,
              payload: res.data,
            });
        }, 2000);
      })
      .catch((err) => {
        dispatch({
          type: CLEAR_LOADING,
          payload: err.response.data,
        });
      });
};
export const createCommment = (newCommment) => (dispatch) => {
  axios
    .post(`/api/comment`, newCommment)
    .then((res) => {
      dispatch({
        type: ADD_COMMENT_TO_POST,
        payload: res.data,
      });
    })
}
export const updateCommment = (comment , commentId) => (dispatch) => {
  axios.put(`/api/comment/${commentId}`, comment).then((res) => {
    dispatch({
      type: UPDATE_COMMENT_POST,
      payload: res.data,
    });
  });
}
export const deleteCommment = (commentId) => (dispatch) => {
  axios.delete(`/api/comment/${commentId}`).then((res) => {
    dispatch({
      type: DELETE_COMMENT_POST,
      payload: res.data,
    });
  });
}





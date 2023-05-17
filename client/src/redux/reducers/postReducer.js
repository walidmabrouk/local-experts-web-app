import { ADD_COMMENT_TO_POST, CLEAR_IS_POST_CREATED, CLEAR_LOADING, DELETE_COMMENT_POST, DELETE_POST, SET_IS_POST_CREATED, SET_LIKE, SET_LOADING, SET_POST, SET_POSTS, SET_POSTS_CATEGORY, SET_POSTS_COUNT, UPDATE_COMMENT_POST } from "../types";

const initialState = {
  posts: [],
  postsCount: null,
  loading: false,
  isPostCreated: false,
  post: null,
};
export default function postsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    case SET_POST:
      return {
        ...state,
        post: action.payload,
      };
    case SET_LIKE:
      return {
        ...state,
        like: action.payload,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((p) => p._id !== action.payload),
      };
    case SET_POSTS_CATEGORY:
      return {
        ...state,
        posts_category: action.payload,
      };
    case SET_POSTS_COUNT:
      return {
        ...state,
        postsCount: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CLEAR_LOADING:
      return {
        ...state,
        loading: false,
      };
    case SET_IS_POST_CREATED:
      return {
        ...state,
        isPostCreated: true,
        loading: false,
      };
    case CLEAR_IS_POST_CREATED:
      return {
        ...state,
        isPostCreated: false,
      };
    case ADD_COMMENT_TO_POST:
      return {
        ...state,
        post: {
          ...state.post,
          comments: action.payload,
        },
      };
    case UPDATE_COMMENT_POST:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.map((comment) =>
            comment._id === action.payload._id ? action.payload : comment
          ),
        },
      };
    // case DELETE_COMMENT_POST:
    //   return {
    //     ...state,
    //     comment: state.post.comments.find((c) => c._id === action.payload),
    //     commentIndex: state.post.comments.indexOf(comment),
    //   };
    case DELETE_COMMENT_POST:
      const commentIndex = state.post.comments.findIndex(
        (c) => c._id === action.payload
      );

      return {
        ...state,
        post: {
          ...state.post,
          comments: [
            ...state.post.comments.slice(0, commentIndex),
            ...state.post.comments.slice(commentIndex + 1),
          ],
        },
      };

    default:
      return state;
  }
}

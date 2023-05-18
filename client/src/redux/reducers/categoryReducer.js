import {
  DELETE_POST,
  SET_CATEGORIES,
  SET_POST,
  SET_POSTS,
  SET_SUB_CATEGORIES,

} from "../types";

const initialState = {
    categories : [],
}; 
export default function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case SET_SUB_CATEGORIES:
      return {
        ...state,
        subCategories: action.payload,
      };
    case SET_POST:
      return {
        ...state,
        post: action.payload,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((p) => p._id !== action.payload),
      };

    default:
      return state;
  }
}

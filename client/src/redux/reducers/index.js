import { combineReducers } from "redux";

import authReducer from './authReducer'
import errorsReducer from './errorsReducer'
import profileReducer from './profileReducer'
import postsReducer from "./postReducer";
import categoryReducer from "./categoryReducer";
export default combineReducers({
    auth: authReducer,
    errors: errorsReducer,
    profiles: profileReducer,
    posts: postsReducer,
    categories: categoryReducer,
})
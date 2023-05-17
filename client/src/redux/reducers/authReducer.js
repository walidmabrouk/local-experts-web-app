import isEmpty from "../../util/isEmpty";
import { SET_IS_EMAIL_VERIFIED, SET_USER } from "../types";

const initialState = {
  isConnected: false,
  user: {},
  isEmailVerified: false,
};
export default function aa (state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state, 
        isConnected: !isEmpty(action.payload),
        user: action.payload,
      };
    case SET_IS_EMAIL_VERIFIED:
      return {
        ...state,
        isEmailVerified: true,
      };

    default:
      return state;
  }
}

import { ERRORS } from "../types";

const initialState = {}
export default function bb (state = initialState, action){
  switch (action.type) {
      case ERRORS:
          return action.payload
  
      default:
          return state
  }
}
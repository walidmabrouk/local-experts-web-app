import axios from "axios";
import { ERRORS, SET_CATEGORIES, SET_SUB_CATEGORIES } from "../types";

export const fetchCategories = () => (dispatch) => {
  axios
    .get("/api/categories")
    .then((res) => {
      dispatch({
        type: SET_CATEGORIES,
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
export const fetchSubCategories = () => (dispatch) => {
  axios
    .get("/api/subcategories/")
    .then((res) => {
      dispatch({
        type: SET_SUB_CATEGORIES,
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

// export const GetProfile = () => (dispatch) => {
//   axios
//     .get("/api/profile")
//     .then((res) => {
//       dispatch({
//         type: SET_PROFILE,
//         payload: res.data,
//       });
//     })
//     .catch((err) => {
//       dispatch({
//         type: ERRORS,
//         payload: err.response.data,
//       });
//     });
// };

// export const GetProfiles = () => (dispatch) => {
//   axios
//     .get("/api/profiles")
//     .then((res) => {
//       dispatch({
//         type: SET_PROFILES,
//         payload: res.data,
//       });
//     })
//     .catch((err) => {
//       dispatch({
//         type: ERRORS,
//         payload: err.response.data,
//       });
//     });
// };

// export const DeleteProfile = (id) => (dispatch) => {
//   if (window.confirm("are you sure to delete this user?")) {
//     axios
//       .delete(`/api/profiles/${id}`)
//       .then((res) => {
//         dispatch({
//           type: DELETE_PROFILE,
//           payload: id,
//         });
//       })
//       .catch((err) => {
//         dispatch({
//           type: ERRORS,
//           payload: err.response.data,
//         });
//       });
//   }
// };

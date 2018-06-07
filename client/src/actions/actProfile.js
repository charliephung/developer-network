import * as Types from "../constants/ActionTypes";
import axios from "axios";

// Get current user profile
export const actGetUserProfile = () => dispatch => {
  dispatch(actSetProfileLoading());
  axios
    .get("api/profiles")
    .then(res => {
      dispatch({
        type: Types.GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: Types.GET_PROFILE,
        payload: {}
      });
    });
};

// Get all profiles
export const actGetAllProfiles = () => dispatch => {
  dispatch(actSetProfileLoading());
  axios
    .get("/api/profiles/all")
    .then(res => {
      dispatch({
        type: Types.GET_PROFILES,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: Types.GET_PROFILES,
        payload: null
      });
    });
};

// Create profile: submit user profile
export const actSubmitUserProfile = (userProfile, history) => dispatch => {
  axios
    .post("/api/profiles", userProfile)
    .then(res => {
      history.push("/dashboard");
    })
    .catch(err => {
      dispatch({
        type: Types.GET_ERRORS,
        payload: err.response.data
      });
    });
};
// Get user profile by handle
export const actGetUserProfileByHandle = handle => dispatch => {
  dispatch(dispatch(actSetProfileLoading()));
  axios
    .get("/api/profiles/handles/" + handle)
    .then(res => {
      dispatch({
        type: Types.GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: Types.GET_PROFILE,
        payload: {}
      });
    });
};

// Add education to profile
export const actSubmitUserEducation = (userEducation, history) => dispatch => {
  axios
    .post("/api/profiles/educations", userEducation)
    .then(res => {
      history.push("/dashboard");
    })
    .catch(err => {
      dispatch({
        type: Types.GET_ERRORS,
        payload: err.response.data
      });
    });
};
// delete education field
export const actDeleteUserEducation = (id, history) => dispatch => {
  axios
    .delete("/api/profiles/educations/" + id)
    .then(res => {
      dispatch({
        type: Types.GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err => {
      history.push("/errors");
      dispatch({
        type: Types.GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Add experience to profile
export const actSubmitUserExperience = (
  userExperience,
  history
) => dispatch => {
  axios
    .post("/api/profiles/experiences", userExperience)
    .then(res => {
      history.push("/dashboard");
    })
    .catch(err => {
      dispatch({
        type: Types.GET_ERRORS,
        payload: err.response.data
      });
    });
};
// delete education field
export const actDeleteUserExperience = (id, history) => dispatch => {
  axios
    .delete("/api/profiles/experiences/" + id)
    .then(res => {
      dispatch({
        type: Types.GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err => {
      history.push("/errors");
      dispatch({
        type: Types.GET_ERRORS,
        payload: err.response.data
      });
    });
};

// State profile to loading state
export const actSetProfileLoading = () => {
  return {
    type: Types.PROFILE_LOADING
  };
};
// State clear profile when logout
export const actClearUserProfile = () => {
  return {
    type: Types.CLEAR_PROFILE
  };
};

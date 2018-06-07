import axios from "axios";
import jwt_decode from "jwt-decode";
import * as Types from "../constants/ActionTypes";
import setAuthToken from "../utils/setAuthToken";

export const actRegisterUser = (userData, history) => dispatch => {
  axios
    .post("api/user/register", userData)
    .then(res => history.push("/"))
    .catch(err => {
      dispatch({
        type: Types.GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const actLoginUser = (userData, history) => dispatch => {
  axios
    .post("api/user/login", userData)
    .then(res => {
      // Taken bearer token
      const { token } = res.data;
      // Set token to localStorage
      localStorage.setItem("jwtToken", token);
      // Set token to auth header for request private route
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(actSetCurrentUser(decoded));
    })
    .catch(err => {
      dispatch({
        type: Types.GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Verify user
export const actVerifyUser = (code, history) => dispatch => {
  axios
    .post("api/user/verify/" + code)
    .then(res => {
      dispatch(actLogoutUser());
      history.push("login");
    })
    .catch(err => {
      dispatch({
        type: Types.GET_ERRORS,
        payload: err.response.data
      });
    });
};
// Sent verify code
export const actSendCode = () => dispatch => {
  axios.get("api/user/sendcode");
};

// Set current user
export const actSetCurrentUser = decoded => {
  return {
    type: Types.SET_CURRENT_USER,
    payload: decoded
  };
};

// Logout
export const actLogoutUser = history => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(actSetCurrentUser({}));
};

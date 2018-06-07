import * as Types from "../constants/ActionTypes";
import isEmpty from "../utils/isEmpty";
let initialState = {
  isAuthenticated: false,
  user: {}
};

const authReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case Types.SET_CURRENT_USER:
      return {
        ...state,
        user: actions.payload,
        isAuthenticated: !isEmpty(actions.payload)
      };

    default:
      return {
        ...state
      };
  }
};

export default authReducer;

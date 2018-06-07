import * as Types from "../constants/ActionTypes";

let initialState = {};

const errReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case Types.GET_ERRORS:
      return {
        ...actions.payload
      };
    case Types.CLEAR_ERRORS:
      return {};
    default:
      return {
        ...state
      };
  }
};

export default errReducer;

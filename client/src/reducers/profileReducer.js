import * as Types from "../constants/ActionTypes";

const initialState = {
  profile: null,
  profiles: null,
  loading: false
};

export const profileReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case Types.PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    case Types.GET_PROFILE:
      return {
        ...state,
        profile: actions.payload,
        loading: false
      };
    case Types.GET_PROFILES:
      return {
        ...state,
        profiles: actions.payload,
        loading: false
      };
    case Types.CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        profiles: null,
        loading: false
      };
    default:
      return {
        ...state
      };
  }
};

export default profileReducer;

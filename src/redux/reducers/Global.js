import * as ActionType from "../actionType";

const INITIAL_STATE = {
  user: null,
  message: "",
  likes: [],
  unlikes: [],
  matchings: []
  
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionType.GET_USER_OK:
      return {
        ...state,
        user: action.payload.user
      };
    case ActionType.GET_USER_NOK:
      return {
        ...state,
        message: action.payload.message
      };
    case ActionType.UPDATE_USER_OK:
      //console.log('redux user updated', action.payload.user)
      return {
        ...state,
        user: action.payload.user
      };
    case ActionType.UPDATE_USER_NOK:
      return {
        ...state,
        message: action.payload.message
      };
    case ActionType.LOGIN_OK:
      //console.log('redux user updated', action.payload.user)
      return {
        ...state,
        user: action.payload.user
      };
    case ActionType.LOGIN_NOK:
      return {
        ...state,
        message: action.payload.message
      };
    case ActionType.UPDATE_LIKE_OK:
      //console.log('redux user updated', action.payload.user)
      return {
        ...state,
        likes: action.payload.user
      };
    case ActionType.UPDATE_LIKE_NOK:
      return {
        ...state,
        message: action.payload.message
      };
      case ActionType.UPDATE_UNLIKE_OK:
        //console.log('redux user updated', action.payload.user)
        return {
          ...state,
          unlikes: action.payload.user
        };
      case ActionType.UPDATE_UNLIKE_NOK:
        return {
          ...state,
          message: action.payload.message
        };
        case ActionType.UPDATE_MATCH_OK:
        //console.log('redux user updated', action.payload.user)
        return {
          ...state,
          matchings: action.payload.matchings
        };
    default:
      return state;
  }
};

export default reducer;

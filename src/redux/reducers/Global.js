import * as ActionType from "../actionType";

const INITIAL_STATE = {
  user: null,
  message: "",

 
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
    
    default:
      return state;
  }
};

export default reducer;

import * as ActionType from "../actionType";

const INITIAL_STATE = {
  user: null,
  message: "",
  likes: [],
  unlikes: [],
  matchings: [],
  person: null,
  images: []
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
        likes: action.payload.likes
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
        unlikes: action.payload.unlikes
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
    case ActionType.UPDATE_IMAGES_OK:
      // console.log('redux user UPDATE_IMAGES_OK', action.payload.images)
      return {
        ...state,
        images: action.payload.images
      };
    case ActionType.GET_PERSON_OK:
      return {
        ...state,
        person: action.payload.person
      };
    default:
      return state;
  }
};

export default reducer;

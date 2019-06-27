import * as ActionType from "./actionType";

import * as API from "../services/Api";

export const loginFB = async () => {
  const res = await API.signInWithFacebook1();

  console.log(res);

  if (res.status)
    return {
      type: ActionType.LOGIN_OK,
      payload: {
        user: res.data
      }
    };
  else {
    return {
      type: ActionType.LOGIN_NOK,
      payload: {
        message: 'Login failed.'
      }
    };
  }
};

export const getUser = async (uid) => {
  const res = await API.getUser_API(uid);

  console.log(res);

  if (res.status)
    return {
      type: ActionType.GET_USER_OK,
      payload: {
        user: res.data
      }
    };
  else {
    return {
      type: ActionType.GET_USER_NOK,
      payload: {
        message: res.message
      }
    };
  }
};

export const updateUser = async (email, udpUser) => {
  const res = await API.updUser_API(email, udpUser);

  if (res.status)
    return {
      type: ActionType.UPDATE_USER_OK,
      payload: {
        user: res.data
      }
    };
  else {
    return {
      type: ActionType.GET_USER_NOK,
      payload: {
        message: res.message
      }
    };
  }

};

export const like = async (email, creditChange) => {
  
    const res = await API.updCredit_API(email, creditChange);

    if (res.status)
    return {
      type: ActionType.UPDATE_USER_OK,
      payload: {
        user: res.data
      }
    };
  else {
    return {
      type: ActionType.GET_USER_NOK,
      payload: {
        message: res.message
      }
    };
  }

};

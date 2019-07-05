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
        message: "Login failed."
      }
    };
  }
};

export const getUser = async uid => {
  const res = await API.getUser_API(uid);

  //console.log(res);

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

export const getPerson = async uid => {
  const res = await API.getUser_API(uid);



  if (res.status)
    return {
      type: ActionType.GET_PERSON_OK,
      payload: {
        person: res.data
      }
    };
  else {
    return {
      type: ActionType.GET_PERSON_NOK,
      payload: {
        message: res.message
      }
    };
  }
};

export const updateUser = async (uid, udpUser) => {
  const res = await API.updUser_API(uid, udpUser);

  if (res.status)
    return {
      type: ActionType.UPDATE_USER_OK,
      payload: {
        user: res.data
      }
    };
  else {
    return {
      type: ActionType.UPDATE_USER_NOK,
      payload: {
        message: res.message
      }
    };
  }
};

//uid - firebase uid - key
//who is user - object
//supperLike - bool
export const like = async (uid, who, supperLike) => {
  const res = await API.like_API(uid, who, supperLike);

  if (res.status)
    return {
      type: ActionType.UPDATE_LIKE_OK,
      payload: {
        likes: res.data
      }
    };
  else {
    return {
      type: ActionType.UPDATE_LIKE_NOK,
      payload: {
        message: res.message
      }
    };
  }
};

//uid - firebase uid - key
//who is user - object
export const unlike = async (uid, who) => {
  const res = await API.unlike_API(uid, who);

  if (res.status)
    return {
      type: ActionType.UPDATE_UNLIKE_OK,
      payload: {
        unlikes: res.data
      }
    };
  else {
    return {
      type: ActionType.UPDATE_UNLIKE_NOK,
      payload: {
        message: res.message
      }
    };
  }
};

//uid - firebase uid - key
//who is user - object
export const checkMatch = async (uid, who) => {
  const res = await API.checkMatch_API(uid, who);
  // console.log('checkMatch', res)
  if (res.status)
    return {
      type: ActionType.UPDATE_MATCH_OK,
      payload: {
        matchings: res.data
      }
    };
  else {
    return {
      type: ActionType.UPDATE_MATCH_NOK,
      payload: {
        message: res.message
      }
    };
  }
};

//uid - firebase uid - key
export const getMatchings = async (uid) => {
  const res = await API.getMatchings_API(uid);
  // console.log('checkMatch', res)
  if (res.status)
    return {
      type: ActionType.UPDATE_MATCH_OK,
      payload: {
        matchings: res.data
      }
    };
  else {
    return {
      type: ActionType.UPDATE_MATCH_NOK,
      payload: {
        message: res.message
      }
    };
  }
};

//uid - firebase uid - key
//image name - unique
//uri - downloadable URI
export const updateUserImages = async (uid, image, uri) => {
  const res = await API.updUserImages_API(uid, image, uri);
  // console.log('checkMatch', res)
  if (res.status)
    return {
      type: ActionType.UPDATE_IMAGES_OK,
      payload: {
        images: res.data
      }
    };
  else {
    return {
      type: ActionType.UPDATE_IMAGES_NOK,
      payload: {
        message: res.message
      }
    };
  }
};

//uid - firebase uid - key
export const getImages = async (uid) => {
  const res = await API.getImages_API(uid);
  // console.log('checkMatch', res)
  if (res.status)
    return {
      type: ActionType.UPDATE_IMAGES_OK,
      payload: {
        images: res.data
      }
    };
  else {
    return {
      type: ActionType.UPDATE_IMAGES_NOK,
      payload: {
        message: res.message
      }
    };
  }
};

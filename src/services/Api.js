import { store, auth, firebase } from "../constants/database";

import uuid from "uuid";
import moment from "moment";
import Axios from "axios";
import superagent from "superagent";
import config from "../constants/config";
import { Facebook } from "expo";

const API_KEY = "";

export const signInWithFacebook1 = async () => {
  try {
    // return null;
  } catch (error) {
    throw error;
  }

  const appId = config.facebook.appId;
  const permissions = ["public_profile", "email"]; // Permissions required, consult Facebook docs - , 'user_birthday', 'user_photos', 'user_gender'

  const { type, token } = await Facebook.logInWithReadPermissionsAsync(appId, {
    permissions
  });

  switch (type) {
    case "success": {
      await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL); // Set persistent auth state
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      const facebookProfileData = await auth.signInWithCredential(credential); // Sign in with Facebook credential

      // Do something with Facebook profile data
      // OR you have subscribed to auth state change, authStateChange handler will process the profile data
      console.log(facebookProfileData.user);

      const {
        displayName,
        email,
        phoneNumber,
        photoURL,
        uid,
        providerData
      } = facebookProfileData.user;

      let ref = store.collection("users").doc(uid);

      const ss = await ref.get();

      let item = {};

      if (!ss.exists) {
        item = {
          name: displayName,
          age: 0,
          college: "",
          image: "",
          num: 0,
          email,
          fb_uid: providerData[0].uid,
          uid,
          gender: ""
        };

        ref.set(item);

        //return user;
      } else {
        item = ss.data();
      }

      return { status: true, data: item };
    }
    case "cancel": {
      return { status: false };
    }
  }
};

export const getUsers_API = async () => {
  try {
    let ref = store.collection("users");

    const querySS = await ref.get();

    if (querySS.empty) {
      return {
        status: false,
        message: "No data found"
      };
    }

    const users = querySS.docs.map(docSS => {
      const user = docSS.data();
      if (user.uid != auth.currentUser.uid) {
        return user;
      }
      return null;
    });

    return {
      status: true,
      data: users.filter(i => i != null)
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "ERROR: " + error.message
    };
  }
};

export const getMatchings_API = async uid => {
  try {
    const querySS = await store
      .collection("users")
      .doc(uid)
      .collection("matchings")
      .get();

    if (querySS.empty) {
      return {
        status: false,
        message: "No data found"
      };
    }

    const matchings = querySS.docs.map(docSS => {
      return docSS.data();
    });

    return {
      status: true,
      data: matchings
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "ERROR: " + error.message
    };
  }
};

export const getUser_API = async uid => {
  try {
    let ref = store.collection("users").doc(uid);

    const docSS = await ref.get();

    if (docSS == null) {
      return {
        status: false,
        message: "No user found. uid: " + uid
      };
    }
    return {
      status: true,
      data: docSS.data()
    };
  } catch (error) {
    console.log(error.message);
    return {
      status: false,
      message: "ERROR: " + error.message
    };
  }
};

export const getUsersNearby_API = async ({ long, lat }) => {
  try {
    // ~1 mile of lat and lon in degrees
    let lat1 = 0.0144927536231884;
    let long1 = 0.0181818181818182;

    let lowerLat = lat - lat1 * 10;
    let lowerLon = long - long1 * 10;

    let greaterLat = lat + lat1 * 10;
    let greaterLon = long + long1 * 10;

    let ref = store
      .collection("users")
      .where("lat", ">=", lowerLat)
      .where("lat", "<=", greaterLat);

    const querySS = await ref.get();

    if (querySS.empty) {
      return {
        status: false,
        message: "No data found"
      };
    }

    const users = querySS.docs.map(docSS => {
      // const user = docSS.data()
      // if(user != email)
      return docSS.data();
    });

    return {
      status: true,
      data: users
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "ERROR: " + error.message
    };
  }
};

export const getVenue_API = async ({ long, lat }) => {
  try {
    // ~1 mile of lat and lon in degrees

    let ref = store
      .collection("venues")
      .where("lat", "==", lat)
      .where("lat", "==", long);

    const querySS = await ref.get();

    if (querySS.empty) {
      return {
        status: false,
        message: "No data found"
      };
    }

    const venue = querySS.docs[0].data();

    return {
      status: true,
      data: venue
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "ERROR: " + error.message
    };
  }
};

export const getMatchingUsersNearby_API = async ({
  email,
  age,
  gender,
  long,
  lat
}) => {
  try {
    // ~1 mile of lat and lon in degrees
    let lat1 = 0.0144927536231884;
    let long1 = 0.0181818181818182;

    let lowerLat = lat - lat1 * 10;
    let lowerLon = long - long1 * 10;

    let greaterLat = lat + lat1 * 10;
    let greaterLon = long + long1 * 10;

    let ref = store
      .collection("users")
      .where("lat", ">=", lowerLat)
      .where("lat", "<=", greaterLat);

    const querySS = await ref.get();

    if (querySS.empty) {
      return {
        status: false,
        message: "No data found"
      };
    }

    const users = querySS.docs.map(docSS => {
      const user = docSS.data();
      if (
        user.email != email &&
        user.ageMin <= age &&
        user.ageMax >= age &&
        user.genderTarget == gender
      )
        return docSS.data();
    });

    return {
      status: true,
      data: users
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "ERROR: " + error.message
    };
  }
};

export const updUser_API = async (uid, udpUser) => {
  try {
    let ref = store.collection("users").doc(uid);

    const docSS = await ref.get();
    const data = docSS.data();

    const newUser = {
      ...data,
      ...udpUser
    };

    await ref.update(newUser);

    return {
      status: true,
      data: newUser
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "ERROR: " + error.message
    };
  }
};

export const updUserImages_API = async (uid, image, uri) => {
  try {
    let ref = store
      .collection("users")
      .doc(uid)
      .collection("images")
      .doc(image);

    const ss = await ref.get();

    if (!ss.exists) {
      // console.log('checkMatch_API', who)
      const image = {
        uri: uri,
        id: image
      };
      ref.set(image);
    }

    const querySS = await store
      .collection("users")
      .doc(uid)
      .collection("images")
      .get();

    const images = querySS.docs.map(docSS => {
      return docSS.data();
    });

    return {
      status: true,
      data: images
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "ERROR: " + error.message
    };
  }
};

export const getImages_API = async uid => {
  try {
    const querySS = await store
      .collection("users")
      .doc(uid)
      .collection("images")
      .get();

    if (querySS.empty) {
      return {
        status: false,
        message: "No data found"
      };
    }

    const matchings = querySS.docs.map(docSS => {
      return docSS.data();
    });

    return {
      status: true,
      data: images
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "ERROR: " + error.message
    };
  }
};

export const like_API = async (uid, who, supperLike) => {
  try {
    let ref = store
      .collection("users")
      .doc(uid)
      .collection("likes")
      .doc(who.uid);

    const ss = await ref.get();

    if (!ss.exists) {
      const item = {
        name: who.name,
        age: who.age,
        email: who.email,
        uid: who.uid,
        supperLike
      };
      ref.set(item);
    }

    const querySS = await store
      .collection("users")
      .doc(uid)
      .collection("likes")
      .get();

    const likes = querySS.docs.map(docSS => {
      return docSS.data();
    });

    return {
      status: true,
      data: likes
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "ERROR: " + error.message
    };
  }
};

export const unlike_API = async (uid, who) => {
  try {
    let ref = store
      .collection("users")
      .doc(uid)
      .collection("unlikes")
      .doc(who.uid);

    const ss = await ref.get();

    if (!ss.exists) {
      const item = {
        name: who.name,
        age: who.age,
        email: who.email,
        uid: who.uid
      };
      ref.set(item);
    }

    const querySS = await store
      .collection("users")
      .doc(uid)
      .collection("unlikes")
      .get();

    const unlikes = querySS.docs.map(docSS => {
      return docSS.data();
    });

    return {
      status: true,
      data: unlikes
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "ERROR: " + error.message
    };
  }
};

export const checkMatch_API = async (uid, who) => {
  try {
    let refPerson = store
      .collection("users")
      .doc(who.uid)
      .collection("likes")
      .doc(uid);

    const ss = await refPerson.get();

    if (!ss.exists || true) {
      // console.log('checkMatch_API', who)
      const match = {
        name: who.name,
        age: who.age,
        email: who.email,
        uid: who.uid,
        image: who.image,
      };
      let ref = store
        .collection("users")
        .doc(uid)
        .collection("matchings")
        .doc(who.uid);
      ref.set(match);

      //reverse
      const docMe = await store
        .collection("users")
        .doc(uid)
        .get();
      const me = docMe.data();
      const matchMe = {
        name: me.name,
        age: me.age,
        email: me.email,
        uid: me.uid,
        image: me.image,
      };
      let refPerson = store
        .collection("users")
        .doc(who.uid)
        .collection("matchings")
        .doc(uid);
      refPerson.set(matchMe);
    }

    const querySS = await store
      .collection("users")
      .doc(uid)
      .collection("matchings")
      .get();

    const matchings = querySS.docs.map(docSS => {
      return docSS.data();
    });

    return {
      status: true,
      data: matchings
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "ERROR: " + error.message
    };
  }
};

export const fetchPrediction = async (queryString, gpsLoc) => {
  try {
    const url = `https://maps.googleapis.com/maps/api/place/queryautocomplete/json?key=${API_KEY}
    &input=${queryString}&location=${gpsLoc[1]},${gpsLoc[0]}&radius=50000`;

    //console.log(url);
    const res = await Axios({
      method: "get",
      url: url
    });

    //console.log(res.data)

    return res.data && res.data.predictions;
  } catch (error) {
    console.log(error);
  }
};

export const fetchCoordinatesFromAddressAsync = async address => {
  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`;

    console.log(url);
    const res = await Axios({
      method: "get",
      url: url
    });

    //console.log(JSON.stringify(res))

    const item = {
      geo: {
        long: res.data.results[0].geometry.location.lng,
        lat: res.data.results[0].geometry.location.lat
      },
      formatted_address: res.data.results[0].formatted_address,
      id: res.data.results[0].place_id
    };

    return item;
  } catch (error) {
    console.log(error);
  }
};

export const fetchAddressFromCoordinatesAsync = async (long, lat) => {
  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${API_KEY}`;

    console.log(url);
    const res = await Axios({
      method: "get",
      url: url
    });

    //console.log(JSON.stringify(res))

    const item = {
      geo: {
        long: res.data.results[0].geometry.location.lng,
        lat: res.data.results[0].geometry.location.lat
      },
      formatted_address: res.data.results[0].formatted_address
    };

    return null;
  } catch (error) {
    console.log(error);
  }
};

export const fetchPlace = async place_id => {
  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${place_id}&key=${API_KEY}`;

    console.log(url);

    const res = await superagent.get(url);

    //console.log(JSON.stringify(res.body));
    const item = res.body && res.body.result;
    if (item) {
      return {
        vicinity: item.formatted_address,
        icon: item.icon,
        geo: {
          long: item.geometry.location.lng,
          lat: item.geometry.location.lat
        },
        photoreference: "",
        name: item.name,
        id: item.place_id
      };
    }

    return null;
  } catch (error) {
    console.log(error);
  }
};

export const fetchLocations = async gpsLoc => {
  try {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${API_KEY}
    &location=${gpsLoc[1]},${gpsLoc[0]}&radius=5000`;

    //console.log(url);
    const res = await superagent.get(url);

    //console.log(JSON.stringify(res.body.results));
    const list =
      res.body &&
      res.body.results.map(item => {
        return {
          vicinity: item.vicinity,
          icon: item.icon,
          geo: {
            long: item.geometry.location.lng,
            lat: item.geometry.location.lat
          },
          photoreference: Array.isArray(item.photos)
            ? item.photos[0].photo_reference
            : "", //https://maps.googleapis.com/maps/api/place/photo?parameters
          name: item.name,
          id: item.place_id
        };
      });

    //console.log(list)

    return list;
  } catch (error) {
    console.log(error);
  }
};

export const uploadImage = async (uid, uri, imageName) => {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();

    var ref = firebase
      .storage()
      .ref()
      .child(`images/${uid}/${imageName}`);
    const res = await ref.put(blob);

    return res.ref.getDownloadURL();
  } catch (error) {
    console.log(error);
  }
};

export const deleteImage = async (uid, imageName) => {
  try {
    var ref = firebase
      .storage()
      .ref()
      .child(`images/${uid}/${imageName}`);

    const uri = await ref.getDownloadURL();

    if (uri.length > 0) {
      ref.delete();
      return 'File Deleted'
    } else return "File Not Found";
  } catch (error) {
    console.log(error);
    return null;
  }
};

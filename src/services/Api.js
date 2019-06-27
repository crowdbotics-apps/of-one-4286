import { store, auth } from "../constants/database";
import uuid from "uuid";
import moment from "moment";
import Axios from "axios";
import superagent from "superagent";
const API_KEY = ""; 

export const getUser_API = async ({ email }) => {
  try {
    let id = uuid();

    let ref = store.collection("users").where("email", "==", email);

    const querySS = await ref.get();

    if (querySS.empty) {
      return {
        status: false,
        message: "No user found. email: " + email
      };
    }
    return {
      status: true,
      data: querySS.docs[0].data()
    };
  } catch (error) {
    console.log(error);
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

export const getUsersInVenue_API = async ({ long, lat }) => {
  try {
    // ~1 mile of lat and lon in degrees

    let ref = store
      .collection("users")
      .where("lat", "==", Number(lat))
      .where("long", "==",  Number(long));

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

export const getVenueNearby_API = async ({ long, lat }) => {
  try {
    // ~1 mile of lat and lon in degrees
    let lat1 = 0.0144927536231884;
    let long1 = 0.0181818181818182;

    let lowerLat = lat - lat1 * 10;
    let lowerLon = long - long1 * 10;

    let greaterLat = lat + lat1 * 10;
    let greaterLon = long + long1 * 10;

    let ref = store
      .collection("venues")
      .where("lat", ">=", lowerLat)
      .where("lat", "<=", greaterLat);

    const querySS = await ref.get();

    if (querySS.empty) {
      return {
        status: false,
        message: "No data found"
      };
    }

    const venues = querySS.docs.map(docSS => {
      // const user = docSS.data()
      // if(user != email)
      return docSS.data();
    });

    return {
      status: true,
      data: venues
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

// {
//   email,
//   age,
//   gender,
//   genderTarget,
//   interesting,
//   ageMin,
//   ageMax,
//   dob,
//   credit,
//   status,
//   profile,
//   type,
//   long,
//   lat,
//   checkInAt,
// }

export const updUser_API = async (email, udpUser) => {
  try {
    let querySS = await store
      .collection("users")
      .where("email", "==", email)
      .get();

    // console.log(querySS, email)
    if (querySS.empty) {
      return {
        status: false,
        message: "No user found for this email/username: " + email
      };
    }

    //console.log(querySS.docs)

    const ref = querySS.docs[0].ref;
    const data = querySS.docs[0].data();

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

export const updCredit_API = async (email, creditChange) => {
  try {
    let querySS = await store
      .collection("users")
      .where("email", "==", email)
      .get();

    if (querySS.empty) {
      return {
        status: false,
        message: "No user found for this email/username: " + email
      };
    }

    const ref = querySS.docs[0].ref;
    const data = querySS.docs[0].data();

    const newUser = {
      ...data,
      credit: data.credit + creditChange
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

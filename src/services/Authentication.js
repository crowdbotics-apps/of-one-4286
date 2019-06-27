import { store, auth, firebase } from "../constants/database";
import uuid from "uuid";
import config from "../constants/config";
import { Facebook } from "expo";

export const signInWithFacebook = async () => {
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

      const id = uuid();
      let ref = store.collection("users").doc(uid);

      const ss = await ref.get();

      if (!ss.exists) {
        const item = {
          name: displayName,
          age: 0,
          college: "",
          image: photoURL,
          num: 0,
          email,
          fb_uid: providerData[0].uid,
          uid
        };
        ref.set(item);

        //return user;
      } 

      return Promise.resolve({ type: "success" });
    }
    case "cancel": {
      return Promise.reject({ type: "cancel" });
    }
  }
};

const getUserID = () => {
  return auth.currentUser
    ? auth.currentUser.uid
    : "00000000-0000-0000-0000-000000000000";
};

const getUserName = () => {
  return auth.currentUser ? auth.currentUser.displayName : "";
};

const signup = async ({ email, password, name, type }) => {
  try {
    let userCredential = await auth.createUserWithEmailAndPassword(
      email,
      password
    );

    console.log("update profile");
    //await userCredential.user.sendEmailVerification();
    await userCredential.user.updateProfile({
      displayName: name
    });

    //Store user
    console.log("store user" + userCredential.user.uid);
    let ref = store.collection("users").doc(userCredential.user.uid);

    const ss = await ref.get();

    if (!ss.exists) {
      ref.set({
        id: userCredential.user.uid,
        name: name,
        email: email,
        //password: password,
        profile: 0,
        credit: 0,
        status: 1,
        long: 0,
        lat: 0,
        type
        //more info
      });

      return userCredential.user;
    }
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

const addUser = async ({ username, name, type }) => {
  try {
    const id = uuid();
    let ref = store.collection("users").doc(username);

    const ss = await ref.get();

    if (!ss.exists) {
      const user = {
        id: username,
        name: name,
        email: username,
        profile: 0,
        credit: 0,
        status: 1,
        long: 0,
        lat: 0,
        type
        //more info
      };
      ref.set(user);

      return user;
    } else return null;

    // return null;
  } catch (error) {
    throw error;
  }
};

const sendEmailVerification = async () => {
  try {
    await auth.currentUser.sendEmailVerification({
      ios: {
        bundleId: "com.crowdbotics.anonymiss"
      },
      android: {
        packageName: "com.crowdbotics.anonymiss"
      }
    });
  } catch (error) {
    throw error;
  }
};

const login = async ({ email, password }) => {
  try {
    //let { email, password } = payload;
    let userCre = await auth.signInWithEmailAndPassword(email, password);
    if (userCre && userCre.user) return userCre.user;
    return null;
  } catch (error) {
    throw error;
  }
};

const forgotPassword = async email => {
  try {
    await auth.sendPasswordResetEmail(email);
  } catch (error) {
    throw error;
  }
};

const logout = async () => {
  try {
    //TODO:
    await auth.signOut();
  } catch (error) {
    throw error;
  }
};

const updUser = async ({
  email,
  age,
  gender,
  ageTarget,
  genderTarget,
  ageGap,
  interesting,
  ageMin,
  ageMax,
  dob
}) => {
  try {
    const uid = auth.currentUser.uid;

    let querySS = await store
      .collection("users")
      .where("email", "==", email)
      .get();

    let ref = querySS.docs[0].ref;

    await ref.update({
      age,
      gender,
      ageTarget,
      genderTarget,
      ageGap,
      interesting,
      ageMin,
      ageMax,
      dob
    });
  } catch (error) {
    throw error;
  }
};

const updVenue = async ({ location, address, localId, description, image }) => {
  try {
    const uid = auth.currentUser.uid;

    let ref = store.collection("users").doc(uid);
    await ref.update({
      location,
      address,
      localId,
      description,
      image,
      type: "VENUE"
    });
  } catch (error) {
    throw error;
  }
};

// const createUser = async (payload) => {
//   try {

//     const uid = uuid();
//     let ref = store.collection('users').doc(uid);
//     await store.runTransaction(async (transaction) => {
//       const doc = await transaction.get(ref);

//       if (!doc.exists) {
//         transaction.set(ref, {
//           id: uid,
//           name: payload.name,
//           email: payload.email,
//           password: payload.password,
//           age: payload.age,
//           child: payload.child,
//           masterId: payload.masterId,
//           status: 1,
//           dob: payload.dob,
//           plan: 0 //0: free, 1: monthly, 2: yearly, 3: lifetime
//         });
//       }
//       return;
//     });
//     return;
//   } catch (error) {
//     throw error;
//   }
// };

const getUser = async uid => {
  try {
    let ref = store.collection("users").doc(uid);
    const userDoc = await ref.get();
    const userData = userDoc.data();

    return userData;
  } catch (error) {
    throw error;
  }
};

const deleteUser = async uid => {
  try {
    //only master can delete associated user

    let ref = store.collection("users").doc(uid);

    await store.runTransaction(async transaction => {
      const doc = await transaction.get(ref);

      if (doc.exists) {
        transaction.update(ref, {
          status: 0
        });
      }
    });
  } catch (error) {
    throw error;
  }
};

export {
  signup,
  login,
  logout,
  updUser,
  updVenue,
  sendEmailVerification,
  forgotPassword,
  deleteUser,
  getUser,
  getUserID,
  getUserName,
  addUser
};

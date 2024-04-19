require("../config/Firebase");

import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  deleteUser,
  signInWithEmailAndPassword,
} from "firebase/auth";
import apiConfig from "./apiConfig";
import axios from "axios";
import { registerForPushNotificationsAsync } from "../api/pushNotifService";
const auth = getAuth();

const createUser = async userValidatedPayload => {
  const url = `${apiConfig.baseURL}/user/signup`;
  let FbaseUser;
  try {
    FbaseUser = await createUserWithEmailAndPassword(
      auth,
      userValidatedPayload.email,
      userValidatedPayload.password
    );
    await sendEmailVerification(FbaseUser.user);
    const response = await axios.post(url, {
      ...userValidatedPayload,
      firebaseId: FbaseUser.user.uid,
    });
    console.log("SUCCESS , user created");

    return response;
  } catch (err) {
    //to fix this , add more errors for users
    deleteUser(FbaseUser.user);
    console.error("Error creating user :", err);
    throw err;
  }
};

const setPreferences = async userPreferences => {
  const url = `${apiConfig.baseURL}/user/preferences`;
  console.log(userPreferences);
  try {
    const response = await axios.post(url, userPreferences);
    return response;
  } catch (err) {
    console.error("problem creating preferences", err);
    throw err;
  }
};

const getUserPreferences = async userId => {
  const url = `${apiConfig.baseURL}/user/preferences?userId=${userId}`;
  try {
    console.log(userId);
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    console.error("problem fetching preferences", err);
    throw err;
  }
};

const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const token = await registerForPushNotificationsAsync();
    console.log(token);
    // notificationListener.current =
    //   Notifications.addNotificationReceivedListener(notification => {
    //     setNotification(notification);
    //   });

    // responseListener.current =
    //   Notifications.addNotificationResponseReceivedListener(response => {
    //     console.log(response);
    //   });

    // Notifications.removeNotificationSubscription(notificationListener.current);
    //Notifications.removeNotificationSubscription(responseListener.current);
    return token;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    throw error;
  }
};

module.exports = { signIn, createUser, setPreferences, getUserPreferences };

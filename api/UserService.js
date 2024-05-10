require("../config/Firebase");
import * as FileSystem from "expo-file-system";

import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  deleteUser,
  signInWithEmailAndPassword,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import apiConfig from "./apiConfig";
import axios from "axios";
import { registerForPushNotificationsAsync } from "../api/pushNotifService";
const auth = getAuth();

const createUser = async userValidatedPayload => {
  const url = `${apiConfig.baseURL}/user/signup`;
  console.log("URL", url);
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

    console.log("SUCCESS: User created successfully");

    return response;
  } catch (err) {
    console.error("Error creating user:", err);
    // Handle Firebase errors
    if (FbaseUser) {
      await deleteUser(FbaseUser.user);
    }
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

const updateUserPreferences = async (userId, preferences) => {
  const url = `${apiConfig.baseURL}/user/preferences`;
  try {
    const response = await axios.put(url, preferences, {
      params: { userId },
    });
    console.log("preferences updated successfully", response.data);
    return response.data;
  } catch (error) {
    console.error("error updating preferences:", error.message);
    throw error;
  }
};

const signIn = async (email, password, navigation) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    navigation.navigate("Home");

    const token = await registerForPushNotificationsAsync();
    const url = `${apiConfig.baseURL}/user/token`;
    await axios.post(url, { userId: userCredential.user.uid, token });
    console.log(token);
    return;
  } catch (error) {
    throw error;
  }
};
const saveImage = async profileImage => {
  const imgDir = FileSystem.documentDirectory;

  if (!profileImage) {
    console.error("No image selected.");
    return null;
  }

  const filename = new Date().getTime() + ".jpg";

  try {
    const url = `${apiConfig.baseURL}/user/upload-image`;

    const formData = new FormData();
    formData.append("image", {
      uri: profileImage,
      name: filename,
      type: "image/jpg",
    });

    const response = await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const data = response.data;

    if (data.success) {
      console.log("Image uploaded successfully:", data.message);
      return data.imagePath;
    } else {
      console.error("Image upload failed:", data.error);
    }
  } catch (error) {
    console.error("Error uploading image:", error);
  }
};

const getUserInfo = async userId => {
  console.log(`${apiConfig.baseURL}`);
  const url = `${apiConfig.baseURL}/user/info?userId=${userId}`;
  try {
    console.log("fetching user data for ID", userId);
    const response = await axios.get(url);
    console.log("user data retrived successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("error retrieving user data", error);

    throw error;
  }
};

const updateUserInfo = async (userId, userData) => {
  const url = `${apiConfig.baseURL}/user/info`;
  try {
    const response = await axios.put(url, userData, {
      params: { userId },
    });
    console.log("User updated successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating user data:", error.message);
    throw error;
  }
};

const updateUserPassword = async (currentPassword, newPassword) => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("No user is currently signed in");
  }
  try {
    console.log("error here");
    await reauthenticateUser(currentPassword);
    console.log("successfully reauthenticated ");
    await updatePassword(user, newPassword);
    console.log("password updated successfully");
  } catch (error) {
    console.error("Failed to update password:", error.message);
    throw error;
  }
};

const reauthenticateUser = async currentPassword => {
  const user = auth.currentUser;
  const credential = EmailAuthProvider.credential(user.email, currentPassword);
  console.log("credential", credential);
  try {
    await reauthenticateWithCredential(user, credential);
  } catch (error) {
    console.error("reauthentication failed", error.message);
    throw error;
  }
};

const createCar = async createCar => {
  const url = `${apiConfig.baseURL}/user/car`;
  console.log(createCar);
  try {
    const response = await axios.post(url, createCar);
    return response;
  } catch (err) {
    console.error("problem creating car", err);
    throw err;
  }
};

const getUserCar = async userId => {
  const url = `${apiConfig.baseURL}/user/car?userId=${userId}`;
  try {
    console.log(userId);
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    console.error("problem fetching car", err);
    throw err;
  }
};

const updateUserCar = async (carId, carData) => {
  const url = `${apiConfig.baseURL}/user/car`;
  try {
    const response = await axios.put(url, carData, {
      params: { userId },
    });
    console.log("car updated successfully", response.data);
    return response.data;
  } catch (error) {
    console.error("error updating car data:", error.message);
  }
};

const deletePushToken = async userId => { 
  const url = `${apiConfig.baseURL}/user/token?userId=${userId}`;
  try {
    await axios.delete(url);
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  signIn,
  createUser,
  setPreferences,
  getUserPreferences,
  updateUserPassword,
  saveImage,
  createCar,
  getUserCar,
  getUserInfo,
  updateUserInfo,
  updateUserPreferences,
  updateUserCar,
  deletePushToken,
};

require("../config/Firebase");
import * as FileSystem from 'expo-file-system';

import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  deleteUser,
  signInWithEmailAndPassword,
} from "firebase/auth";
import apiConfig from "./apiConfig";
import axios from "axios";
const auth = getAuth();

const createUser = async (userValidatedPayload) => {
  const url = `${apiConfig.baseURL}/user/signup`;
  console.log("URL" , url);
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


const setPreferences = async (userPreferences) => {
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
const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    return user;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
    throw error;
  }
};

const saveImage = async (profileImage) => {
  const imgDir = FileSystem.documentDirectory;

  if (!profileImage) {
      console.error('No image selected.');
      return null;
  }

  const filename = new Date().getTime() + '.jpg';

  try {
    const url = `${apiConfig.baseURL}/user/upload-image`; 

  const formData = new FormData();
  formData.append('image', {
      uri: profileImage,
      name: filename,
      type: 'image/jpg',
  });

  const response = await axios.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
      });

      const data = response.data;

      if (data.success) {
          console.log('Image uploaded successfully:', data.message);
          return data.imagePath;
      } else {
          console.error('Image upload failed:', data.error);
      }
  } catch (error) {
      console.error('Error uploading image:', error);
  }
};

module.exports = { signIn, createUser, setPreferences , saveImage };

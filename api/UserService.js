import axios from "axios";
import apiConfig from "./apiConfig";
require("../config/Firebase");
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
const auth = getAuth();

const userApiService = {
  createUser: async userValidatedPayload => {
    const url = `${apiConfig.baseURL}/user/signup`;
    console.log(userValidatedPayload);
    try {
      const FbaseUser = await createUserWithEmailAndPassword(
        auth,
        userValidatedPayload.email,
        userValidatedPayload.password
      );
      console.log(FbaseUser.user.uid);
      await sendEmailVerification(FbaseUser.user);
      const response = await axios.post(url, {
        ...userValidatedPayload,
        firebaseId: FbaseUser.user.uid,
      });
      console.log("SUCCESS , user created");

      return response;
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  },
};
export default userApiService;

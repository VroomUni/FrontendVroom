import axios from "axios";
import apiConfig from "./apiConfig";

const url = `${apiConfig.baseURL}/request`;
const createRequest = async requestPayload => {
  try {
    const response = await axios.post(url, requestPayload);
    console.log("Request SUCCESS");
    return;
  } catch (err) {
    console.error("Error creating request :", err);
    throw err;
  }
};

module.exports = { createRequest };

import axios from "axios";
import apiConfig from "./apiConfig";

const url = `${apiConfig.baseURL}/request`;
const createRequest = async requestPayload => {
  try {
    const response = await axios.post(url, requestPayload);
    return;
  } catch (err) {
    console.error("Error creating request :", err);
    throw err;
  }
};

const handleRequestRespone = async (requestId, isAccepted) => {
  const finalUrl = `${url}/response`;
  const requestPayload = { id: requestId , isAccepted };
  try {
    const response = await axios.post(finalUrl, requestPayload);
    console.log(response.status);
    return;
  } catch (err) {
    console.error("Error creating request :", err);
    throw err;
  }
};

module.exports = { createRequest , handleRequestRespone };

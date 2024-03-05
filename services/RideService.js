import axios from "axios";
import apiConfig from "./apiConfig";
import { encode } from "@googlemaps/polyline-codec";
import { dateObjBuilder, daysRecurrenceObjBuilder } from "../utils/RideHelpers";

const rideApiService = {

  //fix today , customDate
  postRide: async (ridePayload, uri) => {
    //validate payload types to match with backend
    const validatedRidePayload = {
      ...ridePayload,
      encodedPath: encode(ridePayload.encodedPath),
      encodedArea: encode(ridePayload.encodedArea),
      startTime: ridePayload.startTime.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
      }),
      //handle date
      initialDate: dateObjBuilder(
        ridePayload.initialDate.selectedDateType,
        ridePayload.initialDate.customDate
      ),
      recurrence: daysRecurrenceObjBuilder(ridePayload.recurrence),
    };

    const url = uri
      ? `${apiConfig.baseURL}/ride/${uri}`
      : `${apiConfig.baseURL}/user/ride/ `;

    try {
      console.log(validatedRidePayload);
      const response = await axios.post(url, validatedRidePayload);
      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log("SUCCESS");
      return response;
    } catch (err) {
      console.error("Error fetching data:", err);
      throw err;
    }
  },
};

export default rideApiService;

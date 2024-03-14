import axios from "axios";
import apiConfig from "./apiConfig";
import { encode } from "@googlemaps/polyline-codec";
import {
  dateObjBuilder,
  daysRecurrenceObjBuilder,
  timeObjBuilder,
} from "../utils/RideHelpers";

const rideApiService = {
  //fix today , customDate
  postRide: async ridePayload => {
    //validate payload types to match with backend
    const validatedRidePayload = {
      ...ridePayload,
      encodedPath: encode(ridePayload.encodedPath),
      encodedArea: encode(ridePayload.encodedArea),
      startTime: timeObjBuilder(ridePayload.startTime),
      //handle date
      initialDate: dateObjBuilder(
        ridePayload.initialDate.selectedDateType,
        ridePayload.initialDate.customSelectedDate
      ),
      recurrence: daysRecurrenceObjBuilder(ridePayload.recurrence),
    };

    // const url = uri
    //   ? `${apiConfig.baseURL}/ride/${uri}`
    //   : `${apiConfig.baseURL}/user/ride/ `;

    const url = `${apiConfig.baseURL}/ride`;

    try {
      const response = await axios.post(url, validatedRidePayload);
      console.log("SUCCESS");
      return response;
      
    } catch (err) {
      console.error("Error fetching data:", err);
      throw err;
    }
  },
};

export default rideApiService;

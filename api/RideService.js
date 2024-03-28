import axios from "axios";
import apiConfig from "./apiConfig";
import { encode } from "@googlemaps/polyline-codec";
import {
  dateObjBuilder,
  daysRecurrenceObjBuilder,
  timeObjBuilder,
} from "../utils/RideHelpers";

const url = `${apiConfig.baseURL}/ride`;
const postRide = async ridePayload => {
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

  try {
    const response = await axios.post(url, validatedRidePayload);
    console.log("SUCCESS");
    return;
  } catch (err) {
    console.error("Error fetching data:", err);
    throw err;
  }
};

const searchForRides = async rideFilters => {
  //extra validation processing
  const validatedRidePayload = {
    ...rideFilters,
    fromTime: timeObjBuilder(rideFilters.fromTime),
    toTime: timeObjBuilder(rideFilters.toTime),
    initialDate: dateObjBuilder(
      rideFilters.initialDate.selectedDateType,
      rideFilters.initialDate.customSelectedDate
    ),
  };

  // Function to stringify an object and encode it
  const stringifyAndEncode = (key, value) => {
    return `${encodeURIComponent(key)}=${encodeURIComponent(
      JSON.stringify(value)
    )}`;
  };

  const queryString = Object.keys(validatedRidePayload)
    .map(key => {
      if (key === "destinationOrOrigin") {
        return stringifyAndEncode(key, validatedRidePayload[key]);
      }
      return `${encodeURIComponent(key)}=${encodeURIComponent(
        validatedRidePayload[key]
      )}`;
    })
    .join("&");

  const finalUrl = `${url}?${queryString}`;
  try {
    const response = await axios.get(finalUrl, validatedRidePayload);
    return response.data;
  } catch (err) {
    console.error("error ferching filtered rides data", err);
    throw err;
  }
};

module.exports = { postRide, searchForRides };

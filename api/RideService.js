import axios from "axios";
import apiConfig from "./apiConfig";
import { encode } from "@googlemaps/polyline-codec";
import {
  dateObjBuilder,
  daysRecurrenceObjBuilder,
  encodeUrlQuery,
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

  const queryString = encodeUrlQuery(validatedRidePayload);

  const finalUrl = `${url}?${queryString}`;
  try {
    const response = await axios.get(finalUrl);
    // console.log(response.data);
    return response.data;
  } catch (err) {
    console.error("error ferching filtered rides IDS", err);
    throw err;
  }
};

//REDO HERE
const fetchRidesData = async ridesIds => {
  const queryString = `ids=${ridesIds
    .map(ride => encodeURIComponent(ride))
    .join(",")}`;
  const finalUrl = `${url}/byIds?${queryString}`;
  console.log("final url ", finalUrl);
  try {
    const response = await axios.get(finalUrl);
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error("error fetching Rides Data ", err);
    throw err;
  }
};
module.exports = { postRide, searchForRides, fetchRidesData };

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
//for driver posting a ride
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
//for passenger searching for rides after filling the filters
const searchForRides = async rideFilters => {
  //extra validation processing
  const validatedRidePayload = {
    ...rideFilters,
    fromTime: timeObjBuilder(rideFilters.fromTime),
    toTime:rideFilters.toTime? timeObjBuilder(rideFilters.toTime):null,
    initialDate: dateObjBuilder(
      rideFilters.initialDate.selectedDateType,
      rideFilters.initialDate.customSelectedDate
    ),
  };

  const queryString = encodeUrlQuery(validatedRidePayload);

  const finalUrl = `${url}?${queryString}`;
  try {
    const response = await axios.get(finalUrl);
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error("error ferching filtered rides IDS", err);
    throw err;
  }
};

//dummy rides fetcher by ids 
const fetchRidesDataByIds = async ridesIds => {
  const queryString = `ids=${ridesIds
    .map(ride => encodeURIComponent(ride))
    .join(",")}`;
  const finalUrl = `${url}/byIds?${queryString}`;
  console.log("final url ", finalUrl);
  try {
    const response = await axios.get(finalUrl);
    // console.log(JSON.stringify(response.data.rides));
    return response.data.rides;
  } catch (err) {
    console.error("error fetching Rides Data ", err);
    throw err;
  }
};

const fetchAllUnrequestedRides = async (passengerId, filterDate) => {
  const finalUrl = `${url}/all`;
  try {
    const response = await axios.post(finalUrl, { passengerId, filterDate });
    console.log(response.data.rides);
    return response.data.rides;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
//fetches driver rides + requests made on them + ppl who requested
const fetchDriverActiveRides = async (driverId) =>{
  
  const finalUrl = `${url}/driver?id=${driverId}`
  console.log(finalUrl)
  try {
    const response = await axios.get(finalUrl);
    return response.data.rides;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
module.exports = {
  postRide,
  searchForRides,
  fetchRidesData: fetchRidesDataByIds,
  fetchAllUnrequestedRides,
  fetchDriverActiveRides
};

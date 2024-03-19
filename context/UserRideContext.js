import React, { useState, createContext } from "react";
import { useContext } from "react";

const UserRideContext = createContext();
export const useRideContext = () => {
  return useContext(UserRideContext);
};
export const UserRideContextProvider = ({ children }) => {
  const [polylineCods, setPolylineCods] = useState(null);
  const [polygonCods, setPolygonCods] = useState(null);
  const [destinationOrOrigin, setDestinationOrOrigin] = useState(null);
  const [isToSmu, setIsToSmu] = useState(true);
  const [btnGrpDateValue, setDateValue] = useState("today");
  const [spotsCount, setSpotsCount] = useState(4);
  const [customSelectedTime, setCustomSelectedTime] = useState(null);
  const [recurrentDays, setRecurrentDays] = useState({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  });
  const [customSelectedDate, setCustomSelectedDate] = useState(null);

  return (
    <UserRideContext.Provider
      value={{
        polylineCods,
        setPolylineCods,
        polygonCods,
        setPolygonCods,
        destinationOrOrigin,
        setDestinationOrOrigin,
        isToSmu,
        setIsToSmu,
        btnGrpDateValue,
        setDateValue,
        spotsCount,
        setSpotsCount,
        customSelectedTime,
        setCustomSelectedTime,
        recurrentDays,
        setRecurrentDays,
        customSelectedDate,
        setCustomSelectedDate,
      }}>
      {children}
    </UserRideContext.Provider>
  );
};

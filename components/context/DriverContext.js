import React, { useState, createContext } from "react";
import { useContext } from "react";

const DriverContext = createContext();
export const useDriverContext = () => {
  return useContext(DriverContext);
};
export const DriverContextProvider = ({ children }) => {
  const [polylineCods, setPolylineCods] = useState(null);
  const [polygonCods, setPolygonCods] = useState(null);
  const [destinationOrOrigin, setDestinationOrOrigin] = useState(null);
  const [isToSmu, setIsToSmu] = useState(true);
  const [btnGrpDateValue, setDateValue] = useState("today");
  const [spotsCount, setSpotsCount] = useState(4);
  const [customSelectedTime, setCustomSelectedTime] = useState(null);

  return (
    <DriverContext.Provider
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
      }}>
      {children}
    </DriverContext.Provider>
  );
};

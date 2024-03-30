import { StyleSheet, Text, View } from "react-native";
import React, { useEffect , useRef } from "react";
import Map from "../../components/Map";
import MapView from "react-native-maps";

const RideOnMap = () => {

  const currentRegion = useRef({
    latitude: 36.7277622657912, // Latitude of Tunisia
    longitude: 10.203072895008471, // Longitude of Tunisia
    latitudeDelta: 1, // Zoom level
    longitudeDelta: 1, // Zoom level
  });
  return (
    <View
      style={{
        flex: 1,
      }}>
      <Map currentRegion={currentRegion} showPolygon={false} />
    </View>
  );
};

export default RideOnMap;

const styles = StyleSheet.create({});

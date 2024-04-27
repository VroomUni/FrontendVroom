import React, { useEffect, useRef } from "react";
import MapView, { PROVIDER_GOOGLE, Polyline, Marker } from "react-native-maps";
import { decode } from "@googlemaps/polyline-codec";
import { StyleSheet, View, Text } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const RideOnMap = ({ route }) => {
  const { passengerLocation, routePolyLine, from, to } = route.params; // Assuming you have fromPlace and toPlace in your route params
  const mapRef = useRef();
  const polylineCods = decode(routePolyLine);

  return (
    <View style={{ flex: 1 }}>
      {/* HEADer */}
      <View style={styles.departureInfo}>
        <View style={styles.infoRow}>
          <FontAwesome
            name='circle'
            size={16}
            color='#00669B'
            style={styles.icon}
          />
          <Text style={styles.addressText}>{from}</Text>
        </View>
        <Text style={styles.dots}>
          <FontAwesome name='long-arrow-right' size={16} color='#333' />
        </Text>
        <View style={styles.infoRow}>
          <FontAwesome
            name='map-marker'
            size={16}
            color='#00669B'
            style={[styles.icon, { marginLeft: 1 }]}
          />
          <Text style={styles.addressText}>{to}</Text>
        </View>
      </View>

      <MapView
        ref={mapRef}
        onMapLoaded={() => {
          mapRef.current.fitToCoordinates(
            polylineCods.map(coord => ({
              latitude: coord[0],
              longitude: coord[1],
            })),
            {
              edgePadding: {
                top: 40,
                bottom: 40,
                right: 10,
                left: 10,
              },
              animated: true,
            }
          );
        }}
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 36.7277622657912, // Latitude of Tunisia
          longitude: 10.203072895008471, // Longitude of Tunisia
          latitudeDelta: 1, // Zoom level
          longitudeDelta: 1, // Zoom level
        }}>
        <Polyline
          coordinates={polylineCods.map(coord => ({
            latitude: coord[0],
            longitude: coord[1],
          }))}
          strokeWidth={3}
          strokeColor='blue'
        />
        <Marker
          coordinate={{
            longitude: passengerLocation.coords.longitude,
            latitude: passengerLocation.coords.latitude,
          }}
          title='YOU'
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  departureInfo: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "blue",
    justifyContent: "space-around",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginHorizontal: 5,
  },
  addressText: {
    fontSize: 16,
    color: "#333",
  },
  dots: {
    fontSize: 16,
    color: "#333",
    marginHorizontal: 10, // Spacing around the ellipsis icon
  },
});

export default RideOnMap;

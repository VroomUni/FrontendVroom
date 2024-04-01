import React, { useState } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import MapView from 'react-native-maps';
import { SwipeListView } from 'react-native-swipe-list-view';
import PassengerRequestCard from './PassengerRequestCard';
import SwipeContent from './SwipeContent';

function RideCardDetails() {
    const [rideRequests, setRideRequests] = useState([
      {
        id: "1",
        FName: "Emma",
        LName: "Smith",
        location: "Central Park",
        time: "10:00 AM",
        requests: "2",
        rating: 4,
      },
      {
        id: "2",
        FName: "Liam",
        LName: "Johnson",
        location: "Madison Square",
        time: "11:00 AM",
        requests: "1",
        rating: 3,
      },
      {
        id: "3",
        FName: "Olivia",
        LName: "Williams",
        location: "Union Square",
        time: "12:00 PM",
        requests: "3",
        rating: 5,
      },
      {
        id: "4",
        FName: "Noah",
        LName: "Brown",
        location: "Times Square",
        time: "01:00 PM",
        requests: "2",
        rating: 4,
      },
      {
        id: "5",
        FName: "Ava",
        LName: "Jones",
        location: "Columbus Circle",
        time: "02:00 PM",
        requests: "1",
        rating: 2,
      },
  
    ]);
    const swipeAnimatedValue = new Animated.Value(0);
    const [acceptedRequests, setAcceptedRequests] = useState([]);

    const deleteRow = (rowMap, rowKey) => {
      setRideRequests(rideRequests.filter((item) => item.id !== rowKey));
    };


    const acceptRow = (rowMap, rowKey) => {
 
  setAcceptedRequests([...acceptedRequests, rowKey]);
}
    const renderItem = ({ item, rowMap }) => {
        const rowHeightAnimatedValue = new Animated.Value(60);
        return (
            <PassengerRequestCard
                key={item.id}
                id={item.id}
                FName={item.FName}
                LName={item.LName}
                location={item.location}
                time={item.time}
                rating={item.rating}
                rowHeightAnimatedValue={rowHeightAnimatedValue}
                removeRow={() => deleteRow(rowMap, item.id)}
                onAccept={() => acceptRow(rowMap, item.id)}
                isAccepted={acceptedRequests.includes(item.id)}
            />
        );
    };

    const renderHiddenItem = (data, rowMap) => {
        const rowActionAnimatedValue = new Animated.Value(75);
        const rowHeightAnimatedValue = new Animated.Value(60);
        return (
            <SwipeContent
                onClose={() => rowMap[data.item.id].closeRow()}
                onDelete={() => deleteRow(rowMap, data.item.id)}
                swipeAnimatedValue={swipeAnimatedValue}
                rowActionAnimatedValue={rowActionAnimatedValue}
                rowHeightAnimatedValue={rowHeightAnimatedValue}
                onAccept={()=>acceptRow(rowMap,data.item.id)}
            />
        );
    };

    return (
        <View style={styles.container}>
            <MapView style={styles.map} initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }} />
            <SwipeListView
                data={rideRequests}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                rightOpenValue={-150}
                leftOpenValue={75}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        height: "50%",
    },
    rideList: {
        flex: 1,
    },
});

export default RideCardDetails;

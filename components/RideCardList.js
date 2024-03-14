import React, { useState } from 'react'
import RideCard from './RideCard';
import { View, StyleSheet,Text,Alert } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

function RideCardList({selectedDate}) {
    const [rideData, setRideData] =useState ([
        { id: "1", title: "Ride 1", location: "SMU to Aouina", time: "5:00PM", date:'2024-03-14', requests: 5 },
        { id: "2", title: "Ride 2", location: "Downtown to Airport", time: "8:30AM",  date: '2024-03-15', requests: 3 },
        { id: "3", title: "Ride 3", location: "Beach to City Center", time: "10:00AM", date: '2024-03-15',requests: 2 },
        { id: "4", title: "Ride 4", location: "Suburb to Shopping Mall", time: "3:45PM", date: '2024-03-16', requests: 7 },
        
      ]);

      const filteredData = rideData.filter(item => item.date === selectedDate);

      const handleDelete = (id)=>{
      Alert.alert(
        "Cancel Ride",
        "Are you sure you want to cancel this ride ?",
        [
          {
            text:"No",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"

          },
          {
            text:"Yes",
            onPress:()=> setRideData(rideData.filter(item=>item.id !== id))
          }

        ],
       
      )
      }
      


      const renderItem=({item})=>(
        <RideCard
        id={item.id}
        title = {item.title}
        location= {item.location}
        time={item.time}
        requests={item.requests}
        onDelete={handleDelete}
        />
      );

  return (
    <View style={styles.container}>
        {filteredData.length > 0 ? (
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.flatListContent}
        />
      ) : (
        <Text style={styles.noRidesText}>No scheduled rides for this date.</Text>
      )}
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20, 
    },
    flatListContent: {
      paddingHorizontal: 10,
      paddingBottom:30,
    },
    noRidesText: {
      color: '#162447', 
      fontSize: 16,
      textAlign: 'center',
      marginTop: 20,
    },
  });
  

export default RideCardList

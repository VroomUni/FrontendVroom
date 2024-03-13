import React, { useState } from 'react'
import RideCard from './RideCard';
import { View, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

function RideCardList() {
    const [rideData,setRideData] =useState ([
        { id: "1", title: "Ride 1", location: "SMU to Aouina", time: "Today, 5:00PM", requests: 5 },
        { id: "2", title: "Ride 2", location: "Downtown to Airport", time: "Tomorrow, 8:30AM", requests: 3 },
        { id: "3", title: "Ride 3", location: "Beach to City Center", time: "March 15, 10:00AM", requests: 2 },
        { id: "4", title: "Ride 4", location: "Suburb to Shopping Mall", time: "March 16, 3:45PM", requests: 7 },
        
      ]);
      const handleDelete = (id)=>{
        setRideData(rideData.filter(item=>item.id !== id))
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
        <FlatList
        data={rideData}
        renderItem={renderItem}
        keyExtractor={(item)=>item.id}
        contentContainerStyle={styles.flatListContent}/>

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
  });
  

export default RideCardList

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Chip } from "react-native-paper";

const PreferenceItem = ({ attribute, value }) => {
    const isYesOrNo = value.toLowerCase() === 'yes' || value.toLowerCase() === 'no';
    const iconName = value.toLowerCase() === 'yes' ? 'check-circle' : 'times-circle';
    const iconColor = value.toLowerCase() === 'yes' ? 'green' : 'red';


    return (
      <View style={styles.preferenceItem}>
        
       
        <Chip style={styles.chip}>
        {isYesOrNo ? (
                    <Text style={styles.chipText}>
                        {attribute} <FontAwesome name={iconName} size={16} color={iconColor} />
                    </Text>
                ) : (
                    <Text style={styles.chipText}>
                        {` ${value}`}
                    </Text>
                )}
        </Chip>
      </View>
    );
  };
  const styles = StyleSheet.create({
    preferenceItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 10,
    },
    chip: {
        margin: 4,
        backgroundColor: "#e0f2f1",
        borderRadius: 15,
        
      },
      
  });
  
  export default PreferenceItem;
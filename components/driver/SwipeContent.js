import React,{useEffect} from "react";
import { StyleSheet, View, TouchableOpacity, Text, Animated } from "react-native";

function SwipeContent({ onClose, onDelete, swipeAnimatedValue, leftActionActivated, rightActionActivated, rowActionAnimatedValue , rowHeightAnimatedValue}) {
 console.log('row action',rowActionAnimatedValue )
 console.log('row height',rowHeightAnimatedValue)
  useEffect(() => {
    let animation;
    if (rightActionActivated) {
      animation = Animated.spring(rowActionAnimatedValue , {
        toValue: 500,
        useNativeDriver: false,
      });
      animation.start();
    }

    return () => {
      // Cleanup animation
      if (animation) {
        animation.stop();
      }
    };
  }, [rightActionActivated, rowActionAnimatedValue ]);

 
  return (
    <Animated.View style={[styles.backContainer,{height:rowHeightAnimatedValue}]}>
      <Text>Accept</Text>
      {!leftActionActivated && (
      <TouchableOpacity style={[styles.Btn, styles.BtnClose]} onPress={onClose}>
        <Text style={styles.Btntext}>close</Text>
      </TouchableOpacity>
       )}
        {!leftActionActivated && (
      <Animated.View style={[styles.Btn, styles.BtnReject, {
        flex:1,
        width:50 
      }]}>
      <TouchableOpacity style={[styles.Btn, styles.BtnReject]} onPress={onDelete}>
        <Animated.View  style={{
          transform:[
            {
              scale:swipeAnimatedValue.interpolate({
                inputRange:[-90, -45],
                outputRange:[1,0],
                extrapolate:'clamp'
                
              })
            }
          ]}}>
        <Text style={styles.Btntext}>Reject</Text>
        </Animated.View>
      </TouchableOpacity>
      
      </Animated.View>
       )}

    </Animated.View>
  );
}
const styles = StyleSheet.create({
  backContainer: {
    alignItems: "center",
    backgroundColor: "#DDD",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
    margin: 5,
    marginBottom: 15,
    borderRadius: 5,
  },
  Btn: {
    alignItems: "flex-end",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
    paddingRight: 17,
  },
  BtnClose: {
    backgroundColor: "#1f65ff",
    right: 75,
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 2,
  },
  BtnReject: {
    backgroundColor: "#F44336",
    right: 0,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  Btntext: {
    color: "#FFF",
  },
});
export default SwipeContent;

import React, { useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Animated } from 'react-native';

function SwipeContent({ onClose,onAccept, onDelete, swipeAnimatedValue, leftActionActivated, rightActionActivated, rowActionAnimatedValue, rowHeightAnimatedValue }) {
  useEffect(() => {
    if (rightActionActivated || leftActionActivated) {
        Animated.spring(rowActionAnimatedValue, {
            toValue: 500,
            useNativeDriver: false,
        }).start();
    }
}, [rightActionActivated, leftActionActivated]);

const handleAccept = () =>{
    onAccept()
    onClose()
}


    return (
        <Animated.View style={[styles.backContainer, { height: rowHeightAnimatedValue }]}>
            <TouchableOpacity style={[styles.Btn, styles.BtnAccept]} onPress={handleAccept}>
                <Animated.View style={{
                    transform: [{
                        scale: swipeAnimatedValue.interpolate({
                            inputRange: [45, 70],
                            outputRange: [0, 1],
                            extrapolate: 'clamp'
                        })
                    }]
                }}>
                    <Text style={styles.Btntext}>Accept</Text>
                </Animated.View>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.Btn, styles.BtnClose]} onPress={onClose}>
                <Text style={styles.Btntext}>Close</Text>
            </TouchableOpacity>
            <Animated.View style={[styles.Btn, styles.BtnReject, { flex: 1, width: rowActionAnimatedValue }]}>
                <TouchableOpacity style={[styles.Btn, styles.BtnReject]} onPress={onDelete}>
                    <Animated.View style={{
                        transform: [{
                            scale: swipeAnimatedValue.interpolate({
                                inputRange: [-90, -45],
                                outputRange: [1, 0],
                                extrapolate: 'clamp'
                            })
                        }]
                    }}>
                        <Text style={styles.Btntext}>Reject</Text>
                    </Animated.View>
                </TouchableOpacity>
            </Animated.View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    backContainer: {
        alignItems: "center",
        backgroundColor: "#DDD",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: 15,
        margin: 5,
        marginBottom: 15,
        borderRadius: 5,
    },
    Btn: {
        alignItems: "flex-end",
        justifyContent: "center",
        position: "absolute",
        top: 0,
        bottom: 0,
        width: 75,
        paddingRight: 17,
    },
    BtnClose: {
        backgroundColor: "#808080",
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
    BtnAccept: {
        backgroundColor: '#4CAF50',
        borderToplefttRadius: 10,
        borderBottomleftRadius: 10,
    },
    Btntext: {
        color: "#FFF",
    },
});

export default SwipeContent;

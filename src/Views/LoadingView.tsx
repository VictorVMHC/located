import React, { useEffect } from 'react'
import { ActivityIndicator, Animated, ImageBackground, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
const img = require('../Assets/Images/fondo_main.png');

export const LoadingView = () => {
    const mapOpacity = new Animated.Value(0);
    const {height, width} = useWindowDimensions();
    useEffect(() =>{
        fadeInMap()
    },[] )

    const fadeInMap = () => {
        Animated.timing(mapOpacity, {
        toValue: 2,
        duration: 1000,
        useNativeDriver: true,
        }).start();
    };

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.mapContainer, { opacity: mapOpacity }]}>
                <ImageBackground
                    source={img}
                    resizeMode = 'cover'
                    style={{position: 'absolute', width, height}} 
                />
            </Animated.View>
            <ActivityIndicator 
                size={ 50 }
                color="black"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    mapContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    map: {
        flex: 1,
    },
});
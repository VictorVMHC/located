import React, { useContext, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Animated } from 'react-native';
import MapView from 'react-native-maps';
import { PermissionsContext } from '../Context/PermissionsContext';

const LocationPermissionView = () => {
    const { askLocationPermission } = useContext( PermissionsContext );
    const mapOpacity = new Animated.Value(0);

    useEffect(() =>{
        fadeInMap()
    },[] )

    const fadeInMap = () => {
        Animated.timing(mapOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
        }).start();
    };

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.mapContainer, { opacity: mapOpacity }]}>
                <MapView style={styles.map} />
            </Animated.View>
            <Text style={styles.title}>Location Permission</Text>
            <Text style={styles.description}>This app requires access to your location.</Text>
            <Button onPress={askLocationPermission} title="Grant Location Permission" />
        </View>
    );
    };

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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 32,
    },
});

export default LocationPermissionView;
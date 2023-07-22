import React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { Colors } from '../Themes/Styles';

export const LoadingOverlay = () => {
    return (
        <View style={styles.overlay}>
            <View style={styles.container}>
                <ActivityIndicator size="large" color={Colors.greenAqua} />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
    },
    container: {
        backgroundColor: '#222222',
        padding: 20,
        borderRadius: 10,
    },
});  
import React from 'react'
import { Image, StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface Props{
    uriImage: string,
}

export const CustomMarker = ({uriImage}:Props) => {

    return (
        <View style={styles.container}>
        <Svg width={60} height={60} viewBox="0 0 60 60">
            <Path
                d="M20 0C11.5 0 5 6.5 5 14.5C5 24.5 20 40 20 40C20 40 35 24.5 35 14.5C35 6.5 28.5 0 20 0Z"
                fill="red"
            />
                <Image
                    style={styles.markerImage}
                    source={{ uri: uriImage }}
                    resizeMode="cover"
                />
        </Svg>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    markerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'red',
    },
    markerImage: {
        width: 25, // Tamaño de la imagen
    height: 25, // Tamaño de la imagen
    borderRadius: 15, // Mitad del tamaño de la imagen
    position: 'absolute',
    top: 3, // Ajusta la posición vertical de la imagen
    left: 7.5,
    },
});


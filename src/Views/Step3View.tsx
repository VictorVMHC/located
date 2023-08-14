import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { Text } from 'react-native-paper'
import { useLocation } from '../Hooks/useLocation'
import { Coordinates } from '../Interfaces/MapInterfaces'
import { FontStyles } from '../Themes/Styles'
import { LoadingView } from './LoadingView'
import { useTranslation } from 'react-i18next'

export const Step3View = () => {
    const { userLocation, hasLocation } = useLocation();
    const { t } = useTranslation();
    const [markerPosition, setMarkerPosition] = useState<Coordinates | null>(null);

    const handleMapPress = (e: any) => {
        const { latitude, longitude } = e.nativeEvent.coordinate;
        setMarkerPosition({ latitude, longitude });
    };

    return (
        <View style={styles.container}>
            <View style={styles.mapContainer}>
            {( !hasLocation )
                ? <LoadingView />
                :
                    <MapView
                        style={styles.mapStyle}
                        showsUserLocation
                        initialRegion={{
                            latitude: userLocation.latitude,
                            longitude: userLocation.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        zoomEnabled
                        zoomControlEnabled
                        onPress={handleMapPress}
                    >
                        {markerPosition && (
                                <Marker
                                    draggable
                                    coordinate={markerPosition}
                                    onDragEnd={(e) => {
                                        const { latitude, longitude } = e.nativeEvent.coordinate;
                                        setMarkerPosition({ latitude, longitude });
                                    }}
                                />
                            )
                        }
                    </MapView>
                }
            </View>
            <View style={styles.viewText}>
                <Text style= {styles.text} adjustsFontSizeToFit>{t('step3Instructions')}</Text>
                <Text style= {{...FontStyles.Information,textAlign: 'center' }} adjustsFontSizeToFit>{t('step3Instructions2')}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: '5%'
    },
    mapContainer: {
        flex: 10,
        borderRadius: 20,
        overflow: 'hidden',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,

        elevation: 15,
    },
    viewText: {
        flex: 1,
        paddingVertical: 10,
        justifyContent: 'center',
    },
    text: {
        ...FontStyles.Text,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    mapStyle: {
        flex: 1,
    }
});
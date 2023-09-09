import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { ShowToast } from '../Components/ShowToast'
import { LocalContext } from '../Context/NewLocalContext'
import { useLocation } from '../Hooks/useLocation'
import { Location } from '../Interfaces/MapInterfaces'
import { FontStyles } from '../Themes/Styles'
import { LoadingView } from './LoadingView'

interface Props{
    setCanGoNext: React.Dispatch<React.SetStateAction<boolean>>
}

export const Step3View = ({setCanGoNext}:Props) => {
    const { localState, updateLocal } = useContext(LocalContext)
    const { userLocation, hasLocation } = useLocation();
    const { t } = useTranslation();
    const [markerPosition, setMarkerPosition] = useState<Location | null>(localState.location.latitude !== 0 ? localState.location : null);
    const [selectedButton, setSelectedButton] = useState( markerPosition ? 'marker': '');
    const [isMarkerSelected, setIsMarkerSelected] = useState(markerPosition ? true: false);

    useEffect(()=> {
        
        if(localState.location.longitude !== 0 && localState.location.latitude !== 0){            
            setCanGoNext(true);
        }

    }, [localState]);

    const handleMapPress = (e: any) => {
        const { latitude, longitude } = e.nativeEvent.coordinate;
        setMarkerPosition({ latitude, longitude });
        setIsMarkerSelected(true);
    };

    const handleMarkerDragEnd = (e: any) => {
        const { latitude, longitude } = e.nativeEvent.coordinate;
        setMarkerPosition({ latitude, longitude });
    };

    const handleSelectButtonPress = (type: string) => {
        setSelectedButton(type);
        if(type == 'marker'){
            updateLocal({location: {latitude: markerPosition!.latitude, longitude: markerPosition!.longitude}})
            ShowToast('Marker location selected')
        }

        if(type === 'user') {
            updateLocal({location: userLocation});
            ShowToast('User location selected')
        }
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
                                onDragEnd={handleMarkerDragEnd}
                            />
                        )}
                    </MapView>
                }
            </View>
            <View style={styles.viewText}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                <TouchableOpacity
                    style={[
                        styles.button,
                        selectedButton === 'marker' && styles.selectedButton,
                        !isMarkerSelected && styles.disabledButton,
                    ]}
                    onPress={() => handleSelectButtonPress('marker')}
                    disabled={!isMarkerSelected}
                >
                    <Text style={styles.buttonText}>
                        Select marker position
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.button,
                        selectedButton === 'user' && styles.selectedButton,
                    ]}
                    onPress={() => handleSelectButtonPress('user')}
                >
                    <Text style={styles.buttonText}>
                        Select user position
                    </Text>
                </TouchableOpacity>
                </View>
                <Text style={styles.text} adjustsFontSizeToFit>
                    {t('step3Instructions')}
                </Text>
                <Text style={{ ...FontStyles.Information, textAlign: 'center' }} adjustsFontSizeToFit>
                    {t('step3Instructions2')}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: '5%',
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
        textAlignVertical: 'center',
    },
    mapStyle: {
        flex: 1,
    },
    button: {
        backgroundColor: '#007BFF',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        alignItems: 'center',
        marginHorizontal: 15,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    selectedButton: {
        backgroundColor: 'green',
    },
    disabledButton: {
        backgroundColor: 'gray',
    },
});

import React, { useEffect, useState } from 'react'
import { SafeAreaView, FlatList, StyleSheet } from 'react-native'
import { Card } from '../Components/Card'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import { NewLocal } from '../Interfaces/LocalInterfaces';
import { searchLocals } from '../Api/searchLocalsApi';
import { useLocation } from '../Hooks/useLocation';
import {NoPopularLocalsToShowAlertView} from './NoPopularLocalsToShowAlertView'

interface Props extends NativeStackScreenProps<any, any>{};

export const PopularView = ({navigation, route}:Props) => {
    return(
    <NoPopularLocalsToShowAlertView
                navigation={navigation}
                route={route}
            />);
    const [datosLocales, setDatosLocales] = useState<NewLocal[]>([]); 
    const radioKm = 0.2

    const fetchData = async (latitude: number, longitude: number) => {
        try {
            console.log('Obteniendo datos...');
            const resultados = await searchLocals(
                latitude,
                longitude,
                radioKm
            );
            const paginatedResults = resultados.data.results;
            setDatosLocales(paginatedResults);
        } catch (error) {
            console.error(error);
        }
    };

    const {
        hasLocation,
        initialPosition,
        followUserLocation,
        userLocation,
        stopFollowUserLocation
    } = useLocation();

    useEffect(() => {
        console.log('hola useEffect');
        if(!hasLocation){
            return ;
        }

            fetchData(userLocation.latitude, userLocation.longitude);

    },[userLocation, hasLocation]);

    useFocusEffect(() => {
        console.log('popular focused');
    });

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={datosLocales}
                renderItem={ ( { item } ) => {
                    return(
                        <Card like={false} newLocal={item} 
                            routeToStore={() => navigation.navigate("StoreView")}
                        />
                    )
                } }
                keyExtractor={(item) => item.name.toString()}
            />
        </SafeAreaView>
    );
}; 

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});
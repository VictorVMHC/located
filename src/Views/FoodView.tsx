import React, { useEffect, useState } from 'react'
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { local } from '../Utils/Data _Example'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CardCloseToMe } from '../Components/CardCloseToMe';
import { searchLocalsRad ,searchCloseTome } from '../Api/searchLocalsApi';
import { NewLocal } from '../Interfaces/LocalInterfaces';
import { useLocation } from '../Hooks/useLocation';
import { fetchData } from '../Utils/FetchFunctions';

interface Props {
    kilometres: number;
};

export const FoodView = ({kilometres}:Props) => {
    const [datosLocales, setDatosLocales] = useState<NewLocal[]>([]);

    const sata = async () =>{
        const data =  fetchData(userLocation.latitude, userLocation.longitude,kilometres,'Comida');
        setDatosLocales(await data);
    }

    const {
        hasLocation,
        followUserLocation,
        userLocation,
        stopFollowUserLocation
    } = useLocation();

    useEffect(() => {
        followUserLocation();
        return () => {
            stopFollowUserLocation();
        }
    }, []);

    useEffect(() => {
        console.log('hola useEffect');
        if(!hasLocation){
            return ;
        }
        sata();
    },[userLocation, hasLocation, kilometres ]);

    return (
        <SafeAreaView style={styles.container}>
        <FlatList 
            numColumns={2}
            data={datosLocales}
            renderItem={ ( { item } ) => {
                return(
                    <CardCloseToMe Img={item.uriImage ? item.uriImage : '../Assets/Images/Img_User.png' } like={false} Name={item.name} categorie={item.tags[0]}
                    />
                )
            } }
            keyExtractor={(item) => item.name.toString()}
        />
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

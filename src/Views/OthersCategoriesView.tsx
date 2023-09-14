import React, { useEffect, useState } from 'react'
import { FlatList, SafeAreaView, StyleSheet } from 'react-native'
import { local } from '../Utils/Data _Example'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CardCloseToMe } from '../Components/CardCloseToMe';
import { NewLocal } from '../Interfaces/LocalInterfaces';
import { fetchData } from '../Utils/FetchFunctions';
import { useLocation } from '../Hooks/useLocation';

interface Props {
    kilometres: number,
    nameTag: string,
};

export const OthersCategoriesView = ({kilometres, nameTag}:Props) => {
    const [datosLocales, setDatosLocales] = useState<NewLocal[]>([]);

    const sata = async () =>{
        const data =  fetchData(userLocation.latitude, userLocation.longitude,kilometres,nameTag);
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
                    <CardCloseToMe Img={item.uriImage} like={false} Name={item.name} categorie={item.tags[0]}
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

import React, { useEffect, useState } from 'react'
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { CardCloseToMe } from '../Components/CardCloseToMe';
import { NewLocal } from '../Interfaces/LocalInterfaces';
import { useLocation } from '../Hooks/useLocation';
import { fetchData } from '../Utils/FetchFunctions';
import { useFocusEffect } from '@react-navigation/native';
import { foodTags } from '../Utils/ArraysTags';
interface Props {
    kilometres: number;
};

export const FoodView = ({kilometres}:Props) => {
    const [datosLocales, setDatosLocales] = useState<NewLocal[]>([]);

    const fetchMoreLocales  = async () =>{
        const limit = 2
        const results = await Promise.all(foodTags.map(tag => fetchData(userLocation.latitude, userLocation.longitude, kilometres, tag, limit)));
        const combinedResults = results.flat(); 
        setDatosLocales(combinedResults );
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
    
        fetchMoreLocales ();
    },[userLocation, hasLocation, kilometres ]);

    const onEndReached = () => {
        fetchMoreLocales();
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList 
                numColumns={2}
                data={datosLocales}
                renderItem={ ( { item } ) => {
                    return(
                        <CardCloseToMe Img={'https://img.freepik.com/vector-gratis/apoye-diseno-ilustracion-negocio-local_23-2148587057.jpg?w=2000'} like={false} Name={item.name} categorie={item.tags[0]}
                        />
                    )
                } }
                keyExtractor={(item) => item.name.toString()}
                onEndReached={onEndReached}
                onEndReachedThreshold={0.1}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

import React, { useEffect, useState } from 'react'
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { CardCloseToMe } from '../Components/CardCloseToMe';
import { NewLocal } from '../Interfaces/LocalInterfaces';
import { useLocation } from '../Hooks/useLocation';
import { fetchData } from '../Utils/FetchFunctions';
interface Props {
    kilometres: number;
};
export const FoodView = ({kilometres}:Props) => {
    const [datosLocales, setDatosLocales] = useState<NewLocal[]>([]);

    const sata = async () =>{
        const tags = ['Comida', 'Restaurante', 'Cafetería', 'Food', 'Almuerzo'];
        const results = await Promise.all(tags.map(tag => fetchData(userLocation.latitude, userLocation.longitude, kilometres, tag)));
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
        sata();
    },[userLocation, hasLocation, kilometres ]);

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
        />
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

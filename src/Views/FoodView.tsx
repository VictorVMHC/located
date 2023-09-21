import React, { useEffect, useState } from 'react'
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { CardCloseToMe } from '../Components/CardCloseToMe';
import { NewLocal } from '../Interfaces/LocalInterfaces';
import { useLocation } from '../Hooks/useLocation';
import { fetchData } from '../Utils/FetchFunctions';
import { foodTags } from '../Utils/ArraysTags';
interface Props {
    kilometers: number;
    latitude: number,
    longitude:number
};

export const FoodView = ({kilometers, latitude, longitude}:Props) => {
    const [dataLocals, setDataLocals] = useState<NewLocal[]>([]);
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1);
    const [fetching, setFetching] = useState(false);

    const fetchMoreLocales  = async () =>{
        console.log('More Locals');
        
        if(page <= totalPage && !fetching){
            setFetching(true)
            const {locals, totalPages} = await fetchData(latitude, longitude, kilometers,foodTags, page, 2);
            if (locals) {
                setDataLocals([...dataLocals, ...locals]);
                setTotalPage(totalPages);
                console.log(totalPage, page);
                setFetching(false)
            }
            setPage(page + 1);
        }
    }

    useEffect(() => {
        console.log('hola useEffect');
        setPage(1);
        setTotalPage(1);
        setDataLocals([]);
        fetchMoreLocales ();
    },[kilometers]);



    return (
        <SafeAreaView style={styles.container}>
            <FlatList 
                numColumns={2}
                data={dataLocals}
                renderItem={ ( { item } ) => {
                    return(
                        <CardCloseToMe Img={'https://img.freepik.com/vector-gratis/apoye-diseno-ilustracion-negocio-local_23-2148587057.jpg?w=2000'} like={false} Name={item.name} categories={item.tags[0]}
                        />
                    )
                } }
                keyExtractor={(item) => item.name.toString()}
                onEndReached={fetchMoreLocales} 
                onEndReachedThreshold={0.1} 
                ListFooterComponent={<Text>Hola</Text>}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

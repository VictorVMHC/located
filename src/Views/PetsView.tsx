import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { CardCloseToMe } from '../Components/CardCloseToMe';
import { NewLocal } from '../Interfaces/LocalInterfaces';
import { fetchData } from '../Utils/FetchFunctions';
import { PetsTags } from '../Utils/ArraysTags';
import { Colors } from '../Themes/Styles';
import { Local } from '../Interfaces/DbInterfaces';
import { useNavigation } from '@react-navigation/native';
import {ThereAreNoLocals} from '../Components/ThereAreNoLocals'
interface Props {
    kilometers: number;
    latitude: number,
    longitude:number
};

export const PetsView = ({kilometers, latitude, longitude}:Props) => {
    const [dataLocals, setDataLocals] = useState<Local[]>([]);
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1);
    const [fetching, setFetching] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    
    const fetchMoreLocales  = async () =>{
        setPage(1);
        if(page <= totalPage && !fetching){
            setFetching(true)     
            const {locals, totalPages} = await fetchData(latitude, longitude, kilometers,PetsTags, page);
            if (locals) {
                setDataLocals([...dataLocals, ...locals]);
                setTotalPage(totalPages);
                setFetching(false);
                setLoading(false); 
            }
            if (totalPages >= 1) {
                setPage(page + 1);
            }
        }
    }

    useEffect(() => {
        setPage(1);
        setTotalPage(1);
        setDataLocals([]);
        setLoading(true);
        fetchMoreLocales();
    },[kilometers]);

    const dataRange = () => {
        if(kilometers >= 1){
            return (kilometers) + 'Km';
        }else{
            return (kilometers * 1000) + 'M'
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            {dataLocals.length === 0 ? (
                <ThereAreNoLocals
                text={'No se ha encontrado ningún local'}
                information={'Al parecer no se pudo encontrar ningún local en el rango de'}
                range={dataRange().toString()}
                />
            ):(
                <FlatList 
                    numColumns={2}
                    data={dataLocals}
                    renderItem={ ( { item } ) => {
                        return(
                            <CardCloseToMe 
                                Img={item ? item.uriImage :'https://img.freepik.com/vector-gratis/apoye-diseno-ilustracion-negocio-local_23-2148587057.jpg?w=2000'}  
                                like={false} 
                                Name={item.name} 
                                categories={item.tags[0]}
                                navigation={navigation}
                                id={item._id}
                            />
                        )
                    } }
                    keyExtractor={(item) => item._id}
                    onEndReached={fetchMoreLocales} 
                    onEndReachedThreshold={0.1} 
                    ListFooterComponent={()=>(
                        loading ? <ActivityIndicator size="large" color={Colors.orange} /> : null
                    )}
                />
            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

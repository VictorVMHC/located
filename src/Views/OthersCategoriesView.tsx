import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Keyboard, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TextInput, View, useWindowDimensions } from 'react-native'
import { CardCloseToMe } from '../Components/CardCloseToMe';
import { fetchData } from '../Utils/FetchFunctions';
import { Colors } from '../Themes/Styles';
import { Local } from '../Interfaces/DbInterfaces';
import { useNavigation } from '@react-navigation/native';
import {ThereAreNoLocals} from '../Components/ThereAreNoLocals'
interface Props {
    kilometers: number;
    latitude: number,
    longitude:number
};



export const OthersCategoriesView = ({kilometers, latitude, longitude}:Props) => {
    const [dataLocals, setDataLocals] = useState<Local[]>([]);
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [heightContainerTexInput, setHeightContainerTexInput] = useState(0.5);
    const [foodTagsInput, setFoodTagsInput] = useState('.*');
    const [ foundLocals, setFoundLocals] = useState(true);
    const navigation = useNavigation();
    const [fetching, setFetching] = useState(false);
    const [f, setf] = useState(false);

    const updateDataStyles = (valueHeightContainerTexInput: number) => {
        setHeightContainerTexInput(valueHeightContainerTexInput);
    }

/* const fetchDataAndUpdateLocals = async (pageToFetch: number = 1) => {
        setLoading(true);
        fetchData(
            latitude, longitude, kilometers, [foodTagsInput], pageToFetch
        ).then(
            ({locals, totalPages}) => {
                if (locals) {
                    setDataLocals(prevLocals => [...prevLocals, ...locals]);
                    setTotalPage(totalPages);
                    setFoundLocals(true);
                }
            }
        ).catch(
            (result) => {
                setFoundLocals(false);
            }
        ).finally(
            () => {
                setPage( page + 1);
                setLoading(false);
            }
        )
    }*/

    const fetchMoreLocales  = async () =>{
       /* if(page <= totalPage){
            fetchDataAndUpdateLocals(page);
        }*/
        setPage(1);
        if (page <= totalPage && !fetching) {
            setFetching(true);
            const { locals, totalPages } = await fetchData(latitude, longitude, kilometers, ['.*'], page);
            if (locals) {
                setDataLocals(prevDataLocals => [...prevDataLocals, ...locals]);
                setTotalPage(totalPages);
                setf(true)
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

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                updateDataStyles(1); 
            }
        );

        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                updateDataStyles(0.5); 
            }
        );
    
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);
    return (
        <>
        <KeyboardAvoidingView style={{ flex: 1 }}>
        {dataLocals.length === 0 ? (
            <ThereAreNoLocals
                text={'No se ha encontrado ningún local'}
                information={'Al parecer no se pudo encontrar ningún local en el rango de'}
                range={dataRange().toString()}
            />
        ):(
            <View style={styles.container}>
                <FlatList
                    keyboardShouldPersistTaps='always'
                    numColumns={2}
                    data={dataLocals}
                    initialNumToRender={4}
                    refreshing={loading}
                    renderItem={({ item }) => {
                        return (
                            <CardCloseToMe 
                                Img={'https://img.freepik.com/vector-gratis/apoye-diseno-ilustracion-negocio-local_23-2148587057.jpg?w=2000'} 
                                like={false} 
                                Name={item.name} 
                                categories={item.tags[0]}
                                navigation={navigation}
                            />
                        );
                    } }
                    keyExtractor={(item) => item._id }
                    onEndReached={fetchMoreLocales}
                    onEndReachedThreshold={0.3}
                    ListFooterComponent={() => (
                        loading ? <ActivityIndicator size="large" color={Colors.orange} /> : null
                )} />
            </View>

        )}
        </KeyboardAvoidingView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
    },
});

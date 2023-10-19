import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet, View, VirtualizedList } from 'react-native';
import { CardCloseToMe } from '../Components/CardCloseToMe';
import { CustomAlert } from '../Components/CustomAlert';
import { ThereAreNoLocals } from '../Components/ThereAreNoLocals';
import { Local } from '../Interfaces/DbInterfaces';
import { Colors } from '../Themes/Styles';
import { PetsTags } from '../Utils/ArraysTags';
import { fetchData } from '../Utils/FetchFunctions';
interface Props {
    kilometers: number;
    latitude: number,
    longitude:number,
    setFoodViewValue: (newValue: boolean) => void
};

export const PetsView = ({kilometers, latitude, longitude, setFoodViewValue}:Props) => {
    const [dataLocals, setDataLocals] = useState<Local[]>([]);
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1);
    const [fetching, setFetching] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const [noLocalsFound, setNoLocalsFound] = useState(false);
    
    const fetchMoreLocales  = async () =>{
        try {
            if(page <= totalPage && !fetching){
                setFetching(true)    
                const {locals, totalPages} = await fetchData(latitude, longitude, kilometers,PetsTags, page);
                if (locals) {
                    setDataLocals([...dataLocals, ...locals]);
                    setTotalPage(totalPages);
                    setFetching(false);
                    setLoading(false); 

                    if (locals.length === 0) {
                        setNoLocalsFound(true);
                    }
                }
                setPage(page + 1);
            }      
        } catch (error: any) {
            if(error.response.status === 404){
                CustomAlert({
                    title: "Error",
                    desc: "Was not possible to retrieve the locals, ¡Please try again!",
                });
            }
            if(error.response.status === 500){
                CustomAlert({
                    title: "Error",
                    desc: "Was not possible to retrieve the locals, ¡Please try again!"
                });
            }
            setTotalPage(0);
        }
    }

    const valueInitial = () => {
        return setFoodViewValue(true); // Enviamos el valor true a CloseToMeMainView
    }

    useFocusEffect(
        React.useCallback(() => {
            valueInitial();
        }, [])
    );

    useEffect(() => {
        setPage(1);
        setTotalPage(1);
        setDataLocals([]);
        setLoading(true);
        setNoLocalsFound(false); 
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
            {noLocalsFound ? (
                <ThereAreNoLocals
                text={'No se ha encontrado ningún local'}
                information={'Al parecer no se pudo encontrar ningún local en el rango de'}
                range={dataRange().toString()}
                />
            ):(
                <View style={styles.container}>
                    <VirtualizedList
                        data={dataLocals}
                        initialNumToRender={4}
                        refreshing={loading}
                        getItemCount={(data) => Math.ceil(data.length / 2)} 
                        getItem={(dataLocal, index) => [dataLocal[index * 2], dataLocal[index * 2 + 1]]} 
                        renderItem={({ item }) => (
                            <View style={styles.row}>
                                {item[0] && (
                                    <CardCloseToMe 
                                        Img={item[0].uriImage || 'https://img.freepik.com/vector-gratis/apoye-diseno-ilustracion-negocio-local_23-2148587057.jpg?w=2000'} 
                                        like={item[0].liked} 
                                        Name={item[0].name} 
                                        categories={item[0].tags[0]}
                                        navigation={navigation}
                                        local={item[0]}
                                    />
                                )}
                                {item[1] && (
                                    <CardCloseToMe 
                                        Img={item[1].uriImage || 'https://img.freepik.com/vector-gratis/apoye-diseno-ilustracion-negocio-local_23-2148587057.jpg?w=2000'} 
                                        like={item[1].liked} 
                                        Name={item[1].name} 
                                        categories={item[1].tags[0]}
                                        navigation={navigation}
                                        local={item[1]}
                                    />
                                )}
                            </View>
                        )}
                        keyExtractor={(item) => {
                            let key = '';
                            if (item[0]) {
                                key += item[0]._id;
                            }
                            if (item[1]) {
                                key += item[1]._id;
                            }
                            return key;
                        }}
                        onEndReached={fetchMoreLocales}
                        onEndReachedThreshold={0.3}
                        ListFooterComponent={() => (
                            loading ? <ActivityIndicator size="large" color={Colors.orange} /> : null
                        )}
                    />
            </View>
            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
});

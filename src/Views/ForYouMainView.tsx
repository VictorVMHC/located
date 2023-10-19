import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useLayoutEffect, useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView } from 'react-native';
import { getRecommendation } from '../Api/recommendationsApi';
import { Card } from '../Components/Card';
import { ThereAreNoLocals } from '../Components/ThereAreNoLocals';
import { Local } from '../Interfaces/DbInterfaces';
import { Colors } from '../Themes/Styles';

interface Props extends NativeStackScreenProps<any, any>{};

export const ForYouMainView = ({ navigation }: Props) => {
    const [locals, setLocals] = useState<Local[]>([]);
    const [loading, setLoading ] = useState<Boolean>(false)

    useLayoutEffect(() => {
        setLoading(true);
        if(locals.length >0 && loading){
            return;
        }

        getRecommendation()
        .then((response) => {
            setLocals(response.data.localsRecommended)
        })
        .catch(() => {
            console.log("hola err");
        })
        .finally(() => {
            setLoading(false)
        })
    }, [locals])

    const noting = () => {

    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
        {loading 
            ? (
                <ThereAreNoLocals
                    text={'No recommendations were found'}
                    information={'It looks like you do not have enough interactions'}
                />
            ) 
            
            : (
                <FlatList
                    data={locals}
                    renderItem={ ( { item } ) => {
                        return(
                            <Card 
                                like={false} 
                                navigation={navigation}
                                local={item}
                                updateLike={noting}
                            />
                        )
                    }}
                    keyExtractor={(item) => item._id }
                    ListFooterComponent={() => (
                        loading ? <ActivityIndicator size="large" color={Colors.orange} /> : null
                    )}
                />
            )
        }
    </SafeAreaView>
    )
}
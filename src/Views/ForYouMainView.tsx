import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useContext, useEffect, useState } from 'react'
import {ActivityIndicator, FlatList, SafeAreaView, Text, View } from 'react-native'
import { LoadingView } from './LoadingView';
import { PermissionsContext } from '../Context/PermissionsContext';
import { LocationPermissionView } from './LocationPermissionsView';
import { Local } from '../Interfaces/DbInterfaces';
import { getRecommendation } from '../Api/recommendationsApi';
import { ThereAreNoLocals } from '../Components/ThereAreNoLocals';
import { Colors } from '../Themes/Styles';
import { Card } from '../Components/Card';

interface Props extends NativeStackScreenProps<any, any>{};

export const ForYouMainView = ({ navigation }: Props) => {
    const [locals, setLocals] = useState<Local[]>([]);
    const [loading, setLoading ] = useState<Boolean>(false)

    useEffect(() => {
        getRecommendation()
        .then(() => {
            console.log("hola");
        })
        .catch(() => {
            console.log("hola err");
        })
    }, [locals])

    return (
        <SafeAreaView style={{ flex: 1 }}>
        {loading && emptyData 
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
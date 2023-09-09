import React from 'react'
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { local } from '../Utils/Data _Example'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CardCloseToMe } from '../Components/CardCloseToMe';

interface Props extends NativeStackScreenProps<any, any>{};

export const FoodView = ({navigation}:Props) => {
    const id = navigation.getState();
    return (
        <SafeAreaView style={styles.container}>
        <FlatList 
            numColumns={2}
            data={local}
            renderItem={ ( { item } ) => {
                return(
                    <CardCloseToMe Img={item.uriImage} like={false} Name={item.name} categorie={item.tags[0]}
                    />
                )
            } }
            keyExtractor={(item) => item.id.toString()}
        />
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

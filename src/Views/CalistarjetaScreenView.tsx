import React from 'react';
import { StyleSheet , View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { CardCatalogue } from '../Components/CardCatalogue';
import { CardCloseToMe } from '../Components/CardCloseToMe';
import { tarjeta } from '../Utils/Data _Example';

export const CalistarjetaScreenView = () => {
    return (
    <View style={styles.container}>
        <View style={styles.header}>
        </View>
        <View style={styles.body}>
            <FlatList
                data={tarjeta}
                renderItem={({ item }) => (
                    <CardCloseToMe
                        Img={item.img} 
                        Name={item.name}
                        categorie={item.categorie}
                        like={item.like}
                    /> 
                )}
                horizontal={false}
                numColumns={2}
            />
        </View>
        <View style={styles.footer}>

        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'blue'
    },
    header:{
        flex: 1,
        backgroundColor:'red'

    },
    body:{
        flex: 8,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    footer:{
        flex: 1,
        backgroundColor: 'black'

    }
});

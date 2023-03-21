import React from 'react'
import { View, StyleSheet, Image } from 'react-native';
import { CardCatalogue } from '../Components/CardCatalogue';
import { CardCloseToMe } from '../Components/CardCloseToMe';

export const CalistarjetaScreenView = () => {
    return (
    <View style={styles.container}>
        <View style={styles.header}>

        </View>
        <View style={styles.body}>
            <CardCloseToMe 
                Img={'https://assets.unileversolutions.com/recipes-v2/164562.jpg'} 
                Name={'La casa de la sopas'}
                giro={'Restaurante'}
                like={false} />
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
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    footer:{
        flex: 1,
        backgroundColor: 'black'

    }
});

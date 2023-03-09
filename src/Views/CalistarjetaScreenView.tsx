import React from 'react'
import { View, StyleSheet } from 'react-native';
import { CardCatalogue } from '../Components/CardCatalogue';

export const CalistarjetaScreenView = () => {
  return (
    <View style={styles.container}>
        <View style={styles.header}>

        </View>
        <View style={styles.body}>
            <CardCatalogue
            ProductName="Pizza pepperoni"
            Price="0"
            Img ="https://placeralplato.com/files/2016/01/Pizza-con-pepperoni.jpg"
            punctuation="4.5" />
            <CardCatalogue
            ProductName="Pizza hawaiana"
            Price="0"
            Img ="https://placeralplato.com/files/2016/01/Pizza-con-pepperoni.jpg"
            punctuation="4.5" />
            <CardCatalogue
            ProductName="Pizza mexicana"
            Price="5"
            Img ="https://www.gastrolabweb.com/u/fotografias/m/2021/2/9/f1280x720-8328_140003_5050.jpg"
            punctuation="4.5" />
            <CardCatalogue
            ProductName="Pizza de chanpiñones"
            Price="5"
            Img ="https://i.blogs.es/87930e/comidas-ricas/840_560.jpg"
            punctuation="4.5" 
            DescripcionB = "doble queso con orilla rellena y peperoni"/>
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

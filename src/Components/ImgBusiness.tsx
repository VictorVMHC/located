import React from 'react'
import { Image, View, StyleSheet } from 'react-native';



interface Props {
    Width: string,
    Heigth: string,
    Img: string
}

export const ImgBusiness = ({Width = '',Img = '', Heigth = ''}: Props) => {
    return (
        <View style={{width: parseInt(Width), height: parseInt(Heigth) }}>
            <Image style={stylesImg.Img} source={{uri: Img}} />
        </View>
    )
}

const stylesImg =  StyleSheet.create({
    containerImg:{
        width: 100,
        height: 100
    },
    Img:{
        width: '100%',
        height: '100%',
        resizeMode:'contain',
        borderRadius: 10
    },
});

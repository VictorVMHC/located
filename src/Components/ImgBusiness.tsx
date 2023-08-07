import React from 'react'
import { Image, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useHeartHook } from '../Hooks/useHeartHook';
import { Colors} from '../Themes/Styles';



interface Props {
    Img: string,
    open: boolean,
    like: boolean

}

export const ImgBusiness = ({Img = '', open = false, like= false}: Props) => {
    return (
        <View style={{width: '100%', height: 180}}>
            <Image style={stylesImg.Img} source={{uri: Img }} />
        </View>
    )
}

const stylesImg =  StyleSheet.create({
    Img:{
        width: '100%',
        height: '100%',
        resizeMode:'stretch',
    },
    buttonOpen:{
        width: 70, 
        height: 20, 
        backgroundColor: '#B62D22', 
        borderRadius: 10, 
        position: 'absolute', 
        margin: 5
    },
    buttonText:{
        color: 'white', 
        textAlign: 'center'
    },
    heartBtn:{
        backgroundColor:Colors.gray,
        width: 35,
        height:35,
        position: 'absolute',
        top: 4,
        right: 10,
        borderRadius: 100, 
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
    },
});

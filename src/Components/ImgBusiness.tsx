import React from 'react'
import { Image, View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Colors} from '../Themes/Styles';

const windowWidth = Dimensions.get('window').width;

interface Props {
    Img: string,
    open: boolean,
    like: boolean,
    editButton: boolean
}

export const ImgBusiness = ({Img = '', open = false, like= false, editButton = false}: Props) => {
    return (
        <View style={{width: '100%', height: 180}}>
            <Image 
                style={stylesImg.Img} 
                source={Img !== '' ? { uri: Img } : require('../Assets/Images/Img_User.png')} 
            />
            {editButton ? (
                <TouchableOpacity style={stylesImg.buttonOpen}>
                    <Icon name='edit' size={25}  light color={Colors.Yellow}/>
                </TouchableOpacity>
            ): null}
        </View>
    )
}

const stylesImg =  StyleSheet.create({
    Img:{
        width: '100%',
        height: '100%',
        resizeMode:'stretch',
    },
    buttonOpen: {
        width: windowWidth*0.15,
        height: windowWidth*0.15,
        backgroundColor: 'rgba(0,0,0,0.9)',
        borderRadius: 30,
        position: 'absolute',
        bottom: 5, 
        right: 5, 
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText:{
        color: 'white', 
        textAlign: 'center'
    },
});

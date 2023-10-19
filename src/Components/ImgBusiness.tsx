import React, { useState } from 'react'
import { Image, View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Colors} from '../Themes/Styles';
import { Local } from '../Interfaces/DbInterfaces';


const windowWidth = Dimensions.get('window').width;

interface Props {
    Img: string,
    open: boolean,
    like: boolean,
}

export const ImgBusiness = ({Img = '', open = false, like= false,}: Props) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    return (
        <View style={{width: '100%', height: 180}}>
            <Image 
                style={stylesImg.Img} 
                source={Img !== '' ? { uri: Img } : require('../Assets/Images/Img_User.png')} 
            />
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

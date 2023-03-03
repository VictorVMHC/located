import React, { JSXElementConstructor } from 'react'
import { Text, TouchableNativeFeedback, View, StyleSheet, Image, BackHandler, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';


interface Props {
    text?: string,
    iconName?: string,
    properties?: {},
    action?: () => {},
    propertiesText?: {}
}

export const ButtonMain = ({text = '', iconName = '', properties= {}, propertiesText= {}, action }: Props)  => {
  return (
    <View style={styles.containerBtn}>
    <TouchableOpacity style={{...styles.containerTochable,  ...properties}} onPress={action}>
        {iconName != '' && <Icon name={iconName} size={30} color="black" />} 
        <Text style={[propertiesText, styles.textoExp]}>{text}</Text>
    </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    containerBtn: {
        alignSelf: 'center',
    },
    containerTochable: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
    },
    contenedorprincipal:{
        position: 'absolute',
        top: '52%',
        width: '100%',
        height: '30%',
        justifyContent: 'space-around',
        paddingTop:5,
    },
    contenedorBotonExp:{
        flexDirection: 'row',
        width: '92%',
        height: '28%',
        left: '5.5%',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',  
    },
    ButtonTop:{
        flex:1,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ButtonBt:{
        backgroundColor: 'rgba(255, 198, 0, .50)',
    },
    imgwalking:{
        width:55,
        height: '100%',
        resizeMode: 'center',
        position: 'absolute',
        left: '8%',
    },
    textoExp:{
      fontSize: 40,
      color: 'black',
      alignItems: 'center',
      marginLeft: 20,
      marginBottom: 3,

    },
    ButtonBd:{
        borderColor:  'rgba(255, 198, 0, 1)',
        borderWidth: 3,
        backgroundColor: 'rgba(255, 255, 255, 0.6)'
    },
})

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
    <TouchableOpacity style={{...styles.containerTochable,  ...properties}} onPress={ action }>
        {iconName != '' && <Icon name={iconName} size={30} color="black" style={{ left: -15 }}/>} 
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
    textoExp:{
      fontSize: 40,
      color: 'black',
      alignItems: 'center',
      marginBottom: 3,
    },
})

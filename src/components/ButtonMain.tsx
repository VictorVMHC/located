import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';


interface Props {
    text?: any,
    iconName?: string,
    properties?: {},
    action?: () => void,
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

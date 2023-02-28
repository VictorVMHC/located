import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Circles } from '../Components/Circles';
import { FontStyles, Styles } from '../Themes/Styles'


export const LogginView = () => {
  return (
    <SafeAreaView style={Styles.container}>
        <Circles
        position='top'
        quantity={2}
        />
        <Image
            style={Styles.imageStyle}
            source={require('../Assets/Images/logo_located.png')}
        />
        <View style={Styles.headerView}>
            <Text style={Styles.textStyle}>Contraseña</Text>
        </View>
        <View style={Styles.bodyView}>
            <TextInput style={Styles.input}
                placeholder='Ingresa tu correo electronico'   
            />
            <TextInput style={Styles.input}
                placeholder='Ingresa tu correo electronico'   
            />
            <View style={StylesLogging.viewText}>
                <Text style= {StylesLogging.textInformation}>¿Olvido su contraseña?</Text>
            </View>
            <TouchableOpacity style={Styles.boton}>
                <Text style={Styles.txtbtn}>Entrar</Text>
            </TouchableOpacity>
        </View>
        
    </SafeAreaView>

    
    
  )
}

const StylesLogging = StyleSheet.create({
    viewText: {
        width: 300,
    },
    textInformation:{
        alignSelf: 'flex-end',
        top: -4,
        ...FontStyles.Information
    }
});


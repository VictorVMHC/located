import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Circles } from '../Components/Circles';
import { FontStyles, Styles } from '../Themes/Styles'
import { Colors } from 'react-native/Libraries/NewAppScreen';


export const MainCreateAccount = () => {
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
            <Text style={Styles.textStyle}>Crear Cuenta</Text>
        </View>
        <View style={Styles.bodyView}>
            <View style={StylesLogging.viewText}>
            <TextInput style={StylesLogging.iconstyle}>ICONO</TextInput>
              <TouchableOpacity>
                <Text style={StylesLogging.textInformation}>Continuar con Google</Text>
              </TouchableOpacity>
                <TouchableOpacity>
                 <Text style= {StylesLogging.textInformation}>Continuar con Facebook</Text>
                </TouchableOpacity>
                  <TouchableOpacity>
                    <Text style= {StylesLogging.textInformation}>Registrarte con tu E-mail</Text>
                  </TouchableOpacity>
            </View>
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
        ...FontStyles.Information,
        color:'black',
        width: 190,
        height: 40
    },
    iconstyle:{
        color:'red',
        width: 50,
        top: 112

    }
});


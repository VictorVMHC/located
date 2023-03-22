import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Circles } from '../Components/Circles';
import { FontStyles, Styles } from '../Themes/Styles'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import AntDisign from 'react-native-vector-icons/AntDesign';

export const MainCreateAccountView = () => {
   
  return (
    <SafeAreaView style={Styles.container}>
        <Circles
        position='top'
        quantity={2}
        />
        <View style={Styles.headerView}>
            <Text style={Styles.textStyle}>Crear Cuenta</Text>
        </View>
        <Image
         style={{...Styles.imageStyle, left: -100, top: 10}}
        source={require('../Assets/Images/logo_located.png')}
          />
        <View style={Styles.bodyView}>
            <View style={StylesLogging.viewText}>
              <TouchableOpacity >
              <AntDisign name="google"style={StylesLogging.IconGoogle}/>
              <Text style= {StylesLogging.textInformation}>Continuar con Google</Text>
              </TouchableOpacity>  
                <TouchableOpacity>
                <AntDisign name="facebook-square"style={StylesLogging.Iconface}/>
                 <Text style= {StylesLogging.textInformation}>Continuar con Facebook</Text>
                </TouchableOpacity>
                  <TouchableOpacity>
                  <AntDisign name="mail"style={StylesLogging.IconMail}/>
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
        top: -40,
        ...FontStyles.Information,
        color:'black',
        width: 200,
        height: 20
    },
    
    viewLine:{
      flex: 1.8,
      borderColor: 'gray',
      borderWidth: 1,
      height:1,
  },
  viewTextInLine:{
      flex: 2.4,
      top: -6,
      alignItems: 'center',
  },
  textLogging:{
      ...FontStyles.Information,

  },
  Iconface:{
    color: 'blue',
    fontSize: 35,
    top: -14,
  },
  IconMail:{
    color:'black',
    fontSize: 35,
    top: -14,
    width: 45,
    height:30,
    backgroundColor:'white',
    shadowColor: "blue",
    shadowOffset: {
        width: 0,
        height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 10.00,
    elevation: 4,
    borderRadius: 5,
  },
  IconGoogle:{
    color:'red',
    fontSize: 35,
    top: -14,
  },
});


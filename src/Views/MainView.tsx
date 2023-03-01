import React from 'react'
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ButtonMain } from '../Components/ButtonMain'
import { Circles } from '../Components/Circles';
import { FontStyles } from '../Themes/Styles';

const img = require('../Assets/Images/fondo_main.png');

export const MainView = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
      source={img}
      resizeMode = 'cover'
      style={styles.image} >
        <Circles
        quantity={1}
        position='top'
        />
        <View style={styles.recuadrologo}>
          <Image 
           source={require('../Assets/Images/logo_located.png')}
           style={styles.textoLogo}
           />
          </View>
        <ButtonMain 
        ></ButtonMain>
        
        <View style={styles.cuandroinferior}>
          <Text style={styles.textoinferior}>No tienes una cuenta?</Text>
          <TouchableOpacity>
            <Text style={FontStyles.Links}>Registrate</Text>
            </TouchableOpacity>

        </View>

      </ImageBackground>

    </View>

  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  image: {
    flex: 1,
    opacity: 8
  },
  recuadrologo:{
    width:'100%', 
    height:'25%',
  },
  textoLogo:{
    width: '100%',
    height: '100%',
    resizeMode: 'center',
    opacity: 1
  },
  cuandroinferior:{
    position: 'absolute',
    bottom:0,
    width: '100%',
    height: '7%',
    justifyContent: 'center',
    backgroundColor: 'rgba(15,15,14,1)'

  },
  textoinferior:{
    fontSize: 25,
    textAlign: 'center',
    color: 'rgba(255,254,254,0.7)'
  }

});
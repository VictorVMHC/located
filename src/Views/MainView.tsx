import React from 'react'
import { Image, ImageBackground, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ButtonMain } from '../Components/ButtonMain'
import { Circles } from '../Components/Circles';
import { PickerButon } from '../Components/PickerButton';
import { FontStyles, Styles, Colors } from '../Themes/Styles';
import { useTranslation } from 'react-i18next';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

const img = require('../Assets/Images/fondo_main.png');

interface Props extends NativeStackScreenProps<any, any>{};

export const MainView = ({navigation } : Props) => {
  const {height, width} = useWindowDimensions();
  const { t ,i18n } = useTranslation();
  return (
    <View style={styles.container}>
      <ImageBackground
        source={img}
        resizeMode = 'cover'
        style={{position: 'absolute', width, height}} 
      >
        <Circles
          quantity={1}
          position='top'
        />
        <View style={styles.recuadrologo} >
          <View
            style={{ top: 5, width: 190, position: 'absolute', right: 0, flexDirection: 'row', alignItems: 'center' }}
          >
            <View style={{flex: 2}}>
                {i18n.language === 'es'
                ?   <Image source={require('../Assets/Images/Es.png')} style={{width: 25, height: 25, borderRadius: 15}} />
                :   <Image source={require('../Assets/Images/En.png')} style={{width: 25, height: 25, borderRadius: 15}} />
                }
            </View>
            <View style={{ flex: 8}}>
                <PickerButon/>
            </View>
          </View>
          <Image 
            source={require('../Assets/Images/logo_located.png')}
            style={{...Styles.imageStyle, left: -100, top: 60}}
          />
        </View>
        
        <View style={styles.recuadroBody} >
          <View style={{bottom: -250}}>
            <ButtonMain 
              text={t('Explore')}
              iconName='walking'
              properties={{
                width:355,
                height:63,
                backgroundColor: Colors.YellowOpacity,
                borderRadius: 20,
                justifyContent: 'center',
                marginVertical: 20,
                borderWidth: 4,
                borderColor:Colors.YellowOpacity,
              }}
              action={() => navigation.replace("DrawerMenu") }
            />
            <ButtonMain 
              text='Iniciar Sesión'
              properties={{
                width:355,
                height:63,
                backgroundColor: Colors.white,
                borderRadius: 20,
                justifyContent: 'center',
                marginVertical: 15,
                borderColor:  Colors.YellowOpacity,
                borderWidth: 4,
              }}
              
              action={() => navigation.navigate("LogginView")}
            />
          </View>
        </View>
        <View style={styles.recuadroFooter}>
          <View style={{ width: 400, justifyContent: 'center', alignContent: 'center', flexDirection: 'row',}}>
            <Text style={styles.textoinferior}>No tienes una cuenta?</Text>
            <TouchableOpacity style={{height:40}} onPress={() => navigation.navigate("MainCreateAccountView")}>
              <Text style={styles.textoReg}> Registrate</Text>
            </TouchableOpacity>
          </View>
        </View>
        
      </ImageBackground>
    </View>

  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center'
  },
  recuadrologo:{
    flex:2,
  },
  recuadroBody:{
    flex: 7,
  },
  recuadroFooter:{
    flex: 1,
    backgroundColor: 'black',
  },
  textoLogo:{
    width: '100%',
    height: '100%',
    resizeMode: 'center',
    opacity: 1
  },
  recuandroInferior:{
  flex:1,
  },
  textoinferior:{
    ...FontStyles.SubTitles,
    color: 'white',
    textAlign:'center',
  },
  textoReg:{
    top: 4,
    ...FontStyles.Links,
    color: Colors.Yellow
  }
});
import React from 'react'
import { Image, ImageBackground, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ButtonMain } from '../Components/ButtonMain'
import { Circles } from '../Components/Circles';
import { PickerButton } from '../Components/PickerButton';
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
        <View style={styles.logoView} >
          <View style={{ flex: 2}}>
            <View
              style={{ top: 5, width: width/2, position: 'absolute', right: 0, flexDirection: 'row', alignItems: 'center' }}
            >
              <View style={{flex: 2}}>
                  {i18n.language === 'es-MX'
                  ?   <Image source={require('../Assets/Images/Es.png')} style={{width: 25, height: 25, borderRadius: 15}} />
                  :   <Image source={require('../Assets/Images/En.png')} style={{width: 25, height: 25, borderRadius: 15}} />
                  }
              </View>
              <View style={{ flex: 8}}>
                  <PickerButton/>
              </View>
            </View>
          </View>
          <View style={{ flex: 2, alignItems: 'center'}} >
            <Image 
              source={require('../Assets/Images/logo_located.png')}
              style={{...Styles.imageStyle,}}
            />
          </View>
        </View>
        <View style={styles.bodyView} >
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
              text={t('Loggin')}
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
        <View style={styles.footerView}>
          <View style={{ width: 400, justifyContent: 'center', alignContent: 'center', flexDirection: 'row',}}>
            <Text style={styles.bottomText}>{t('NoAccount')}</Text>
            <TouchableOpacity style={{height:40}} onPress={() => navigation.navigate("MainCreateAccountView")}>
              <Text style={styles.singUpText}>{t('Log')}</Text>
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
    marginTop: 20,
    justifyContent: 'center',
  },
  logoView:{
    flex:2
  },
  bodyView:{
    flex: 7,
  },
  footerView:{
    flex: 1,
    backgroundColor: 'black',
  },
  bottomText:{
    ...FontStyles.SubTitles,
    color: 'white',
    textAlign:'center',
  },
  singUpText:{
    top: 4,
    ...FontStyles.Links,
    color: Colors.Yellow
  }
});
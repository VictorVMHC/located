import React, { useContext } from 'react'
import { Image, ImageBackground, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ButtonMain } from '../Components/ButtonMain'
import { Circles } from '../Components/Circles';
import { PickerButton } from '../Components/PickerButton';
import { FontStyles, Styles, Colors } from '../Themes/Styles';
import { useTranslation } from 'react-i18next';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthContext } from '../Context/AuthContext';
import { LoadingOverlay } from '../Components/LoadingOverlay';

const img = require('../Assets/Images/fondo_main.png');

interface Props extends NativeStackScreenProps<any, any>{};

export const MainView = ({navigation } : Props) => {
  const {height, width} = useWindowDimensions();
  const { t ,i18n } = useTranslation();
  const { status, signInGuest } =  useContext( AuthContext );

  const handleSignIn = async () => {
    signInGuest();
  }
  
  return (
    <View style={styles.container}>
      {status === 'checking' && <LoadingOverlay/> }
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
              style={{ flex:1,top: height * -0.018, position: 'absolute', right: 0, flexDirection: 'row', alignItems: 'center', left:75}}
            >
              <View style={{flex: 1, left:95, top:0}}>
                  {i18n.language === 'es-MX'
                  ?   <Image source={require('../Assets/Images/Es.png')} style={{width: 25, height: 25, borderRadius: 15}} />
                  :   <Image source={require('../Assets/Images/En.png')} style={{width: 25, height: 25, borderRadius: 15}} />
                  }
              </View>
              <View style={{ flex: 2, left: 25, top:-2}}>
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
                width:width * 0.85,
                height:height*0.080,
                backgroundColor: Colors.YellowOpacity,
                borderRadius: 20,
                justifyContent: 'center',
                marginVertical: 20,
                borderWidth: 4,
                borderColor:Colors.YellowOpacity,
              }}
              action={ handleSignIn }
            />
            <ButtonMain 
              text={t('logging')}
              properties={{
                width:width * 0.85,
                height:height*0.080,
                backgroundColor: Colors.white,
                borderRadius: 20,
                justifyContent: 'center',
                marginVertical: 15,
                borderColor:  Colors.YellowOpacity,
                borderWidth: 4,
              }}
              action={() => navigation.navigate("LoginView")}
            />
          </View>
        </View>
        <View style={styles.footerView}>
          <View style={{justifyContent: 'space-evenly', alignContent: 'center', flexDirection: 'row'}}>
            <Text style={styles.bottomText}>{t('NoAccount')}</Text>
            <TouchableOpacity  onPress={() => navigation.navigate("MainCreateAccountView")}>
              <Text style={{...styles.singUpText, marginTop:width*0.01}}>{t('Log')}</Text>
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
    fontSize:23,
  },
  singUpText:{
    ...FontStyles.Links,
    color: Colors.Yellow,
    fontSize:20,
  }
});
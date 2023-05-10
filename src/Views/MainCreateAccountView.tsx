import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Circles } from '../Components/Circles';
import { FontStyles, Styles } from '../Themes/Styles'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { PickerButon } from '../Components/PickerButton';
import AntDisign from 'react-native-vector-icons/AntDesign';
import { useTranslation } from 'react-i18next';
import { NativeStackScreenProps } from '@react-navigation/native-stack';


interface Props extends NativeStackScreenProps<any, any>{}
export const MainCreateAccountView = ({navigation}: Props) => {
  const { t, i18n } = useTranslation();
  return (
    <SafeAreaView style={Styles.container}>
        <Circles
        position='top'
        quantity={2}
        />
        <View style={{...Styles.headerView, flexDirection: 'row'}}>
                <View style={{flex: 7}} >
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={Styles.textStyle}>{t('CreateAccount')}</Text>
                    </View>
                </View>
                <View style={{flex: 5, flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{flex: 2}}>
                        {i18n.language === 'es-MX'
                            ?   <Image source={require('../Assets/Images/Es.png')} style={{width: 25, height: 25, borderRadius: 15}} />
                            :   <Image source={require('../Assets/Images/En.png')} style={{width: 25, height: 25, borderRadius: 15}} />
                        }
                    </View>
                    <View style={{ flex: 5}}>
                        <PickerButon/>
                    </View>   
                </View>
            </View>
        <Image
          style={{...Styles.imageStyle, left: -100, top: 10}}
          source={require('../Assets/Images/logo_located.png')}
        />
        <View style={Styles.bodyView}>
          <View style={StylesLogging.viewText}>
            <TouchableOpacity >
              <AntDisign name="google"style={StylesLogging.IconGoogle}/>
              <Text style= {StylesLogging.textInformation}>{t('SingUpGoogle')}</Text>
            </TouchableOpacity>  
            <TouchableOpacity>
              <AntDisign name="facebook-square"style={StylesLogging.Iconface}/>
              <Text style= {StylesLogging.textInformation}>{t('SingUpFacebook')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("CreateAccountEmailView")}>
              <AntDisign name="mail"style={StylesLogging.IconMail}/>
              <Text style= {StylesLogging.textInformation}>{t('SingUpEmail')}</Text>
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
  },
  IconGoogle:{
    color:'red',
    fontSize: 35,
    top: -14,
  },
});


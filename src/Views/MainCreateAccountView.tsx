import React, { useEffect, useState} from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Circles } from '../Components/Circles';
import { FontStyles, Styles } from '../Themes/Styles'
import { PickerButton } from '../Components/PickerButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useTranslation } from 'react-i18next';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { createGoogleUser } from '../Api/googleUserApi';

interface Props extends NativeStackScreenProps<any, any>{}

export const MainCreateAccountView = ({navigation}: Props) => {
    const { t, i18n } = useTranslation();


GoogleSignin.configure({
            webClientId:'264112384108-963iuqnqjn865n0dm1bk9o2a9kl2ftja.apps.googleusercontent.com'
});

const signInGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const { user } = userInfo;
      const googletoken = userInfo.idToken;

      // Lógica para crear un usuario con los datos de Google
      await createUserWithGoogle(user);

    } catch (error) {
      handleGoogleSignInError(error);
    }
  };

  const createUserWithGoogle = async (userData: any) => {
    try {
      const { data } = await createGoogleUser(userData);
      console.log('User data:', JSON.stringify(data));
    } catch (error:any) {
      console.log('Error creating user:', error.response.data);
    }
  };

  const handleGoogleSignInError = (error: any) => {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      console.log('Error Action Canceled');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      console.log('Action In Progress');
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      console.log('Error NOT AVAILABLE');
    } else {
      console.log('Error indefinido:', JSON.stringify(error));
    }
  };


const  signOut = async () => {
        try {
        const userInfo =  await GoogleSignin.signOut();
        console.log(userInfo);
        } catch (error) {
        console.error(error);
        }
    };

    return (
    <SafeAreaView style={Styles.container}>
        <Circles
        position='top'
        quantity={2}
        />
        <View style={{...Styles.headerView, flexDirection: 'row'}}>
                <View style={{flex: 6}} >
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{...Styles.textStyle, width:300, fontSize:32, top:8, left: 15}}>{t('CreateAccount')}</Text>
                    </View>
                </View>
                <View style={{flex: 2, flexDirection: 'row', alignItems: 'center', left:12, top:3 }}>
                    <View style={{flex: 1.6, left:15}}>
                        {i18n.language === 'es-MX'
                            ?   <Image source={require('../Assets/Images/Es.png')} style={{width: 25, height: 25, borderRadius: 15}} />
                            :   <Image source={require('../Assets/Images/En.png')} style={{width: 25, height: 25, borderRadius: 15}} />
                        }
                    </View>
                    <View style={{ flex: 5}}>
                        <PickerButton/>
                    </View>   
                </View>
            </View>
        <Image
            style={{...Styles.imageStyle, left: -120, top: -5}}
            source={require('../Assets/Images/logo_located.png')}
        />
        <View style={Styles.bodyView}>
            <View style={StylesLogIn.viewText}>
                <TouchableOpacity onPress={signInGoogle}>
                    <AntDesign name="google"style={StylesLogIn.IconGoogle}/>
                    <Text style= {StylesLogIn.textInformation}>{t('SingUpGoogle')}</Text>
                </TouchableOpacity>    
                <TouchableOpacity>
                    <AntDesign name="facebook-square"style={StylesLogIn.IconFace}/>
                    <Text style= {StylesLogIn.textInformation}>{t('SingUpFacebook')}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("CreateAccountEmailView")}>
                    <AntDesign name="mail"style={StylesLogIn.IconMail}/>
                    <Text style= {StylesLogIn.textInformation}>{t('SingUpEmail')}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={signOut}>
                <Text style= {{...StylesLogIn.textInformation, top:30}}>Salir</Text>
                </TouchableOpacity>
            </View>
        </View>
    </SafeAreaView>
    )
}

const StylesLogIn = StyleSheet.create({
    viewText: {
        width: 300,
    },
    textInformation:{
        alignSelf: 'flex-end',
        top: -38,
        ...FontStyles.Information,
        color:'black',
        width: 226,
        height: 23
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
    IconFace:{
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


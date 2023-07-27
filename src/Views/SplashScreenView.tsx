import React , { useContext, useEffect } from 'react';
import { ActivityIndicator, Image , StyleSheet , Text , View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthContext } from '../Context/AuthContext';

interface Props extends NativeStackScreenProps<any, any>{};

export const SplashScreenView = ({ navigation }: Props) => {
  const { status } = useContext(AuthContext);

  const goToMain = () => {
    navigation.replace('MainView');
  };

  const goToDrawer = () => {
    navigation.replace('DrawerMenu');
  };

  useEffect(() => {
    if (status === 'checking') return;

    status !== 'authenticated' ? goToMain() : goToDrawer();
  }, [status, navigation]);

  return status === 'checking' ? (
    <View style={styles.container}>
      <View style={styles.columnView}>
        <Image
            style={styles.imageStyle}
            source={require('../Assets/Images/logo_color.png')}
        />
        <View style={styles.textView}>
          <Text style={styles.textStyle }>Loca</Text>
          <Text style={{...styles.textStyle, color: '#FFC600'}}>ted</Text>
        </View>
        <View style={styles.activityIndicator}>
          <ActivityIndicator size={'large'}/>
        </View>
      </View>
      <View style={styles.ellipse1} ></View>
      <View style={styles.ellipse2} ></View>
      <View style={styles.ellipse3} ></View>
      <View style={styles.ellipse4} ></View>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    columnView:{
        flex:1,
        alignItems: 'center',
        justifyContent:'center',
    },
    textView:{
        top: -30,
        alignItems: 'center',
        flexDirection: 'row',
    },
    imageStyle: {
        height: 260,
        width: 190,
        resizeMode: 'contain',
        top: -20,
    },
    activityIndicator:{
      top: -20,
    },
    textStyle:{
        fontSize: 50,
        letterSpacing:0,
        fontFamily: 'Outfit-Bold',
        textShadowColor: 'black',
        textShadowRadius: 1,
        textShadowOffset:{
            width: 2,
            height: 2,
        }
    },
    ellipse1: {
        width: 350,
        height: 350,
        backgroundColor: 'rgba(255, 198, 0, .20)',
        position: 'absolute',
        borderRadius: 175,
        alignSelf: 'stretch',
        left: -120,
        bottom: -200,
    },
    ellipse2: {
        width: 500,
        height: 500,
        backgroundColor: 'rgba(255, 198, 0, .20)',
        position: 'absolute',
        borderRadius: 250,
        alignSelf: 'stretch',
        right: -200,
        bottom: -300,
    },
    ellipse3: {
        width: 500,
        height: 500,
        backgroundColor: 'rgba(255, 198, 0, .20)',
        position: 'absolute',
        borderRadius: 250,
        alignSelf: 'stretch',
        left: -100,
        top: -350,
    },
    ellipse4: {
        width: 350,
        height: 350,
        backgroundColor: 'rgba(255, 198, 0, .20)',
        position: 'absolute',
        borderRadius: 175,
        alignSelf: 'stretch',
        right: -120,
        top: -250,
    }
})

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, StyleSheet, Text, useWindowDimensions } from 'react-native';
import { HomeScreen } from './HomeScreen';
import { SettingsScreen } from './SettingsScreen';
import Ionicons from 'react-native-vector-icons/FontAwesome5';
import {Slider} from '@miblanchard/react-native-slider';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';


const Tab = createMaterialTopTabNavigator();

export const CloseToMeView = () =>{
const {width, height} = useWindowDimensions();
const [value, setValue] = useState(0);
const {t, i18n } = useTranslation();
return (
    <View style={styles.container}>
        <View style={styles.containerBarraK}>
            <Text>Barra de Kilometro</Text>
            <View style={{...styles.containerSlider,width: width - (width * 0.1), height: height - (height * 0.85)}}>
                <Slider 
                    value={value}
                    step={1}
                    maximumValue={10}
                    minimumValue={0}
                    maximumTrackTintColor= 'rgba(255,198,0,0.4)'
                    minimumTrackTintColor = '#FFC600'
                    thumbTintColor = '#FFC600'
                    trackStyle ={{height: 10, borderColor: 'black', borderWidth: 1, borderRadius: 20}}
                    renderAboveThumbComponent = {()=>
                    <View>
                        <Text style={styles.cuadroSuperiorPuntero}>{value} Km</Text>
                        <View style={styles.cuadroInferiorPuntero}></View>
                    </View>}
                    onValueChange={(val)=>setValue(val[0])}
                    thumbStyle = {{width: 25, height: 25}}        
                />  
            </View>
        </View>
        <Tab.Navigator  screenOptions={{
            tabBarLabelStyle: { fontFamily: 'Outfit-SemiBold', fontSize: 20, color: '#000000', textAlign: 'right'},
            tabBarItemStyle: { flexDirection: 'row'  },
            tabBarStyle: {backgroundColor: '#FFFFFF',},
            tabBarIndicatorStyle: {backgroundColor: '#CD5F28',height: 5},
            tabBarInactiveTintColor: '#FFFFFF',
            tabBarGap: 10,
            tabBarScrollEnabled: true,   
            }}>
            <Tab.Screen name="Home" component={HomeScreen}      
                options={{
                    title: t('Comida').toString(),
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="utensils" size={20} color={'#CD5F28'} />
                    ),
                }} 
            />
            <Tab.Screen name="Servicios" component={SettingsScreen}
                options={{
                    title:  t('Farmacia').toString(),
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="pills" size={20} color={'#CD5F28'} />
                    ),
                }}  
            />
            <Tab.Screen name="Otros" component={SettingsScreen} 
                options={{
                    title:  t('Otros').toString(),
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="ellipsis-v" size={20} color={'#CD5F28'} />
                    ),
                }}   
            />
        </Tab.Navigator>
    </View>
);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D9D9D9'
    },
        containerBarraK:{
        flex: 0.2,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerTopNav:{
        backgroundColor: 'red',   
    },
    containerSlider:{
        justifyContent: 'center',
    }, 
    cuadroSuperiorPuntero:{
        width: 60,
        backgroundColor: 'black',
        position: 'absolute',
        top: -35,
        left: -30,
        borderRadius: 8,
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Outfit.Regular',
        fontSize: 20,
    },
    cuadroInferiorPuntero:{
        width: 0,
        height: 0,
        position: 'absolute',
        top: -9,
        left: -15,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 30 / 2,
        borderRightWidth: 30 / 2,
        borderTopWidth: 15,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'black',
        color: 'white',
        textAlign: 'center'
    }
});

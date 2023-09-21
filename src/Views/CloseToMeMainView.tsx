import { Slider } from '@miblanchard/react-native-slider';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/FontAwesome5';
import { FoodView } from './FoodView';
import { OthersCategoriesView } from './OthersCategoriesView';
import { PharmacyView } from './PharmacyView';
import { useLocation } from '../Hooks/useLocation';
import { LoadingOverlay } from '../Components/LoadingOverlay';

const Tab = createMaterialTopTabNavigator();

export const CloseToMeMainView = () => {    
    const {width, height} = useWindowDimensions();
    const [value, setValue] = useState(0.1);
    const { t } = useTranslation();

    const {
        hasLocation,
        userLocation,
    } = useLocation();
    
    return (
        <>
        {
            (hasLocation === true)
            ?  
            <View style={styles.container}>
                <View style={styles.containerBar}>
                    <View style={{...styles.containerSlider, width: width - (width * 0.1), height: height - (height * 0.85)}}>
                        <Slider 
                            value={value}
                            step={1}
                            maximumValue={10}
                            minimumValue={0.1}
                            maximumTrackTintColor= 'rgba(255,198,0,0.4)'
                            minimumTrackTintColor = '#FFC600'
                            thumbTintColor = '#FFC600'
                            trackStyle ={{height: 10, borderColor: 'black', borderWidth: 1, borderRadius: 20}}
                            renderAboveThumbComponent = {()=>
                            <View>
                                <Text style={styles.topContainerSlider}>{value} Km</Text>
                                <View style={styles.bottomContainerSlider}></View>
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
                    <Tab.Screen
                        name="Food"
                        initialParams={{ kilometers: value }}
                        options={{
                            title: t('Food').toString(),
                            tabBarIcon: ({ color }) => (
                            <Ionicons name="utensils" size={20} color={'#CD5F28'} />
                            ),
                        }}>
                        {() => <FoodView kilometers={value} latitude={userLocation.latitude} longitude={userLocation.longitude} />}
                    </Tab.Screen>
                    <Tab.Screen
                        name="Pharmacy"
                        initialParams={{ kilometers: value }}
                        options={{
                            title: t('Pharmacy').toString(),
                            tabBarIcon: ({ color }) => (
                            <Ionicons name="pills" size={20} color={'#CD5F28'} />
                            ),
                        }}>
                        {() => <PharmacyView kilometers={value} />}
                    </Tab.Screen>
                    <Tab.Screen
                        name="Store"
                        initialParams={{ kilometers: value }}
                        options={{
                            title: t('Store').toString(),
                            tabBarIcon: ({ color }) => (
                            <Ionicons name="store-alt" size={20} color={'#CD5F28'} />
                            ),
                        }}>
                        {() => <OthersCategoriesView kilometers={value} />}
                    </Tab.Screen>
                    <Tab.Screen
                        name="Pets"
                        initialParams={{ kilometers: value }}
                        options={{
                            title: t('Pets').toString(),
                            tabBarIcon: ({ color }) => (
                            <Ionicons name="paw" size={20} color={'#CD5F28'} />
                            ),
                        }}>
                        {() => <OthersCategoriesView kilometers={value} />}
                    </Tab.Screen>
                    <Tab.Screen
                        name="Others"
                        initialParams={{ kilometers: value }}
                        options={{
                            title: `${t('others')}`,
                            tabBarIcon: ({ color }) => (
                            <Ionicons name="ellipsis-v" size={20} color={'#CD5F28'} />
                            ),
                        }}>
                        {() => <OthersCategoriesView kilometers={value} />}
                    </Tab.Screen>
                </Tab.Navigator>
            </View>
            : <LoadingOverlay />
        }
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D9D9D9'
    },
        containerBar:{
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
        marginTop: 25
    }, 
    topContainerSlider:{
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
    bottomContainerSlider:{
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

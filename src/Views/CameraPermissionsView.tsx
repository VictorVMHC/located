import React, { useContext, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Animated, Image,TouchableOpacity} from 'react-native';
import { PermissionsContext } from '../Context/PermissionsContext';
import { useTranslation } from 'react-i18next';

export const CameraPermissionView = () => {
    const {t, i18n } = useTranslation();
    const {askCameraPermission } = useContext( PermissionsContext );
    const mapOpacity = new Animated.Value(0);

    useEffect(() =>{
        fadeInMap()
    },[] )

    const fadeInMap = () => {
        Animated.timing(mapOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
        }).start();
    };

    return (
        <View style={styles.container}>
            <View style={styles.mapPermissionBox}>
            <Image source={require('../Assets/Images/camera_icon.png')} resizeMode='stretch' style={{width: 150, height: 100, borderRadius: 5,}} />
            <Text style={styles.title}>{t('LocationPermission')}</Text>
            <Text style={styles.description}>{t('MsgPermission')}</Text>
            <TouchableOpacity style={styles.mapBtn}
                onPress={askCameraPermission} >
                    <Text style={styles.mapBtnText}>{t('GrantPermission')}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
    };

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        
    },
    mapContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    map: {
        flex: 1,
    },
    title: {
        flex:.4,
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color:'black',
        
    },
    description: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 32,
        padding: 10,
        color: 'black'
        
    },
    mapPermissionBox:{
        flex: .8,
        width: 300,
        alignItems:'center',
        backgroundColor:'rgba(255,255,255,0.8)',
        borderRadius: 25,
        padding: 10,
    },
    mapBtn:{
        backgroundColor: '#ff4000',
        width:260,
        height: 35,
        borderRadius: 20,
        alignItems:'center',
        padding: 5,
    },
    mapBtnText:{
        color:'white',
        fontSize: 18,
    }
});

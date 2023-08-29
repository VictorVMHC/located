import React, { useContext, useEffect, useState } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { BottomModal } from '../Components/BottomModal';
import { launchCamera } from 'react-native-image-picker';
import { PermissionsContext } from '../Context/PermissionsContext';
import { LoadingView } from './LoadingView';
import { CameraPermissionView } from './CameraPermissionsView';

export const Step6View = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const slideAnimation = new Animated.Value(0);
    const { height } = useWindowDimensions();

    const { permissions } = useContext( PermissionsContext );
    console.log(permissions.cameraStatus);
    if ( permissions.cameraStatus === 'unavailable' ) {
        
        return <LoadingView />
    }

    useEffect(() => {
        if (modalVisible) {
            Animated.timing(slideAnimation, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(slideAnimation, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, []);

    const showModal = () => {
        setModalVisible(true);
    };

    const hideModal = () => {
        setModalVisible(false);
    };

    const slideUp = slideAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, height * 0.75],
    });

    const handleSeePicture = () => {
        console.log('see photo');
        
    }
    
    const handleUploadPicture = () => {
        console.log('see upload');
    }
    
    const handleLaunchCamera = () => {
        launchCamera({mediaType: 'photo', cameraType: 'front'}, (url) => {
            console.log(JSON.stringify(url));
            
        })
    }
    
    return (
        <>
            {
                (permissions.cameraStatus === 'granted')
                    ?   <View style={styles.container}>
                            <TouchableOpacity style={styles.button} onPress={showModal}>
                                <Text>Show Modal</Text>
                            </TouchableOpacity>
                            <BottomModal
                                slideUp={slideUp}
                                modalVisible={modalVisible}
                                hideModal={hideModal}
                                enable={false}
                                actionBtn1={handleSeePicture}
                                actionBtn2={handleUploadPicture}
                                actionBtn3={handleLaunchCamera}
                            />
                        </View>
                : <CameraPermissionView/>
            }
        </>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        padding: 10,
        backgroundColor: 'blue',
        borderRadius: 5,
    },
});
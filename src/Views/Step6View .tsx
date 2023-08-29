import React, { useContext, useEffect, useState } from 'react';
import { Animated, Image, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { BottomModal } from '../Components/BottomModal';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { PermissionsContext } from '../Context/PermissionsContext';
import { LoadingView } from './LoadingView';
import { CameraPermissionView } from './CameraPermissionsView';
import { ZoomModal } from '../Components/ZoomModal';

export const Step6View = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [zoomModalVisible, setZoomModalVisible] = useState(false);
    const [enableSee, setEnableSee] = useState(false);
    const slideAnimation = new Animated.Value(0);
    const { height } = useWindowDimensions();
    const [url, setUrl] = useState('');

    const { permissions } = useContext(PermissionsContext);

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
        setZoomModalVisible(true);
    };

    const handleUploadPicture = () => {
        launchImageLibrary({ mediaType: 'photo', selectionLimit: 1 }, (response) => {
            if (response.assets && response.assets.length > 0) {
                const firstImageUri = response.assets[0].uri;
                setUrl(firstImageUri!);
                setEnableSee(true);
            }
        });
        setModalVisible(false);
    };

    const handleLaunchCamera = () => {
        launchCamera({ mediaType: 'photo', cameraType: 'front' }, (response) => {
            if (response.assets && response.assets.length > 0) {
                const firstImageUri = response.assets[0].uri;
                setUrl(firstImageUri!);
                setEnableSee(true);
            }
        });
        setModalVisible(false);
    };

    const handleCloseModal = () => {
        setZoomModalVisible(false);
        setModalVisible(false);
    };

    return (
        <>
            {permissions.cameraStatus === 'granted' ? (
                <View style={styles.container}>
                    <TouchableOpacity style={styles.button} onPress={showModal}>
                        <Image
                            source={url !== '' ? { uri: url } : require('../Assets/Images/local3D.png')}
                            style={styles.image}
                        />
                    </TouchableOpacity>
                    <BottomModal
                        slideUp={slideUp}
                        modalVisible={modalVisible}
                        hideModal={hideModal}
                        enable={enableSee}
                        actionBtn1={handleSeePicture}
                        actionBtn2={handleUploadPicture}
                        actionBtn3={handleLaunchCamera}
                    />
                </View>
            ) : (
                <CameraPermissionView />
            )}
            <ZoomModal url={url} zoomModalVisible={zoomModalVisible} closeZoomModal={handleCloseModal} />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    button: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20,
        padding: 10,
    },
    image: {
        width: 150,
        height: 150,
        resizeMode: 'cover',
        borderRadius: 10,
    },
});

export default Step6View;

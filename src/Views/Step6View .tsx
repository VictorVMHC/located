import React, { useContext, useEffect, useState } from 'react';
import { Animated, Image, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { PermissionsContext } from '../Context/PermissionsContext';
import { BottomModal } from '../Components/BottomModal';
import { CameraPermissionView } from './CameraPermissionsView';
import { ZoomModal } from '../Components/ZoomModal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../Themes/Styles';

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
                setUrl(firstImageUri || '');
                setEnableSee(true);
            }
        });
        setModalVisible(false);
    };

    const handleLaunchCamera = () => {
        launchCamera({ mediaType: 'photo', cameraType: 'front' }, (response) => {
            if (response.assets && response.assets.length > 0) {
                const firstImageUri = response.assets[0].uri;
                setUrl(firstImageUri || '');
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
                    <View style={styles.imageContainer}>
                        <Image
                            source={url !== '' ? { uri: url } : require('../Assets/Images/local3D.png')}
                            style={styles.image}
                        />
                        <View style={styles.styleButton}>
                            <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)} >
                                <Icon name='pencil-outline' size={25} color={Colors.darkGray}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>
                            Add an image of your local. This image will be used as a local profile photo.
                        </Text>
                    </View>
                    <BottomModal
                        slideUp={slideUp}
                        modalVisible={modalVisible}
                        hideModal={() => setModalVisible(false)}
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
    imageContainer: {
        flex: 5,
        width: '50%', // Adjust this value as needed
        aspectRatio: 1,
        borderRadius: 10,
        borderWidth:  1,
        marginVertical:10,
        padding: 1,
    },
    textContainer: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
    },
    text: {
        textAlign: 'center',
        fontSize: 16,
        color: '#555',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover', 
        borderRadius: 10,
    },
    styleButton:{
        position: 'absolute', 
        bottom: -10, 
        alignSelf: 'center',
        borderRadius: 50,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: Colors.grayOpacity
    },
    button:{
        backgroundColor: Colors.YellowOpacity,
        borderRadius: 50,
        padding: 8,
    }
});

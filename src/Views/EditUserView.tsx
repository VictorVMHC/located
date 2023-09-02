import React, { useState, useContext, useEffect } from 'react'
import { Dimensions, Image, StyleSheet, Text, TextInput, TouchableHighlight, View, KeyboardAvoidingView, ScrollView, Animated, useWindowDimensions } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { AuthContext } from '../Context/AuthContext';
import { Formik } from 'formik';
import { User} from '../Interfaces/UserInterface';
import { putUser } from '../Api/userApi';
import { compareUsers } from '../Utils/HandleUser';
import { BottomModal } from '../Components/BottomModal';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { ZoomModal } from '../Components/ZoomModal';
import { PermissionsContext } from '../Context/PermissionsContext';
import { Colors } from '../Themes/Styles';
import axios from 'axios';

const windowWidth = Dimensions.get('window').width;

export const EditUserView = () => {
    const { user, updateUser }  = useContext(AuthContext);
    const [modalVisible, setModalVisible] = useState(false);
    const slideAnimation = new Animated.Value(0);
    const { height } = useWindowDimensions();
    const [enableSee, setEnableSee] = useState(false);
    const [zoomModalVisible, setZoomModalVisible] = useState(false);
    const [url, setUrl] = useState('');
    const {askCameraPermission } = useContext( PermissionsContext );
    const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dellfisyj/upload';
    const apiKey = '542118896274844';
    const uploadPreset = 'located';


    useEffect(() => {
        if (user?.image) {
            setUrl(user.image);
            setEnableSee(true); 
        }
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

    const permissions = () => {
        askCameraPermission();
        setModalVisible(true);     
    }

    const handleCloseModal = () => {
        setZoomModalVisible(false);
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

    const urlCloudinary = async (image: string) => {
        const formData = new FormData();
        formData.append('file', {
            uri: image,
            type: 'image/jpeg', // Asegúrate de ajustar el tipo de archivo según corresponda
            name: 'uploaded_image.jpg',
        });
        const responsecloudinary = await fetch(`${cloudinaryUrl}?api_key=${apiKey}&upload_preset=${uploadPreset}`, {
            method: 'POST',
            body: formData,
        });

        return responsecloudinary.json()
    }

    const handleSubmit = async (userUpdate: User) => {
        console.log(user?.image);
        userUpdate.image = url;
        console.log(userUpdate.image);
        try {
            if (!user) {
                console.log('El usuario es nulo, no se puede actualizar');
                return;
            }
            const response = compareUsers(user, userUpdate);
            if (Object.keys(response).length > 0) {   
                if(response.image){
                // Obtiene la URL de la imagen cargada desde la respuesta de Cloudinary
                const data = await urlCloudinary(response.image);
                    response.image = data.secure_url;
                }
                const data = await putUser(user.email!, response as User);
                if (data.status === 200) {
                    console.log('Usuario actualizado exitosamente');
                    updateUser({ ...user, ...response }, "this is a token");
                }
            } else {
                console.log('No hay cambios para actualizar');
            }
        } catch (error: any) {
            console.log(JSON.stringify(error));
        }
    };

    return (
            <ScrollView>
                    <View style={StyleEditUser.topContainer}>
                        <View style={StyleEditUser.containerImgEdit}>
                            <View style={StyleEditUser.containerImg}>
                                <Image
                                    style={StyleEditUser.img}
                                    source={url !== '' ? { uri: url } : require('../Assets/Images/Img_User.png')}
                                />
                            </View>
                                <TouchableHighlight  style={StyleEditUser.containerEditIcon} underlayColor="lightgray" onPress={permissions}>
                                    <Icon name='pen' size={20} color="black" light/>
                                </TouchableHighlight>
                        </View>
                    </View>
                        <View  style={StyleEditUser.centerContainer}>
                            <Formik
                                initialValues={{
                                    name: user?.name || '',
                                    email: user?.email || '',
                                    phone: user?.phone || '',
                                    username: user?.username || '',
                                    age: user?.age || 0,
                                }}
                                onSubmit={(User)=>{handleSubmit(User)}}
                            >
                                {({ handleChange, handleSubmit, values }) => (
                                    <View>
                                        <View style={StyleEditUser.containerTextInput}>
                                            <Text style={StyleEditUser.text}>Name</Text>
                                            <TextInput 
                                            style={StyleEditUser.textInput} 
                                            placeholder={user?.name}
                                            onChangeText={handleChange('name')}
                                            value={values.name}
                                            ></TextInput>
                                        </View>
                                        <View style={StyleEditUser.containerTextInput}>
                                            <Text style={StyleEditUser.text}>User Name</Text>
                                            <TextInput 
                                            style={StyleEditUser.textInput} 
                                            placeholder={user?.username}
                                            onChangeText={handleChange('username')}
                                            value={values.username}
                                            ></TextInput>
                                        </View>
                                        <View style={StyleEditUser.containerTextInput}>
                                            <Text style={StyleEditUser.text}>Email</Text>
                                            <TextInput 
                                            style={StyleEditUser.textInput} 
                                            placeholder={user?.email}
                                            onChangeText={handleChange('email')}
                                            value={values.email}
                                            ></TextInput>
                                        </View>
                                        <View style={StyleEditUser.containerTextInput}>
                                            <Text style={StyleEditUser.text}>Telefono</Text>
                                            <TextInput 
                                            style={StyleEditUser.textInput} 
                                            placeholder={user?.phone}
                                            onChangeText={handleChange('phone')}
                                            value={values.phone}
                                            ></TextInput>
                                        </View>
                                        <View style={StyleEditUser.containerTextInput}>
                                            <Text style={StyleEditUser.text}>Edad</Text>
                                            <TextInput 
                                            style={StyleEditUser.textInput} 
                                            placeholder={`${user?.age}`}
                                            placeholderTextColor={Colors.black}
                                            onChangeText={handleChange('age')}
                                            ></TextInput>
                                        </View>
                                        <View style={StyleEditUser.containerTextInput}>
                                            <TouchableHighlight style={StyleEditUser.button} underlayColor= 'rgba(255,198,0,1)' onPress={handleSubmit}>
                                                <Text style={StyleEditUser.textButton}>Actualizar</Text>
                                            </TouchableHighlight>
                                        </View>
                                    </View>
                                )}
                            </Formik>
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
                    <ZoomModal url={url} zoomModalVisible={zoomModalVisible} closeZoomModal={handleCloseModal} />
            </ScrollView>
    )
}

const StyleEditUser = StyleSheet.create({
    topContainer:{
        width: windowWidth,
        height: windowWidth*0.55,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerContainer:{
        width: windowWidth,
        height: windowWidth*1.325,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    containerImgEdit:{
        width: windowWidth * 0.33, 
        height: windowWidth * 0.33,
        justifyContent: 'center',
        alignItems: 'center',

    },
    containerEditIcon:{
        width: windowWidth * 0.12,
        height: windowWidth * 0.12,
        borderRadius: windowWidth * 0.12 / 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.94)',
        position: 'absolute',
        alignSelf: 'flex-end',
        bottom: windowWidth * 0.01,
        right: windowWidth * 0.01,
        
    },
    containerImg:{
        width: windowWidth * 0.32, 
        height: windowWidth * 0.32,
        borderRadius: (windowWidth * 0.4) / 2, 
        overflow: 'hidden', 
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightgray',
        borderColor: Colors.grayOpacity,
        borderWidth: 3,
    },
    img:{
        width: '100%', // Adjust this value as needed
        aspectRatio: 1,
        borderRadius: 10,
        borderWidth:  1,
        marginVertical:10,
        padding: 1,
        resizeMode: 'contain'
    },
    containerTextInput:{
        width: windowWidth * 0.85,
        height: windowWidth * 0.20,
        justifyContent: 'flex-end'
    },
    text:{
        fontFamily: 'Outfit.Regular',
        fontSize: 23,
        color: Colors.black
    },
    textInput:{
        borderColor: 'rgba(0,0,0,0.5)',
        borderWidth: 1,
        borderRadius: 7,
        color: Colors.black,
        fontSize: 19,
        fontFamily: 'Outfit.Regular'
    },
    button:{
        width: windowWidth * 0.85,
        height: windowWidth * 0.13,
        backgroundColor: Colors.black,
        justifyContent: 'center',
        borderRadius: 11
    },
    textButton:{
        color: Colors.white,
        textAlign: 'center',
        fontFamily: 'Outfit.SemiBold',
        fontSize: 23
    }
});
function then(arg0: (data: any) => void) {
    throw new Error('Function not implemented.');
}


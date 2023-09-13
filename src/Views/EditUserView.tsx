import React, { useState, useContext, useEffect } from 'react'
import { Dimensions, Image, StyleSheet, Text, TextInput, TouchableHighlight, View, KeyboardAvoidingView, ScrollView, Animated, useWindowDimensions } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { AuthContext } from '../Context/AuthContext';
import { Formik } from 'formik';
import { User} from '../Interfaces/UserInterface';
import { putUser} from '../Api/userApi';
import { compareUsers } from '../Utils/HandleUser';
import { BottomModal } from '../Components/BottomModal';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { ZoomModal } from '../Components/ZoomModal';
import { PermissionsContext } from '../Context/PermissionsContext';
import { Colors } from '../Themes/Styles';
import { CustomAlert } from '../Components/CustomAlert';
import { postImage } from '../Api/imageApi';
import { useTranslation } from 'react-i18next';

const windowWidth = Dimensions.get('window').width;

export const EditUserView = () => {
    const { t } = useTranslation();
    const { user, updateUser }  = useContext(AuthContext);
    const [modalVisible, setModalVisible] = useState(false);
    const slideAnimation = new Animated.Value(0);
    const { height } = useWindowDimensions();
    const [enableSee, setEnableSee] = useState(false);
    const [zoomModalVisible, setZoomModalVisible] = useState(false);
    const [url, setUrl] = useState(user?.image || '');
    const [imageFlag, setImageFlag] = useState(false);
    const {askCameraPermission } = useContext( PermissionsContext );



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
                setImageFlag(true);
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
                setImageFlag(true);
                setEnableSee(true);
            }
        });
        setModalVisible(false);
    };

    const urlCloudinary = async (image: string) => {
        try{
            const formData = new FormData();
            formData.append('image',{
                uri: image,
                type: 'image/jpeg', 
                name: 'uploaded_image.jpg',
            });
            const response = await postImage(formData); 
            return response.data.response.url;
        }catch(error){
            console.error(error);
        }
        
    }

    const handleSubmit = async (userUpdate: User) => {
        userUpdate.image = imageFlag ? url : user?.image;
        try {
            if (!user) {
                return;
            }
            const partialUser = compareUsers(user, userUpdate);
            if (Object.keys(partialUser).length > 0) {   
                if(imageFlag == true){
                    console.log('hola');
                    const urlImg = await  urlCloudinary(url);
                    partialUser.image = urlImg;
                }
                const data = await putUser( partialUser as User);
                if (data.status === 200) {
                    setImageFlag(false);
                    updateUser({ ...user, ...partialUser }, data.data.token);
                    CustomAlert({
                        title: t('UserUpdatedTitle'), 
                        desc: t('UserUpdated'),
                    })
                }
            } else {
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
                                <Text style={StyleEditUser.text}>{t('Name')}</Text>
                                <TextInput 
                                    style={StyleEditUser.textInput} 
                                    placeholder={user?.name}
                                    onChangeText={handleChange('name')}
                                    value={values.name}
                                    onEndEditing={handleSubmit}
                                />
                            </View>
                            <View style={StyleEditUser.containerTextInput}>
                                <Text style={StyleEditUser.text}>{t('UserName')}</Text>
                                <TextInput 
                                    style={StyleEditUser.textInput} 
                                    placeholder={user?.username}
                                    onChangeText={handleChange('username')}
                                    value={values.username}
                                    onEndEditing={handleSubmit}
                                />
                            </View>
                            <View style={StyleEditUser.containerTextInput}>
                                <Text style={StyleEditUser.text}>{t('Email')}</Text>
                                <TextInput 
                                    style={StyleEditUser.textInput} 
                                    placeholder={user?.email}
                                    onChangeText={handleChange('email')}
                                    value={values.email}
                                />
                            </View>
                            <View style={StyleEditUser.containerTextInput}>
                                <Text style={StyleEditUser.text}>{t('PhoneNumber')}</Text>
                                <TextInput 
                                    style={StyleEditUser.textInput} 
                                    placeholder={user?.phone}
                                    onChangeText={handleChange('phone')}
                                    value={values.phone}
                                    onEndEditing={handleSubmit}
                                />
                            </View>
                            <View style={StyleEditUser.containerTextInput}>
                                <Text style={StyleEditUser.text}>{t('Age')}</Text>
                                <TextInput 
                                    style={StyleEditUser.textInput} 
                                    placeholder={`${user?.age}`}
                                    placeholderTextColor={Colors.black}
                                    onChangeText={handleChange('age')}
                                    onEndEditing={handleSubmit}
                                />
                            </View>
                            <View style={StyleEditUser.containerTextInput}>
                                <TouchableHighlight style={StyleEditUser.button} underlayColor= 'rgba(255,198,0,1)' onPress={handleSubmit}>
                                    <Text style={StyleEditUser.textButton}>{t('Update')}</Text>
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
        width: windowWidth * 0.35, 
        height: windowWidth * 0.35,
        borderRadius: (windowWidth * 0.4) / 2, 
        overflow: 'hidden', 
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightgray',
        borderColor: Colors.grayOpacity,
        borderWidth: 2,
    },
    img:{
        width: '100%', 
        height: '100%', 
        resizeMode: 'contain',
        borderRadius: windowWidth/2
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


import React, { useState, useContext, useEffect } from 'react'
import { Dimensions, Image, StyleSheet, Text, TextInput, TouchableHighlight, View, ScrollView, Animated, useWindowDimensions } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Formik } from 'formik';
import { BottomModal } from '../Components/BottomModal';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { IconWithText } from '../Components/IconWithText';
import { ZoomModal } from '../Components/ZoomModal';
import { PermissionsContext } from '../Context/PermissionsContext';
import { Colors } from '../Themes/Styles';
import { CustomAlert } from '../Components/CustomAlert';
import { postImage } from '../Api/imageApi';
import { useTranslation } from 'react-i18next';
import { Product } from '../Interfaces/ProductsInterfaces'; 
import * as Yup from 'yup';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { postProduct } from '../Api/productsApi';
import { ViewStackParams } from '../Navigation/MainStackNavigator';

const windowWidth = Dimensions.get('window').width;
interface Props extends NativeStackScreenProps<ViewStackParams, 'CreateProductView'>{};


export const CreateProductView = ({navigation, route}: Props) => {
    const { localId } = route.params;
    const { t } = useTranslation();
    const [modalVisible, setModalVisible] = useState(false);
    const slideAnimation = new Animated.Value(0);
    const { height } = useWindowDimensions();
    const [enableSee, setEnableSee] = useState(false);
    const [zoomModalVisible, setZoomModalVisible] = useState(false);
    const [url, setUrl] = useState('');
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

    const validationSchema = Yup.object().shape({
        productName: Yup.string().required(t('RequireField').toString()),
        price: Yup.number().moreThan(0,t('RequirePrice').toString()).required(t('RequireField').toString()),
        description: Yup.string().required(t('RequireField').toString()),
    });
    
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

    const handleSubmit = async (dataProduct:Product) => {
        try{
            if(imageFlag == true){
                const urlImg = await  urlCloudinary(url);
                dataProduct.img = urlImg;
            }
            console.log(dataProduct);
            const productResponse = await postProduct(dataProduct);
            if (productResponse.status === 200) {
                CustomAlert({
                    title: t('UserPasswordUpdatedTitle'),
                    desc: t('UserPasswordUpdated'),
                })
                return navigation.goBack();
            }
        }catch (error: any){
            if (error.response && error.response.status === 500) {
                CustomAlert({
                    title: "Error",
                    desc: "An error occurred while trying to find popular locals"
                });
            } else {
                CustomAlert({
                    title: "Error",
                    desc: 'Error: ' + error.message
                });
            }
        }
    };
    return (
        <ScrollView>
            <View style={StyleCreateProduct.topContainer}>
                <Text style={StyleCreateProduct.textTitle}>{t('CreateProductTitle')}</Text>
                <View style={StyleCreateProduct.containerImgEdit}>
                <Text style={StyleCreateProduct.textI}>{t('Image')}</Text>
                    <View style={StyleCreateProduct.containerImg}>
                        <Image
                            style={StyleCreateProduct.img}
                            source={url !== '' ? { uri: url } : require('../Assets/Images/No_Image.png')}
                        />
                    </View>
                        <TouchableHighlight  style={StyleCreateProduct.containerEditIcon} underlayColor="lightgray" onPress={permissions}>
                            <Icon name='camera' size={23} color="black" light/>
                        </TouchableHighlight>
                </View>
            </View>
            <View  style={StyleCreateProduct.centerContainer}>
                <Formik
                    initialValues={{
                        productName:"",
                        localId:localId,
                        price: null,
                        description: "",
                    }}
                    onSubmit={(product)=>{handleSubmit(product)}}
                    validationSchema={validationSchema}
                >
                    {({ handleChange, handleSubmit, values, errors }) => (
                        <View>
                            <View style={StyleCreateProduct.containerTextInput}>
                                <Text style={StyleCreateProduct.text}>{t('ProductName')}</Text>
                                <TextInput
                                    style={StyleCreateProduct.textInput} 
                                    onChangeText={handleChange('productName')}
                                    value={values.productName}
                                >
                                </TextInput>
                                {errors.productName && 
                            <IconWithText 
                                NameIcon='exclamation-circle' 
                                text={errors.productName} 
                                ColorIcon={Colors.Yellow} 
                                IconSize={15} 
                                textStyle={{color: Colors.Yellow, fontSize:17}}
                            />}
                            </View>
                            <View style={StyleCreateProduct.containerTextInput}>
                                <Text style={StyleCreateProduct.text}>{t('price')}</Text>
                                <TextInput 
                                    style={StyleCreateProduct.textInput}
                                    keyboardType='number-pad'
                                    value={values.price || ''}
                                    onChangeText={handleChange('price')}>
                                </TextInput>
                                {errors.price && 
                            <IconWithText 
                                NameIcon='exclamation-circle' 
                                text={errors.price} 
                                ColorIcon={Colors.Yellow} 
                                IconSize={15} 
                                textStyle={{color: Colors.Yellow, fontSize:17}}
                            />}
                            </View>
                            <View style={StyleCreateProduct.containerTextInput}>
                                <Text style={StyleCreateProduct.text}>{t('ProductDescription')}</Text>
                                <TextInput 
                                    style={StyleCreateProduct.textInput} 
                                    value={values.description}
                                    onChangeText={handleChange('description')}>
                                </TextInput>
                                {errors.description && 
                            <IconWithText 
                                NameIcon='exclamation-circle' 
                                text={errors.description} 
                                ColorIcon={Colors.Yellow} 
                                IconSize={15} 
                                textStyle={{color: Colors.Yellow, fontSize:17,}}
                            />}
                            </View>
                            <View style={StyleCreateProduct.containerTextInput}>
                                <TouchableHighlight style={StyleCreateProduct.button} underlayColor= 'gray' onPress={handleSubmit}>
                                    <Text style={StyleCreateProduct.textButton}>{t('Create')}</Text>
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

const StyleCreateProduct = StyleSheet.create({
    topContainer:{
        width: windowWidth,
        height: windowWidth*0.92,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerContainer:{
        width: windowWidth,
        height: windowWidth*1.4,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    containerImgEdit:{
        width: windowWidth * 0.94, 
        height: windowWidth * 0.82,
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
        borderColor: 'black',
        borderWidth:2,
        position: 'absolute',
        alignSelf: 'flex-end',
        bottom: windowWidth * 0.01,
        right: windowWidth * 0.01,
        
    },
    containerImg:{
        width: windowWidth * 0.85, 
        height: windowWidth * 0.65,
        borderRadius: (windowWidth * 0.1)/2, 
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
        borderRadius: (windowWidth * 0.1)/2,
    },
    containerTextInput:{
        width: windowWidth * 0.85,
        height: (windowWidth * 0.55)/2,
    },
    textTitle:{
        fontSize: 24,
        color: Colors.black,
        fontWeight:'bold',
        height: (windowWidth * 0.24)/2,
        top:5,
    },
    text:{
        fontFamily: 'Outfit.Regular',
        fontSize: 20,
        left:3,
        color: Colors.black
    },
    textI:{
        fontFamily: 'Outfit.Regular',
        fontSize: 20,
        color: Colors.black,
        width: windowWidth * 0.75,
        height: (windowWidth * 0.18)/2,
    },
    textInput:{
        borderColor: 'rgba(0,0,0,0.5)',
        borderWidth: 1,
        borderRadius: 7,
        color: Colors.black,
        fontSize: 20,
        fontFamily: 'Outfit.Regular'
    },
    button:{
        width: windowWidth * 0.85,
        height: windowWidth * 0.12,
        backgroundColor: Colors.Yellow,
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

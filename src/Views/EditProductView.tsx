import React, { useState, useContext, useEffect } from 'react'
import { Dimensions, Image, StyleSheet, Text, TextInput, TouchableHighlight, View, ScrollView, Animated, useWindowDimensions, TouchableOpacity, Modal } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Formik } from 'formik';
import { BottomModal } from '../Components/BottomModal';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { IconWithText } from '../Components/IconWithText';
import { ZoomModal } from '../Components/ZoomModal';
import { PermissionsContext } from '../Context/PermissionsContext';
import { Colors, FontStyles } from '../Themes/Styles';
import { CustomAlert } from '../Components/CustomAlert';
import { postImage } from '../Api/imageApi';
import { useTranslation } from 'react-i18next';
import { Product } from '../Interfaces/ProductsInterfaces'; 
import * as Yup from 'yup';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { putProduct } from '../Api/productsApi';
import { ViewStackParams } from '../Navigation/MainStackNavigator';
import { productsTagsEs, productsTagsEn} from '../Utils/ArraysProductsTags';
import { compareProducts } from '../Utils/handleProduct';
import i18n from '../Utils/i18n';

const windowWidth = Dimensions.get('window').width;
interface Props extends NativeStackScreenProps<ViewStackParams, 'EditProductView'>{};


export const EditProductView = ({navigation, route}: Props) => {
    const { product } = route.params;
    const { t } = useTranslation();
    const [modalVisible, setModalVisible] = useState(false);
    const [modalTagVisible, setModalTagVisible] = useState(false);
    const slideAnimation = new Animated.Value(0);
    const { height } = useWindowDimensions();
    const [enableSee, setEnableSee] = useState(false);
    const [zoomModalVisible, setZoomModalVisible] = useState(false);
    const [imageFlag, setImageFlag] = useState(false);
    const {askCameraPermission } = useContext( PermissionsContext );
    const listArray = i18n.language === 'es-MX' ? productsTagsEs : productsTagsEn;
    const {_id, productName, price, description, tags, img}= product 
    const [url, setUrl] = useState(img || '');
    const [selectedTags, setSelectedTags] = useState<string[]>(tags);
    const textTags = selectedTags.join(',');
    const isTagSelected = (tag: string) => selectedTags.includes(tag);

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
    const handleTagSelection = (tag: string) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter(selectedTag => selectedTag !== tag));
        } else {
            if (selectedTags.length < 3) {
                setSelectedTags([...selectedTags, tag]);
            }
        }
    }

    const isSelected = (tag: string) => {
        return selectedTags.includes(tag);
    }
    
    const handleConfirmSelection = () => {
        setModalTagVisible(false);
    }

    const validationSchema = Yup.object().shape({
        productName: Yup.string().required(t('RequireField').toString()),
        price: Yup.number().moreThan(0,t('RequirePrice').toString()).required(t('RequireField').toString()),
        description: Yup.string().required(t('RequireField').toString()),
        tags: Yup.array()
        .when([], (tags, schema) => {
            return schema.test({
                test: (value) => value && value.length > 0,
                message: t('RequireTagSelection').toString(),
            });
        })
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
        console.log(dataProduct)
        dataProduct.tags = selectedTags
        try{
            const partialProduct = compareProducts(product, dataProduct);
            console.log(partialProduct)
            if (Object.keys(partialProduct).length > 0) {   
                if(imageFlag == true){
                    const urlImg = await  urlCloudinary(url);
                    partialProduct.img = urlImg;
                }
                if (_id) {
                const dataProduct = await putProduct({productId: _id, updatedProduct: partialProduct as Product });
                if (dataProduct.status === 200) {
                    setImageFlag(false);
                    CustomAlert({
                        title: t('ProductUpdatedTitle'), 
                        desc: t('ProductUpdated'),
                    })
                    return navigation.goBack();
                }
            }
            } else {
            }
        }catch (error: any){
            if (error.response && error.response.status === 500) {
                CustomAlert({
                    title: "Error",
                    desc: t('ProductUpdatedError'),
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
                <Text style={StyleCreateProduct.textTitle}>{t('EditProductTitle')}</Text>
                <View style={StyleCreateProduct.containerImgEdit}>
                <Text style={StyleCreateProduct.textI}>{t('Image')}</Text>
                    <View style={StyleCreateProduct.containerImg}>
                        <Image
                            style={StyleCreateProduct.img}
                            source={url !== '' ? { uri: url } : require('../Assets/Images/No_Image.png')}
                            resizeMode="cover"
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
                        _id: _id,
                        productName: productName,
                        price: price,
                        description: description,
                        tags: tags ,
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
                                    placeholder={productName}
                                    onChangeText={handleChange('productName')}
                                    value={values.productName}
                                    onEndEditing={handleSubmit}
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
                                    onChangeText={handleChange('price')}
                                    
                                    >
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
                                    placeholder={description}
                                    value={values.description}
                                    onChangeText={handleChange('description')}
                                    onEndEditing={handleSubmit}
                                    >    
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
                                <TouchableOpacity onPress={() => setModalTagVisible(true)} style={StyleCreateProduct.button}>
                                    <View style={{width: windowWidth* 0.5}}>
                                        <Text style={{color: Colors.black, fontSize: 15}}>{textTags}</Text>
                                    </View>
                                    <View style={{alignItems: 'flex-end', bottom: windowWidth* 0.01}}>
                                        <Icon name='sort-down' size={30} color="black" light/>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalTagVisible}
                            >
                                <View style={StyleCreateProduct.modalContainer}>
                                    <ScrollView style={StyleCreateProduct.modalContent}>
                                        {listArray.map((tag: string, index) => (
                                            <TouchableOpacity
                                                key={index}
                                                onPress={() => handleTagSelection(tag)}
                                            >
                                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Text style={StyleCreateProduct.modalTag}>
                                                        {tag}
                                                    </Text>
                                                    {isTagSelected(tag) && <Text style={{ color: Colors.greenSuccess, fontSize: 25 }}>✓</Text>}
                                                </View>
                                            </TouchableOpacity>
                                        ))}
                                    </ScrollView>
                                    <TouchableOpacity style={StyleCreateProduct.modalButton} onPress={handleConfirmSelection}>
                                        <Text style={StyleCreateProduct.modalTextBtn}>{t('ConfirmTagBtn')}</Text>
                                    </TouchableOpacity>
                                </View>
                            </Modal>
                            <View style={StyleCreateProduct.containerTextInput}>
                                <TouchableHighlight style={StyleCreateProduct.buttonSubmit} underlayColor= 'gray' onPress={handleSubmit}>
                                    <Text style={StyleCreateProduct.textButton}>{t('Update')}</Text>
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
        height: (windowWidth * 0.50)/3,
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: 11,
        flexDirection: 'row',
        borderColor: Colors.black,
        borderWidth: 1
    },
    textButton:{
        color: Colors.white,
        textAlign: 'center',
        fontFamily: 'Outfit.SemiBold',
        fontSize: 23
    },
    buttonTag: {
        flex:1,
    },
    buttonView:{
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    selectedOption: {
        ...FontStyles.Text,
        padding: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        padding: 10,
        alignItems: 'center',
    },
    modalContent: {
        width: '100%',
    },
    modalTag:{
        color: Colors.white,
        textAlign: 'center',
        fontSize: 22
    },
    modalButton:{
        backgroundColor: Colors.greenSuccess,
        width: windowWidth * 0.7,
        height: windowWidth * 0.1,
        borderRadius: 20,
        justifyContent: 'center'
    },
    modalTextBtn:{
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold',
        color: Colors.white
    },
    buttonSubmit:{
        width: windowWidth * 0.85,
        height: windowWidth * 0.12,
        backgroundColor: Colors.Yellow,
        justifyContent: 'center',
        borderRadius: 11
    }
});

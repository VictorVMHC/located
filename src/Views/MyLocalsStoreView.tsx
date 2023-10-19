import React, {useRef, useState, useEffect, useContext} from 'react'
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView, ScrollViewProps, StyleSheet, Text, View, Button, Dimensions, Animated } from 'react-native';
import { CardCatalogue } from '../Components/CardCatalogue';
import { ImgBusiness } from '../Components/ImgBusiness';
import MapView, { Marker } from 'react-native-maps';
import { TopBar } from '../Components/TopBar';
import { IconWithText } from '../Components/IconWithText';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ViewStackParams } from '../Navigation/MainStackNavigator';
import { Colors } from '../Themes/Styles';
import { deleteProduct, getProductsByLocalId } from '../Api/productsApi';
import { Product } from '../Interfaces/ProductsInterfaces';
import { CustomAlert } from '../Components/CustomAlert';
import { CreateProductAlertView } from './CreateProductAlertView';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useWindowDimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { ModalUpdateLocal } from '../Components/ModalUpdateLocal';
import { PermissionsContext } from '../Context/PermissionsContext';
import { t } from 'i18next';
import { Local } from '../Interfaces/DbInterfaces';
import { BottomModal } from '../Components/BottomModal';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { ZoomModal } from '../Components/ZoomModal';


const windowWidth = Dimensions.get('window').width;
interface Props extends NativeStackScreenProps<ViewStackParams, 'MyLocalsStoreView'>{};

export const MyLocalsStoreView = ({navigation, route}: Props) => {
    const { local } = route.params;
    const [localInfo, setLocalInfo] = useState(local);
    const {name, description, uriImage, _id, address, isVerify, country, state, town, 
        postalCode, contact, schedules, rate, quantityRate, tags, location, open , businessType} = localInfo

    const [ page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [ productsList, setProductsList ] = useState<Product[]>([]);
    const [ isLoadingMore, setIsLoadingMore ] = useState(false);
    const [ haveProducts, setHaveProducts ] = useState(true);
    const { width ,height } = useWindowDimensions();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const scrollViewRef = useRef<ScrollView>(null);
    const addressRef = useRef<View>(null);
    const catalogueRef = useRef<View>(null);
    const {askCameraPermission } = useContext( PermissionsContext );
    const [modalFlagValue, setModalFlagValue] = useState('1');
    const slideAnimation = new Animated.Value(0);
    const [modalVisibleCam, setModalVisibleCam] = useState(false);
    const [enableSee, setEnableSee] = useState(false);
    const [url, setUrl] = useState(uriImage || '');
    const [zoomModalVisible, setZoomModalVisible] = useState(false);
    const [imageFlag, setImageFlag] = useState(false);
    
    
    useEffect(() => {
        if (modalVisibleCam) {
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
        setModalVisibleCam(true);
    }

    const slideUp = slideAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, height * 0.75],
    });

    const handleSeePicture = () => {
        setModalVisibleCam(true);
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
        setModalVisibleCam(false);
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
        setModalVisibleCam(false);
    };

    const handleCloseModal = () => {
        setZoomModalVisible(false);
        setModalVisibleCam(false);
    };

    const openModal = (flagValue: string) => {
        if(flagValue === '1'){
            permissions();
        }
        setIsModalVisible(true); 
        setModalFlagValue(flagValue);
    }

    const closeModal = () => {
        setIsModalVisible(false);
    }
    const handleScrollTo = (targetElement: any ) => {
        if (scrollViewRef.current && targetElement.current) {
            targetElement.current.measureLayout(
                scrollViewRef.current,
                (_: number, y: number) => {
                    y = y - 50;
                    scrollViewRef.current!.scrollTo({ y, animated: true });
                }
            );
        }
    };

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
        const distanceToBottom = contentSize.height - (contentOffset.y + layoutMeasurement.height);
    
        if (distanceToBottom < 100 && !isLoadingMore && page <= totalPage) {
            setIsLoadingMore(true);
            fetchProducts().then(() => setIsLoadingMore(false));
        }
    };

    const fetchProducts = async () => {
        try{
            const result = await getProductsByLocalId(_id, page, 2);
            const { products, totalPages } = result.data;

            if(products){
                setProductsList([...productsList, ...products]);
                setTotalPage(totalPages);
            }
        }catch(err: any){
            
            if(err.response.status === 404){
                CustomAlert({
                    title: "Error",
                    desc: t('ProductsListError'),
                    action: () =>  setHaveProducts(false)
                });
            }
            if(err.response.status === 500){
                CustomAlert({
                    title: "Error",
                    desc: t('ProductsListError2'),
                });
            }
            setTotalPage(0);
        }finally{
            setHaveProducts(true);
            setPage(page + 1);
        }
    }

    useEffect(() => {
        const refreshedList = navigation.addListener('focus', () => {
            if (productsList.length !== 0 && page >= totalPage) {
                return;
            }
            fetchProducts();
        });
        return refreshedList;
    }, [navigation]);
    

    const handleDelete = (productId: string) =>{
        console.log(productId);  
        deleteProduct(productId)
        .then((result: any)=>{
                CustomAlert({
                    title: t('UserPasswordUpdatedTitle'),
                    desc: t('UserPasswordUpdated'),
                });
                const filteredArray = productsList.filter(item => item._id !== productId);
                setProductsList([...filteredArray]);
            }
        )
        .catch((result: any)=>{
            CustomAlert({
                title: 'entro en cath',
                desc: 'entro en cath',
            });
        })
        .finally(()=>{
            console.log('Hola');
        })
    }

    const handleUpdateLocal = (updatedLocal: Local) => {
        setLocalInfo(updatedLocal)
        setIsModalVisible(false); 
    }

    const renderProductList = () => {
        return productsList.map((item) => (
            <CardCatalogue
                key={item._id}
                ProductName={item.productName || ''}
                Price={`${item.price}`}
                Img={item.img || ''}
                Description={item.description}
                showLike={false}
                flagEdit={true}
                productId={item._id}
                Action={() => navigation.navigate('EditProductView', {product: item})}
                deleteAction={handleDelete}
            />
        ));
    };
    
    return (
        <>
            <ScrollView
                style={StylesStore.container}
                ref={scrollViewRef}
                stickyHeaderIndices={[1]}
                onScroll={handleScroll} 
                scrollEventThrottle={200}
            >
                <View>
                    <View style={{backgroundColor: 'red'}}>
                        <ImgBusiness 
                            Img = {url}
                            open = {false}
                            like = {false}
                        />
                        <View style={StylesStore.buttonOpenImg}>
                            <TouchableOpacity   onPress={permissions}>
                                <Icon name='edit' size={25}  light color={Colors.Yellow}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={StylesStore.valuesText}>
                        <Text style={StylesStore.textName}>{name}</Text>
                        <Text style={{...StylesStore.textInformation}}>{businessType}</Text>
                        <Text style={{...StylesStore.textInformation}}>{town}({country})</Text> 
                        <View style={StylesStore.buttonOpen}>
                            <TouchableOpacity onPress={()=>openModal('2')}>
                                <Icon name='edit' size={25}  light color={Colors.black}/>
                            </TouchableOpacity>
                        </View>
                        <ModalUpdateLocal
                            flagValue={modalFlagValue}
                            local={localInfo}
                            img={url}
                            isVisible={isModalVisible}
                            onClose={closeModal}
                            onUpdate={handleUpdateLocal}
                        />
                    </View>
                </View>
                <View style={StylesStore.tobBar}>
                    <TopBar 
                        actionStart={() =>handleScrollTo(scrollViewRef)}
                        actionAddress={() =>handleScrollTo(addressRef)}
                        actionCatalogue={() =>handleScrollTo(catalogueRef)}
                        routeComments={() => navigation.navigate("CommentsView", {localId: _id})}
                    />
                </View>
                <View ref={addressRef}>
                    <MapView style={StylesStore.map} 
                        showsUserLocation
                        initialRegion={{
                            latitude: location.latitude,
                            longitude: location.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        zoomControlEnabled
                        minZoomLevel={13}                        
                    >
                        <Marker
                            key={_id}
                            coordinate={{
                                latitude: location.latitude,
                                longitude: location.longitude
                            }}
                            anchor={{ x: 0.5, y: 0.10 }}
                        /> 
                    </MapView>
                    <View style={StylesStore.valuesText}>
                        <IconWithText 
                            NameIcon ={'directions'}
                            IconSize ={20}
                            ColorIcon={'#CD5F28'}
                            text ={`${address}, ${town}, ${state}, ${country}`}
                        />
                        {
                            contact['Facebook'] && <IconWithText 
                                NameIcon= {'facebook-f'}
                                IconSize= {20}
                                ColorIcon= {Colors.blue}
                                text= {contact['Facebook'].info}
                            />
                        }
                        {
                            contact['Email'] && <IconWithText 
                                NameIcon= {'envelope'}
                                IconSize= {20}
                                ColorIcon= {'#CD5F28'}
                                text= {contact['Email'].info}
                            />
                        }
                        {
                            contact['Instagram'] && <IconWithText 
                                NameIcon= {'instagram'}
                                IconSize= {20}
                                ColorIcon= {'#CD5F28'}
                                text= {contact['Instagram'].info}
                            />
                        }
                        {
                            contact['Web page'] && <IconWithText 
                                NameIcon= {'globe'}
                                IconSize= {20}
                                ColorIcon= {'#CD5F28'}
                                text= {contact['Web page'].info}
                            />
                        }
                        {
                            contact['Whatsapp'] && <IconWithText 
                                NameIcon= {'whatsapp'}
                                IconSize= {20}
                                ColorIcon= {'#CD5F28'}
                                text= {contact['Whatsapp'].info}
                            />
                        }
                        <View style={StylesStore.buttonOpen}>
                            <TouchableOpacity onPress={()=>openModal('3')}>
                                <Icon name='edit' size={25}  light color={Colors.black}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                        <View style={StylesStore.containerList} ref={catalogueRef}>
                            {haveProducts 
                                ? renderProductList()
                                : <CreateProductAlertView navigation={navigation}  local={local}/>
                            }
                            {productsList.length > 0 && (
                                <View style={{alignItems: 'flex-end',padding: '2%', width: '100%', height: (height * (0.15 / 2) ) }}>
                                    <TouchableOpacity 
                                        style={{...StylesStore.buttonCreateProduct, width: (width * 0.15), height: (height * 0.07 ),}}
                                        onPress={()=>navigation.navigate("CreateProductView",{localId: _id})}>
                                        <Icon name='plus' size={25}  light color={Colors.white}/>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                </View>
                <BottomModal
                    slideUp={slideUp}
                    modalVisible={modalVisibleCam}
                    hideModal={() => setModalVisibleCam(false)}
                    enable={enableSee}
                    actionBtn1={handleSeePicture}
                    actionBtn2={handleUploadPicture}
                    actionBtn3={handleLaunchCamera}
                />
                <ZoomModal url={url} zoomModalVisible={zoomModalVisible} closeZoomModal={handleCloseModal} />
            </ScrollView>
        </>
    )
}

const StylesStore = StyleSheet.create({
    container:{
        backgroundColor: '#FFFFFF'
    },
    tobBar:{
        backgroundColor: 'white',
        height: 50,
    },
    map:{
        marginHorizontal: 10,
        height: 150,
        marginBottom: 10
    },
    textName:{
        fontSize: 35,
        fontWeight: 'bold',
        color: 'black',
        fontFamily: 'Outfit-SemiBold', 
    },
    valuesText:{
        paddingLeft: 10,
        marginBottom: 15,
    },
    textInformation:{
        fontWeight: '500',
        fontSize: 16,
        color: 'black'
    },
    containerList:{
        justifyContent: 'center', 
        alignItems: 'center', 
        marginVertical: 20
    },
    buttonCreateProduct:{
    backgroundColor: Colors.Yellow, 
    borderRadius: 50, 
    justifyContent: 'center', 
    alignItems: 'center', 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
    },
    buttonOpen: {
        width: windowWidth*0.12,
        height: windowWidth*0.12,
        borderRadius: 30,
        position: 'absolute',
        bottom: windowWidth*-0.020, 
        left: windowWidth* 0.87, 
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonOpenImg:{
        width: windowWidth*0.15,
        height: windowWidth*0.15,
        backgroundColor: 'rgba(0,0,0,0.9)',
        borderRadius: 30,
        position: 'absolute',
        bottom: 5, 
        right: 5, 
        justifyContent: 'center',
        alignItems: 'center',
    } 
});

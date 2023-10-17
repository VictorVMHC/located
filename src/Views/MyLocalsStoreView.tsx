import React, {useRef, useState, useEffect} from 'react'
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView, ScrollViewProps, StyleSheet, Text, View, Button, Dimensions } from 'react-native';
import { CardCatalogue } from '../Components/CardCatalogue';
import { ImgBusiness } from '../Components/ImgBusiness';
import MapView, { Marker } from 'react-native-maps';
import { TopBar } from '../Components/TopBar';
import { IconWithText } from '../Components/IconWithText';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ViewStackParams } from '../Navigation/MainStackNavigator';
import { Colors } from '../Themes/Styles';
import { getProductsByLocalId } from '../Api/productsApi';
import { Product } from '../Interfaces/ProductsInterfaces';
import { CustomAlert } from '../Components/CustomAlert';
import { CreateProductAlertView } from './CreateProductAlertView';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useWindowDimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { ModalUpdateLocal } from '../Components/ModalUpdateLocal';


const windowWidth = Dimensions.get('window').width;
interface Props extends NativeStackScreenProps<ViewStackParams, 'MyLocalsStoreView'>{};

export const MyLocalsStoreView = ({navigation, route}: Props) => {
    const { local } = route.params;
    const [ page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [ productsList, setProductsList ] = useState<Product[]>([]);
    const [ isLoadingMore, setIsLoadingMore ] = useState(false);
    const [ haveProducts, setHaveProducts ] = useState(true);
    const { width ,height } = useWindowDimensions();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const {name, description, uriImage, _id, address, isVerify, country, state, town, 
            postalCode, contact, schedules, rate, quantityRate, tags, location, open , businessType} = local

    const scrollViewRef = useRef<ScrollView>(null);
    const addressRef = useRef<View>(null);
    const catalogueRef = useRef<View>(null);
    const [updateListProducts, setUpdateListProducts] = useState(false);
    
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
                    desc: "Was not possible to retrieve the local products, ¡Please try again2!",
                    action: () =>  setHaveProducts(false)
                });
            }
            if(err.response.status === 500){
                CustomAlert({
                    title: "Error",
                    desc: "Was not possible to retrieve the local products, ¡Please try again!"
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
    
    useEffect(() => {
        if (updateListProducts) {
            fetchProducts();
            setUpdateListProducts(false);
        }
    }, [updateListProducts]);

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
                setUpdateListProducts={setUpdateListProducts} 
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
                    <ImgBusiness 
                        Img = {uriImage}
                        open = {false}
                        like = {false}
                        editButton = {true}
                    />
                    <View style={StylesStore.valuesText}>
                        <Text style={StylesStore.textName}>{name}</Text>
                        <Text style={{...StylesStore.textInformation}}>{businessType}</Text>
                        <Text style={{...StylesStore.textInformation}}>{town}({country})</Text> 
                        <View style={StylesStore.buttonOpen}>
                            <TouchableOpacity onPress={() => setIsModalVisible(true)}>
                                <Icon name='edit' size={25}  light color={Colors.black}/>
                            </TouchableOpacity>
                        </View>
                        <ModalUpdateLocal
                            flagValue={'1'}
                            _id= {_id}
                            name={name}
                            isVisible={isModalVisible}
                            onClose={() => setIsModalVisible(false)}
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
                            <TouchableOpacity>
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
        backgroundColor: 'pink'
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
});

import React, { useEffect, useRef, useState } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleSheet, Text, View } from 'react-native';
import { CardCatalogue } from '../Components/CardCatalogue';
import { ImgBusiness } from '../Components/ImgBusiness';
import MapView, { Marker } from 'react-native-maps';
import { TopBar } from '../Components/TopBar';
import { IconWithText } from '../Components/IconWithText';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getLocal } from '../Api/localApi';
import { Local } from '../Interfaces/DbInterfaces';
import { Colors } from '../Themes/Styles';
import { getProductsByLocalId } from '../Api/productsApi';
import { Product } from '../Interfaces/ProductsInterfaces';
import { CustomAlert } from '../Components/CustomAlert';
import { CreateProductAlertView } from './CreateProductAlertView';
import { ThereAreNoLocals } from '../Components/ThereAreNoLocals';

interface Props extends NativeStackScreenProps<any, any>{};

const mapStyle = [
    {
        elementType: 'labels.icon',
        stylers: [
            {
                visibility: 'off',
            },
        ],
    },
    {
        featureType: 'poi',
        stylers: [
            {
                visibility: 'off',
            },
        ],
    },
]
export const StoreView = ({navigation, route}: Props) => {
    const id = route.params?.id;

    const [ page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [ productsList, setProductsList ] = useState<Product[]>([]);
    const [ isLoadingMore, setIsLoadingMore ] = useState(false);
    const [ haveProducts, setHaveProducts ] = useState(true);

    const scrollViewRef = useRef<ScrollView>(null);
    const addressRef = useRef<View>(null);
    const catalogueRef = useRef<View>(null);
    const [dataLocals, setDataLocals] = useState<Local>();

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
            const result = await getProductsByLocalId(id, page, 2);
            const { products, totalPages } = result.data;

            if(products){
                setProductsList([...productsList, ...products]);
                setTotalPage(totalPages);
            }
        }catch(err: any){
            
            if(err.response.status === 404){
                CustomAlert({
                    title: "Error",
                    desc: "Was not possible to retrieve the local products, ¡Please try again!",
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

    const fetchLocalData = async () => {
        try {
            const response = await getLocal(id);
            setDataLocals(response.data.locals);    
        } catch (error) {
            console.error('Error fetching local data:', error);
        }
    };

    useEffect(() => {
        if(productsList.length !== 0 && page >= totalPage){
            return;
        }
        fetchProducts();
        fetchLocalData();
        console.log('name '+ dataLocals?.name);  
    }, [id]);

    

    const renderProductList = () => {
        return productsList.map((item) => (
            <CardCatalogue
                key={item._id}
                ProductName={item.productName}
                Price={`${item.price}`}
                Img={item.img}
                Description={item.description}
                showLike={false}
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
                >
                <View>
                    <ImgBusiness 
                        Img = {dataLocals ? dataLocals.uriImage : ''}
                        open = {false}
                        like = {false}
                    />
                    <View style={StylesStore.valuesText}>
                        <Text style={StylesStore.textName}>{dataLocals?.name}</Text>
                        <Text style={{...StylesStore.textInformation}}>{dataLocals?.businessType}</Text>
                        <Text style={{...StylesStore.textInformation, color: 'green'}}>{dataLocals?.open}</Text>
                        <Text style={{...StylesStore.textInformation}}>{`${dataLocals?.town}(${dataLocals?.state})`}</Text> 
                    </View>
                </View>
                <View style={StylesStore.tobBar}>
                    <TopBar 
                        actionStart={() =>handleScrollTo(scrollViewRef)}
                        actionAddress={() =>handleScrollTo(addressRef)}
                        actionCatalogue={() =>handleScrollTo(catalogueRef)}
                        routeComments={() => navigation.navigate("CommentsView")}
                    />
                </View>
                <View ref={addressRef}>
                    <MapView 
                        style={StylesStore.map}
                        customMapStyle={mapStyle}
                        showsUserLocation
                        initialRegion={{
                            latitude: dataLocals?.location?.latitude || 0,
                            longitude: dataLocals?.location.longitude || 0,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        zoomControlEnabled
                        minZoomLevel={13} 
                        >
                        <Marker
                            key={id}
                            coordinate={{
                                latitude: dataLocals?.location?.latitude || 0,
                                longitude: dataLocals?.location.longitude || 0,
                            }}
                            anchor={{ x: 0.5, y: 0.10 }}
                        /> 
                        </MapView>
                    <View style={StylesStore.valuesText}>
                        <IconWithText 
                            NameIcon ={'directions'}
                            IconSize ={20}
                            ColorIcon={'#CD5F28'}
                            text ={`${dataLocals?.address}, CP ${dataLocals?.postalCode} ${dataLocals?.town}, ${dataLocals?.state}. ${dataLocals?.country}  `}
                        />
                        {
                            dataLocals?.contact['Facebook'] && <IconWithText 
                                NameIcon= {'facebook-f'}
                                IconSize= {20}
                                ColorIcon= {Colors.orange}
                                text= { dataLocals?.contact['Facebook'].info}
                            />
                        }
                        {
                            dataLocals?.contact['Email'] && <IconWithText 
                                NameIcon= {'envelope'}
                                IconSize= {20}
                                ColorIcon= {Colors.orange}
                                text= { dataLocals?.contact['Email'].info}
                            />
                        }
                        {
                            dataLocals?.contact['Instagram'] && <IconWithText 
                                NameIcon= {'globe'}
                                IconSize= {20}
                                ColorIcon= {Colors.orange}
                                text= { dataLocals?.contact['Instagram'].info}
                            />
                        }
                        {
                            dataLocals?.contact['Web page'] && <IconWithText 
                                NameIcon= {'globe'}
                                IconSize= {20}
                                ColorIcon= {Colors.orange}
                                text= { dataLocals?.contact['Web page'].info}
                            />
                        }
                        {
                            dataLocals?.contact['Whatsapp'] && <IconWithText 
                                NameIcon= {'whatsapp'}
                                IconSize= {20}
                                ColorIcon= {Colors.orange}
                                text= { dataLocals?.contact['Whatsapp'].info}
                            />
                        } 
                    </View>
                    <View style={StylesStore.containerList} ref={catalogueRef}>
                            {haveProducts 
                                ? renderProductList()
                                : <ThereAreNoLocals text={'No hay productos'} information={'El local en cuestión no cuenta con productos en el momento'}/>
                            }
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
        marginBottom: 15
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
    }
});
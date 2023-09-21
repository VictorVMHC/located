import React, {useRef, useState} from 'react'
import { ScrollView, StyleSheet, Text, View} from 'react-native'
import { CardCatalogue } from '../Components/CardCatalogue';
import { ImgBusiness } from '../Components/ImgBusiness';
import MapView from 'react-native-maps';
import { TopBar } from '../Components/TopBar';
import { IconWithText } from '../Components/IconWithText';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Local } from '../Interfaces/DbInterfaces';
import { ViewStackParams } from '../Navigation/MainStackNavigator';
import { Colors } from '../Themes/Styles';
import { FlatList } from 'react-native-gesture-handler';
import { getProductsByLocalId } from '../Api/productsApi';
import { Products } from '../Interfaces/ProductsInterfaces';
import { CustomAlert } from '../Components/CustomAlert';

interface Props extends NativeStackScreenProps<ViewStackParams, 'MyLocalsStoreView'>{};

const rendererBusiness = (item: any) => {
    
    return (
        <CardCatalogue
            ProductName = {item.productNamee}
            Price = {item.price}
            Img = {item.img}
            DescriptionBox = {item.DescripcionB}
            like = {item.like}
        />
    );
}

export const MyLocalsStoreView = ({navigation, route}: Props) => {
    const { local } = route.params;
    const [ page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [ products, setProducts ] = useState<Products[]>([]);


    const {name, description, uriImage,_id, address, isVerify: boolean, country, state, town, 
            postalCode, contact, schedules, rate, quantityRate, tags, location, open , businessType} = local

    const scrollViewRef = useRef<ScrollView>(null);
    const addressRef = useRef<View>(null);
    const catalogueRef = useRef<View>(null);
    
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


    const fetchProducts = async () => {
        try{
            const result = await getProductsByLocalId(_id, page);
            const { products, totalPages } = result.data;
            if(products){
                setProducts([...products, ...products]);
                setPage(page + 1);
                setTotalPage(totalPages);
            }
        }catch(err){
            CustomAlert({
                title: "Error",
                desc: "Was not possible to retrieve the local products, ¡Please try again!"
            });
        }
    }

    const handleLoadMore = () => {
        if(page > totalPage){
            return; 
        }
        fetchProducts();
    } 
    return (
        <>
            <ScrollView style={StylesStore.container} ref={scrollViewRef}  stickyHeaderIndices={[1]}>
                <View>
                    <ImgBusiness 
                        Img = {uriImage}
                        open = {false}
                        like = {false}
                    />
                    <View style={StylesStore.valuesText}>
                        <Text style={StylesStore.textName}>{name}</Text>
                        <Text style={{...StylesStore.textInformation}}>{businessType}</Text>
                        <Text style={{...StylesStore.textInformation}}>{town}({country})</Text> 
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
                    <MapView style={StylesStore.map} />
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
                    </View>
                    <View style={StylesStore.containerList} ref={catalogueRef}>
                        <FlatList 
                            data={products} 
                            renderItem={(item) => rendererBusiness(item)}
                            onEndReached={handleLoadMore}
                            onEndReachedThreshold={0.4}                      
                        />
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

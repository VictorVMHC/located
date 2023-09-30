import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { CardCatalogue } from '../Components/CardCatalogue';
import { ImgBusiness } from '../Components/ImgBusiness';
import MapView, { Marker } from 'react-native-maps';
import { TopBar } from '../Components/TopBar';
import { IconWithText } from '../Components/IconWithText';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getLocal } from '../Api/localApi';
import { Local } from '../Interfaces/DbInterfaces';
import { Location } from '../Interfaces/MapInterfaces';
import { Colors } from '../Themes/Styles';

interface Props extends NativeStackScreenProps<any, any>{};

interface Store {
    id: number;
    productNamee: string;
    price: string;
    img:  string;
    puntuation: string;
    DescripcionB: string;
    like: boolean;
}

const listArray: Store[] = [
    // ... Tu lista de elementos ...
];
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

const rendererBusiness = (item: any) => {
    return (
        <CardCatalogue
            ProductName = {item.productNamee}
            Price = {item.price}
            Img = {item.img}
            punctuation = {item.puntuation}
            DescriptionBox = {item.DescripcionB}
            like = {item.like}
        />
    );
}

export const StoreView = ({navigation, route}: Props) => {
    const id = route.params?.id;
    const scrollViewRef = useRef<ScrollView>(null);
    const addressRef = useRef<View>(null);
    const catalogueRef = useRef<View>(null);

    const mapViewRef = useRef<MapView>();
    const following = useRef<boolean>(true);

    const initialLocation: Location = {
        latitude: 0,
        longitude: 0,
    }
    const [dataLocals, setDataLocals] = useState<Local>();

    const fetchLocalData = async () => {
        try {
            const response = await getLocal(id);
            setDataLocals(response.data.locals);    
        } catch (error) {
            console.error('Error fetching local data:', error);
        }
    };

    useEffect(() => {
        fetchLocalData();
        console.log('name '+ dataLocals?.name);  
    }, [id]);

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

    return (
        <>
            <ScrollView 
                style={StylesStore.container} 
                ref={scrollViewRef}  
                stickyHeaderIndices={[1]}>
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
                        {
                            listArray.map((item, index) => (
                                <View key={index}>
                                    {rendererBusiness(item)}
                                </View>
                            ))
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
import React, { useRef} from 'react'
import { Button, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View,} from 'react-native'
import { CardCatalogue } from '../Components/CardCatalogue';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ImgBusiness } from '../Components/ImgBusiness';
import Ionicons from 'react-native-vector-icons/FontAwesome5';
import MapView from 'react-native-maps';

class Business{
    id: string
    tipo: string
    img: string

    constructor(id: string, tipo: string, img: string){
        this.id = id
        this.tipo = tipo
        this.img = img
    }
}

const ConstBusiness: Array<Business> = [
    new Business('1','farmacia',require('../Assets/Images/Lisa.png')),
    new Business('2','farmacia',require('../Assets/Images/Lisa.png')),
    new Business('3','farmacia',require('../Assets/Images/Lisa.png')),
    new Business('4','farmacia',require('../Assets/Images/Lisa.png')),
    new Business('5','farmacia',require('../Assets/Images/Lisa.png')),
    new Business('6','farmacia',require('../Assets/Images/Lisa.png')),  
]

const rendererBusiness = ({item} : {item : Business}) => {
    return( 
        <CardCatalogue 
        ProductName = {item.tipo}
        Price = '150'
        Img = 'https://m.media-amazon.com/images/I/61uutWxTEIL._AC_SX679_.jpg'
        punctuation = '4.0'
        DescripcionB = 'asdasdawsdfasdfasdasfasdf'
        like
        />
    )

}

const Tab = createBottomTabNavigator();

export const StoreView = () => {
    const scrollViewRef = useRef<ScrollView>(null);
    const targetElementRef = useRef<View>(null);

    const handleScrollTo = () => {
        console.log("holaaa");
        
        if (scrollViewRef.current && targetElementRef.current) {
            targetElementRef.current.measureLayout(
            scrollViewRef.current.getInnerViewNode(),
            (_, y) => {
                scrollViewRef.current?.scrollTo({ y, animated: true });
            }
        );
        }
    };
    
    return (
        <>
        <ScrollView ref={scrollViewRef}  stickyHeaderIndices={[0]}>
            <ImgBusiness 
                Img = 'https://brandemia.org/contenido/subidas/2022/10/marca-mcdonalds-logo-1200x670.png'
                open = {false}
                like = {false}
            />
            <View style={StylesStore.tobBar}>
                <View>
                    <Text style={{...StylesStore.valuesText, ...StylesStore.textName}}>mcdonalds</Text>
                    <Text style={StylesStore.valuesText}>Product/service</Text>
                    <Text style={{...StylesStore.valuesText, color: 'green'}}>Open</Text>
                    <Text style={StylesStore.valuesText}>Guadalajara(Mexico)</Text>
                </View>
                <View style={StylesStore.navigation}>
                    <TouchableOpacity style={StylesStore.buttonNavigation}>
                        <Text style={StylesStore.textnavigation}>Direccion</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={StylesStore.buttonNavigation} onPress={handleScrollTo}>
                        <Text style={StylesStore.textnavigation}>Catalogo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={StylesStore.buttonNavigation} >
                        <Text style={StylesStore.textnavigation}>...</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <View>
                    <MapView style={{height: 100}}/>
                    <View style={{...StylesStore.valuesText,flexDirection: 'row',marginTop: 5}}><Ionicons name="directions" size={20} color={'#CD5F28'} /><Text style={{marginHorizontal: 5}}>AV. La Paz #1925, col. Americana, CP 44150 Guadalajara, Jalisco. Mexico</Text></View>
                </View>
                <View style={StylesStore.valuesText}>
                    <View style={{flexDirection: 'row'}}><Ionicons name="envelope" size={20} color={'#CD5F28'} /><Text style={{marginHorizontal: 5}}>sayulitrostaquepaque2013@gmail.com</Text></View>
                    <View style={{flexDirection: 'row'}}><Ionicons name="globe" size={20} color={'#CD5F28'} /><Text style={{marginHorizontal: 5}}>Website</Text></View>
                    <View style={{flexDirection: 'row'}}><Ionicons name="info-circle" size={20} color={'#CD5F28'} /><Text style={{marginHorizontal: 5}}>promocion</Text></View>
                </View>
            </View>
            <View ref={targetElementRef} style={{justifyContent: 'center', alignItems: 'center', marginVertical: 20}}>
                <ScrollView horizontal>
                <FlatList data={ConstBusiness} renderItem={rendererBusiness}/>
                </ScrollView>
            </View>
        </ScrollView>
        </>
    )
}

const StylesStore = StyleSheet.create({
    container:{
        flex:1
    },
    containerImg:{
        flex: 3, 
    },
    tobBar:{
        width: '100%',
        height: 150,
    },
    navigation:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
    },
    buttonNavigation:{
        width: '30%',
        height: 30,
        justifyContent: 'center',
    },
    textnavigation:{
        textAlign: 'center',
        justifyContent: 'center',
        fontFamily: 'Outfit-SemiBold', 
        fontSize: 20,
        color: '#000000'
    },
    containerProducts:{
        backgroundColor: 'orange',
        flex: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    databox:{
        width: 280,
        height: 90,
        backgroundColor: 'white',
        position: 'absolute',
        top: 190,
        left: 40,
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 1.5,
    },
    textName:{
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black',
        fontFamily: 'Outfit-SemiBold', 
    },
    valuesText:{
        marginLeft: 10,
    }


});

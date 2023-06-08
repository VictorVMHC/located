import React, { useRef} from 'react'
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View,} from 'react-native'
import { CardCatalogue } from '../Components/CardCatalogue';
import { ImgBusiness } from '../Components/ImgBusiness';
import Ionicons from 'react-native-vector-icons/FontAwesome5';
import MapView from 'react-native-maps';
import { Colors } from '../Themes/Styles';


class Business{
    id: string
    tipo: string


    constructor(id: string, tipo: string,){
        this.id = id
        this.tipo = tipo
    }
}

const ConstBusiness: Array<Business> = [
    new Business('1','farmacia'),
    new Business('2','farmacia'),
    new Business('3','farmacia'),  
    new Business('4','farmacia'),
    new Business('5','farmacia'),
    new Business('6','farmacia'),  
    new Business('7','farmacia'),
    new Business('8','farmacia'),
    new Business('9','farmacia'),  
    new Business('10','farmacia'),
    new Business('11','farmacia'),
    new Business('12','farmacia'),  
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

export const StoreView = () => {
    const scrollViewRef = useRef<ScrollView>(null);
    const targetElementRef = useRef<View>(null);

    const handleScrollTo = () => {
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
            <ScrollView style={StylesStore.container} ref={scrollViewRef}  stickyHeaderIndices={[1]}>
                <View>
                    <ImgBusiness 
                        Img = 'https://brandemia.org/contenido/subidas/2022/10/marca-mcdonalds-logo-1200x670.png'
                        open = {false}
                        like = {false}
                    />
                    <View style={StylesStore.valuesText}>
                        <Text style={StylesStore.textName}>mcdonalds</Text>
                        <Text style={{...StylesStore.textInformation}}>Product/service</Text>
                        <Text style={{...StylesStore.textInformation, color: 'green'}}>Open</Text>
                        <Text style={{...StylesStore.textInformation}}>Guadalajara(Mexico)</Text> 
                    </View>
                </View>
                <View style={StylesStore.tobBar}>
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
                        <MapView style={StylesStore.map} />
                    </View>
                    <View style={StylesStore.valuesText}>
                    <View style={{flexDirection: 'row',marginTop: 10}}><Ionicons name="directions" size={20} color={'#CD5F28'} /><Text style={{marginHorizontal: 5}}>AV. La Paz #1925, col. Americana, CP 44150 Guadalajara, Jalisco. Mexico</Text></View>
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
        backgroundColor: '#FFFFFF'
    },
    containerImg:{
        flex: 3, 
    },
    tobBar:{
        width: '100%',
        height: 50,
        backgroundColor: 'white',
        marginBottom: 5
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
        borderBottomColor: Colors.Yellow,
        borderBottomWidth: 3
        
    },
    textnavigation:{
        textAlign: 'center',
        justifyContent: 'center',
        fontFamily: 'Outfit-SemiBold', 
        fontSize: 20,
        color: '#000000'
    },
    map:{
        marginHorizontal: 10,
        height: 150
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
        fontSize: 16
    }
});

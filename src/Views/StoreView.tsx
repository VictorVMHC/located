import React, { useRef} from 'react'
import { LayoutRectangle, ScrollView, StyleSheet, Text, TouchableOpacity, UIManager, View,findNodeHandle} from 'react-native'
import { CardCatalogue } from '../Components/CardCatalogue';
import { ImgBusiness } from '../Components/ImgBusiness';
import Ionicons from 'react-native-vector-icons/FontAwesome5';
import MapView from 'react-native-maps';
import { Colors } from '../Themes/Styles';


interface Store {
    id: number;
    productNamee: string;
    price: string;
    img:  string;
    puntuation: string;
    DescripcionB: string;
    like: boolean
}

const listArray: Store[] = [
    { id: 1, productNamee: 'paracetamol 1', price: '50.00', img: 'https://m.media-amazon.com/images/I/61uutWxTEIL._AC_SX679_.jpg', puntuation: '4.5', DescripcionB: 'BUENO', like: true },
    { id: 2, productNamee: 'paracetamol 2', price: '50.00', img: 'https://m.media-amazon.com/images/I/61uutWxTEIL._AC_SX679_.jpg', puntuation: '4.5', DescripcionB: 'BUENO', like: true },
    { id: 3, productNamee: 'paracetamol 3', price: '50.00', img: 'https://m.media-amazon.com/images/I/61uutWxTEIL._AC_SX679_.jpg', puntuation: '4.5', DescripcionB: 'BUENO', like: false },
    { id: 4, productNamee: 'paracetamol 4', price: '50.00', img: 'https://m.media-amazon.com/images/I/61uutWxTEIL._AC_SX679_.jpg', puntuation: '4.5', DescripcionB: 'BUENO', like: true },
    { id: 5, productNamee: 'paracetamol 5', price: '50.00', img: 'https://m.media-amazon.com/images/I/61uutWxTEIL._AC_SX679_.jpg', puntuation: '4.5', DescripcionB: 'BUENO', like: true },
    { id: 6, productNamee: 'paracetamol 1', price: '50.00', img: 'https://m.media-amazon.com/images/I/61uutWxTEIL._AC_SX679_.jpg', puntuation: '4.5', DescripcionB: 'BUENO', like: true },
    { id: 7, productNamee: 'paracetamol 2', price: '50.00', img: 'https://m.media-amazon.com/images/I/61uutWxTEIL._AC_SX679_.jpg', puntuation: '4.5', DescripcionB: 'BUENO', like: true },
    { id: 8, productNamee: 'paracetamol 3', price: '50.00', img: 'https://m.media-amazon.com/images/I/61uutWxTEIL._AC_SX679_.jpg', puntuation: '4.5', DescripcionB: 'BUENO', like: false },
    { id: 9, productNamee: 'paracetamol 4', price: '50.00', img: 'https://m.media-amazon.com/images/I/61uutWxTEIL._AC_SX679_.jpg', puntuation: '4.5', DescripcionB: 'BUENO', like: true },
    { id: 10, productNamee: 'paracetamol 5', price: '50.00', img: 'https://m.media-amazon.com/images/I/61uutWxTEIL._AC_SX679_.jpg', puntuation: '4.5', DescripcionB: 'BUENO', like: true },
  ];


const rendererBusiness = () => {
    return listArray.map((item) =>(
        <CardCatalogue 
        ProductName = {item.productNamee}
        Price = '150'
        Img = 'https://m.media-amazon.com/images/I/61uutWxTEIL._AC_SX679_.jpg'
        punctuation = '4.0'
        DescripcionB = 'asdasdawsdfasdfasdasfasdf'
        like
        />
    ));
}





export const StoreView = () => {
    const scrollViewRef = useRef<ScrollView>(null);
    const itemRefs = useRef<(TouchableOpacity | null)[]>([]);


    const handleScrollTo = async (index: number) => {
        if (itemRefs.current[index] && scrollViewRef.current) {
            await scrollToRef(itemRefs.current[index]!)
            itemRefs.current[index]!.measure((x: number, y: number, width: number, height: number, pageX: number, pageY: number) => {
            scrollViewRef.current!.scrollTo({ y: pageY, animated: true });
            });
        }
    };

    const scrollToRef = (ref: TouchableOpacity) => {
        return new Promise((resolve) => {
            const handle = findNodeHandle(ref);
            if (handle) {
                UIManager.measure(handle, (x: number, y: number, width: number, height: number, pageX: number, pageY: number) => {
                resolve({ x, y, width, height, pageX, pageY } as LayoutRectangle);
                });
            }
        });
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
                        <TouchableOpacity style={StylesStore.buttonNavigation} onPress={() =>handleScrollTo(1)}>
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
                <View style={{justifyContent: 'center', alignItems: 'center', marginVertical: 20}}>
                    {listArray.map((item, index) => (
                        <TouchableOpacity
                            ref={(ref) => (itemRefs.current[index] = ref)}
                            key={item.id}
                        >
                            <CardCatalogue 
                                ProductName = {item.productNamee}
                                Price = '150'
                                Img = 'https://m.media-amazon.com/images/I/61uutWxTEIL._AC_SX679_.jpg'
                                punctuation = '4.0'
                                DescripcionB = 'asdasdawsdfasdfasdasfasdf'
                                like
                            />
                        </TouchableOpacity>
                    ))}
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

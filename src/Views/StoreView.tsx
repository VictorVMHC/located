import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, VirtualizedList } from 'react-native'
import { Colors, Styles } from '../Themes/Styles';
import { FontStyles } from '../Themes/Styles';
import { ImgBusiness } from '../Components/ImgBusiness';


import { default as IonIcon } from 'react-native-vector-icons/Ionicons';
import { useHeartHook } from '../Hooks/useHeartHook';
import { SwitchComponent } from '../Components/SwitchComponent';
import { QualificationChart } from '../Components/QualificationChart';
import { Circles } from '../Components/Circles';
import { FlatList } from 'react-native-gesture-handler';
import renderer from 'react-test-renderer';
import { CardCatalogue } from '../Components/CardCatalogue';
import { Item } from 'react-native-paper/lib/typescript/src/components/Drawer/Drawer';



interface Props {
    like: boolean,
}

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

    
]

const rendererBusiness = ({item} : {item : Business}) => {
    return( 
        <CardCatalogue 
        ProductName = {item.tipo}
        Price = '150'
        Img = 'https://m.media-amazon.com/images/I/61uutWxTEIL._AC_SX679_.jpg'
        punctuation = '4.0'
        DescripcionB = 'asdasdawsdfasdfas'
        like
        />
    )

}

export const StoreView = ({ like = false }: Props) => {
    const {isActive, check} = useHeartHook(like);
    const[Business, setBusiness] = useState([
        {ProductName:'Dramamine',Price:'145.80',Img:'https://www.fahorro.com/media/catalog/product/cache/3fba745dcec88e97bfe808bedc471260/7/5/7501007532363_2_1_.jpg',punctuation:'4.2',DescripcionB:'Dramamine te ayuda a prevenir y aliviar náusea, mareo y vómito asociados al movimiento.',like: false},
        {ProductName:'Dramamine',Price:'145.80',Img:'https://www.fahorro.com/media/catalog/product/cache/3fba745dcec88e97bfe808bedc471260/7/5/7501007532363_2_1_.jpg',punctuation:'4.2',DescripcionB:'Dramamine te ayuda a prevenir y aliviar náusea, mareo y vómito asociados al movimiento.',like: false},
        {ProductName:'Dramamine',Price:'145.80',Img:'https://www.fahorro.com/media/catalog/product/cache/3fba745dcec88e97bfe808bedc471260/7/5/7501007532363_2_1_.jpg',punctuation:'4.2',DescripcionB:'Dramamine te ayuda a prevenir y aliviar náusea, mareo y vómito asociados al movimiento.',like: false},
        {ProductName:'Dramamine',Price:'145.80',Img:'https://www.fahorro.com/media/catalog/product/cache/3fba745dcec88e97bfe808bedc471260/7/5/7501007532363_2_1_.jpg',punctuation:'4.2',DescripcionB:'Dramamine te ayuda a prevenir y aliviar náusea, mareo y vómito asociados al movimiento.',like: false},
        {ProductName:'Dramamine',Price:'145.80',Img:'https://www.fahorro.com/media/catalog/product/cache/3fba745dcec88e97bfe808bedc471260/7/5/7501007532363_2_1_.jpg',punctuation:'4.2',DescripcionB:'Dramamine te ayuda a prevenir y aliviar náusea, mareo y vómito asociados al movimiento.',like: false},

    ]);
    return (
    <View style={StylesStore.container}>
        <ScrollView  >
            <View style={StylesStore.containerText}>
                <View>
                <Text style={{...FontStyles.Title, fontWeight: 'bold', textAlign: 'center' }}>Farmacias Guadalajara</Text>
                </View>
            </View>
            <View style={StylesStore.containerImg}>
            <ImgBusiness 
            Width = '340'
            Heigth = '250'
            Img = 'https://www.movil.farmaciasguadalajara.com/wcsstore/FGCAS/wcs/images/content/STATIC_PAGES/about_us/conocenos1.jpg'
            /> 
            </View>
            <View style={StylesStore.containerDescription}>
                <View style={{justifyContent: 'space-between', alignItems: 'flex-end', paddingHorizontal: 35, paddingVertical: 5, flexDirection: 'row'}}>
                <QualificationChart
                scores = '4.5'
                />
                <SwitchComponent
                Value = 'true' />
                </View>
                <View style={{paddingHorizontal: 20, paddingVertical: 20}}>
                <Text style={{...FontStyles.Text, color: 'black', textAlign: 'justify'}}>
                Compañía que ofrece el servicio de venta de productos de medicina, perfumería, fotografía, hogar, alimentos, limpieza, panadería y otros.
                </Text>

                </View>
            </View>
            <View style={StylesStore.containerProducts}>
                <ScrollView horizontal>
                    <FlatList nestedScrollEnabled data={ConstBusiness} renderItem={rendererBusiness} />
                </ScrollView>                
            </View>
        </ScrollView>      
    </View>
    )
}

const StylesStore = StyleSheet.create({
    container:{
        flex:1
    },
    containerText:{
        flex: 1,
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5
    },
    heartBtn:{
        backgroundColor:Colors.gray,
        width: 35,
        height:35,
        position: 'absolute',
        borderRadius: 100, 
        elevation: 24,
    },
    containerImg:{
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    containerDescription:{
        flex: 3,
        //backgroundColor: 'green'
    },
    containerProducts:{
        flex: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },

});

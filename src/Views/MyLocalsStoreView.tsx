import React, {useRef} from 'react'
import { ScrollView, StyleSheet, Text, View, useWindowDimensions} from 'react-native'
import { CardCatalogue } from '../Components/CardCatalogue';
import { ImgBusiness } from '../Components/ImgBusiness';
import MapView from 'react-native-maps';
import { TopBar } from '../Components/TopBar';
import { IconWithText } from '../Components/IconWithText';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';

interface Props extends NativeStackScreenProps<any, any>{};



const rendererBusiness = (item: any) => {
    
    return (
        <CardCatalogue
            ProductName = {item.productNamee}
            Price = {item.price}
            Img = {item.img}
            punctuation = {item.puntuation}
            DescripcionB = {item.DescripcionB}
            like = {item.like}
        />
    );
}

export const MyLocalsStoreView = ({navigation}: Props) => {
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
                        <Text style={StylesStore.textName}>Mcdonalds</Text>
                        <Text style={{...StylesStore.textInformation}}>Product/service</Text>
                        <Text style={{...StylesStore.textInformation, color: 'green'}}>Open</Text>
                        <Text style={{...StylesStore.textInformation}}>Guadalajara(Mexico)</Text> 
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
                            text ={'AV. La Paz #1925, col. Americana, CP 44150 Guadalajara, Jalisco. Mexico'}
                        />
                        <IconWithText 
                            NameIcon ={'envelope'}
                            IconSize ={20}
                            ColorIcon={'#CD5F28'}
                            text ={'sayulitrostaquepaque2013@gmail.com'}
                        />
                        <IconWithText 
                            NameIcon ={'globe'}
                            IconSize ={20}
                            ColorIcon={'#CD5F28'}
                            text ={'Website'}
                        />
                        <IconWithText 
                            NameIcon ={'info-circle'}
                            IconSize ={20}
                            ColorIcon={'#CD5F28'}
                            text ={'promocion'}
                        />
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

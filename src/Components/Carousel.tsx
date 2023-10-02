import React, { MutableRefObject, Ref, useEffect, useRef, useState } from 'react';
import { Animated, PanResponder, StyleSheet, View, useWindowDimensions } from 'react-native';
import MapView from 'react-native-maps';
import Carousel from 'react-native-reanimated-carousel';
import { ICarouselInstance } from 'react-native-reanimated-carousel/lib/typescript/types';
import { Card } from './Card';
import { Colors } from '../Themes/Styles';
import { Local } from '../Interfaces/DbInterfaces';
import { useNavigation } from '@react-navigation/native';

interface Props {
    carouselRef: Ref<ICarouselInstance>,
    mapViewRef: MutableRefObject<MapView | undefined>,
    carouselVisible: boolean,
    setCarouselVisible: React.Dispatch<React.SetStateAction<boolean>>
    dataLocal: Local[]
}

export const CarouselComponent = ({ carouselRef, mapViewRef, carouselVisible, setCarouselVisible, dataLocal }: Props) => {

    const { width, height} = useWindowDimensions();
    const carouselHeight = height * 0.35
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const slideAnimation = useRef(new Animated.Value(0)).current;
    const navigation = useNavigation();

    const handlePanResponderMove = (_: any, gestureState: any) => {
        const { dy } = gestureState;
        if((dy > 0 || dy > carouselHeight) && carouselVisible )
        {
            slideAnimation.setValue(dy);
        }
    };

    const handlePanResponderRelease = (_: any , gestureState: any) => {
        const { dy } = gestureState;
        if ((dy > 0 && dy > carouselHeight/3) && carouselVisible ) {
            Animated.timing(slideAnimation, {
                toValue: height,
                duration: 300,
                useNativeDriver: true,
            }).start( () => setCarouselVisible(false) );
        }else{
            Animated.timing(slideAnimation, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start( );
        }
    };
    
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: handlePanResponderMove,
        onPanResponderRelease: handlePanResponderRelease,
    });

    useEffect(() => {        
        if (carouselVisible) {           
            Animated.timing(slideAnimation, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }).start();
        }else{
            Animated.timing(slideAnimation, {
                toValue: height,
                duration: 0,
                useNativeDriver: true,
            }).start();
        }
    }, [carouselVisible]);

    const slideInStyles = {
        transform: [
            {
                translateY: slideAnimation
            },
        ],
    };

    useEffect(() => {
        const selectedLocal = dataLocal[currentSlideIndex];
        if (selectedLocal) {
            const {location} = selectedLocal;
            mapViewRef.current?.animateCamera({
                zoom: 15,
                center: {
                    latitude: location.latitude - 0.0005,
                    longitude: location.longitude
                }
            });
        }
        }, [currentSlideIndex]);
        
    return (
        <>
            <Animated.View style={{...styles.carouselContainer, width, height: carouselHeight, ...slideInStyles }} {...panResponder.panHandlers}>
                <View style={{marginTop: 5, backgroundColor: Colors.grayOpacity, position: 'absolute', height: 7, width: width/2, alignSelf: 'center', borderRadius: 15 }}>
                </View>
                <Carousel
                    ref={carouselRef}
                    loop
                    width={width}
                    height={carouselHeight}
                    data={dataLocal}
                    mode='parallax'
                    scrollAnimationDuration={1000}
                    onSnapToItem={(index) => setCurrentSlideIndex(index)}
                    renderItem={({ item }) => (
                        <View style={{marginTop: -15}}>
                            <Card 
                            like={false} 
                            newLocal={item} 
                            cardHeight={-30} 
                            routeToStore={()=>{}} 
                            navigation={navigation}
                            id={item._id}/>
                        </View>
                    )}
                />
            </Animated.View>  
        </>
    )
}

const styles = StyleSheet.create({
    carouselContainer:{
        position: "absolute", 
        bottom:0, 
        backgroundColor: "transparent" 
    }
});
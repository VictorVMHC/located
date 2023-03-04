import React from 'react'
import { View, ImageBackground, useWindowDimensions, Text, ScrollView, TouchableOpacity  } from 'react-native';
import { Styles } from '../Themes/Styles';



export const Card = () => {
    const { width, height} = useWindowDimensions();
    return (

    <View style={{marginVertical: 10, padding: 10}}>
        <TouchableOpacity style={{width: width - (width/15), height: height - (height/1.8) , alignSelf: 'center', margin:10 }}
        onPress={() => console.log('tochable card')}
        >
            <View style={{flex:4}}>                
                <ImageBackground source={{uri:"https://i.blogs.es/87930e/comidas-ricas/840_560.jpg"}} style={{width:'100%',  height:'100%', flex: 1,}} resizeMode='cover' borderTopRightRadius={20} borderTopLeftRadius={20}>
                    <View style={{flexDirection: 'row',position: 'absolute', backgroundColor: 'white', borderRadius: 20, width: 90, height:25, left: 10, top:15, alignItems: 'center', justifyContent: 'center'}}>
                        <Text>4.5</Text>
                        <Text> * </Text>
                        <Text>(999+)</Text>
                    </View>
                    <TouchableOpacity style={{
                            backgroundColor: 'red', 
                            width: 40, 
                            height: 40, 
                            borderRadius: 100, 
                            alignSelf: 'flex-end',
                            top: 10,
                            right: 10,
                            }}
                            onPress={() => console.log('tochable heart')}
                        >
                    </TouchableOpacity>
                </ImageBackground>        
            </View>
            <View style={{flex:6,backgroundColor: 'white', flexWrap: 'wrap', borderBottomLeftRadius: 20,borderBottomRightRadius: 20}}>
                <View style={{margin: 10, flex: 4}}>
                    <View style={{flexDirection: 'row', marginHorizontal: 5}}>
                        <Text style={{flexDirection: 'row', marginHorizontal: 5}}>Taco House</Text>
                        <View style={{width: 20, height:20, backgroundColor: 'green', borderRadius: 10}}></View>
                    </View>
                    <View style={{flexDirection: 'row', margin: 2}}>
                        <View style={{marginHorizontal: 2, width: 20, height:20, backgroundColor: 'green', borderRadius: 10}}></View>
                        <Text style={{ marginHorizontal: 2, width: '100%', height: 20}}>Río reforma #1720</Text>
                    </View>
                    <View style={{flexDirection: 'row', margin: 2}}>
                        <View style={{marginHorizontal: 2, width: 20, height:20, backgroundColor: 'green', borderRadius: 10}}></View>
                        <Text style={{marginHorizontal: 2, width: '100%', height: 20}}>Lunes-jueves: 11:00-15:00  viernes5:00  viernes5:00  viernes-domingo: 11 </Text>
                    </View>
                </View>
                <View style={{ flex: 2, flexDirection: 'row', paddingHorizontal: 10, justifyContent:'flex-start'}}>
                    <View  style={{ backgroundColor: '#F6F6F6', borderRadius: 5, paddingHorizontal: 10, paddingVertical: 5, marginHorizontal: 5}} >
                        <Text>Mexicana</Text>
                    </View>
                    <View style={{ backgroundColor: '#F6F6F6', borderRadius: 5, paddingHorizontal: 10, paddingVertical: 5, marginHorizontal: 5}} >
                        <Text>Fonda</Text>
                    </View>
                    <View style={{ backgroundColor: '#F6F6F6', borderRadius: 5, paddingHorizontal: 10, paddingVertical: 5, marginHorizontal: 5}} >
                        <Text>Antojito</Text>
                    </View>
                </View> 
                <View style={{flex: 4, marginHorizontal: 10}}>
                    <View><Text>Description</Text></View>
                    <View></View>
                </View> 
            </View> 
        </TouchableOpacity>
    </View>
  )
}

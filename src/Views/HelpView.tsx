import React, {useState, useEffect} from 'react'
import { Text, View, Image, TouchableOpacity, StyleSheet, LayoutAnimation} from 'react-native'
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';

export const HelpView = () => {
    const {t} = useTranslation();
    const [isOpen, setisOpen] = useState(false);

    const check = (value:Boolean )  =>{
        if(isOpen)
        {
        setisOpen(true)
        }
        else
        {
        setisOpen(false)
        }
    }


    return (
        <SafeAreaView style={StylesFAQ.container}>
            <ScrollView>
                    <View>
                    <Image source={require('../Assets/Images/helpImage.png')} style={{width: 200, height: 190, borderRadius: 5, left:'21%'}} />
                    </View>
                    <View>
                        <Text style={StylesFAQ.titleText}>Preguntas Frecuntes</Text>
                    </View>
                    <TouchableOpacity onPress={() => setisOpen(!isOpen)}>
                    <Text style={StylesFAQ.titleQuestion}>¿POR QUÉ NO PUEDO ACCEDER A TODAS LAS FUNCIONES DE LA APP?  +</Text>
                        <Text style={StylesFAQ.answer}>
                        {isOpen
                            ?'Si no puedes ingresar a todas las funciones de la app necesitas estar registrado o haber iniciado sesion':''  
                        }
                        </Text>
                    </TouchableOpacity>
                    <View style={StylesFAQ.separate}></View>
                    <TouchableOpacity onPress={()=>setisOpen(!isOpen)}>
                    <Text style={StylesFAQ.titleQuestion}>¿POR QUÉ NO PUEDO ACCEDER A TODAS LAS FUNCIONES DE LA APP?  +</Text>
                        <Text style={StylesFAQ.answer}>
                        {isOpen
                            ?'Si no puedes ingresar a todas las funciones de la app necesitas estar registrado o haber iniciado sesion':''  
                        }
                        </Text>
                        <View style={StylesFAQ.separate}></View>
                    </TouchableOpacity>
                    <View style={StylesFAQ.separate}></View>
                    <TouchableOpacity onPress={()=>setisOpen(!isOpen)}>
                    <Text style={StylesFAQ.titleQuestion}>¿POR QUÉ NO PUEDO ACCEDER A TODAS LAS FUNCIONES DE LA APP?  +</Text>
                        <Text style={StylesFAQ.answer}>
                        {isOpen
                            ?'Si no puedes ingresar a todas las funciones de la app necesitas estar registrado o haber iniciado sesion':''  
                        }
                        </Text>
                        <View style={StylesFAQ.separate}></View>
                    </TouchableOpacity>
                    <View style={StylesFAQ.separate}></View>
                    <TouchableOpacity onPress={()=>setisOpen(!isOpen)}>
                    <Text style={StylesFAQ.titleQuestion}>¿POR QUÉ NO PUEDO ACCEDER A TODAS LAS FUNCIONES DE LA APP?  +</Text>
                        <Text style={StylesFAQ.answer}>
                        {isOpen
                            ?'Si no puedes ingresar a todas las funciones de la app necesitas estar registrado o haber iniciado sesion':''  
                        }
                        </Text>
                        <View style={StylesFAQ.separate}></View>
                    </TouchableOpacity>
                    <View style={StylesFAQ.separate}></View>
                    <TouchableOpacity onPress={()=>setisOpen(!isOpen)}>
                    <Text style={StylesFAQ.titleQuestion}>¿POR QUÉ NO PUEDO ACCEDER A TODAS LAS FUNCIONES DE LA APP?  +</Text>
                        <Text style={StylesFAQ.answer}>
                        {isOpen
                            ?'Si no puedes ingresar a todas las funciones de la app necesitas estar registrado o haber iniciado sesion':''  
                        }
                        </Text>
                        <View style={StylesFAQ.separate}></View>
                    </TouchableOpacity>
        </ScrollView>
        </SafeAreaView>
    )
}

const StylesFAQ = StyleSheet.create({
    container:{
        flex:2,
        alignItems:'center',
        padding:10,
    },
    titleText:{
        fontSize:30,
        fontWeight:'bold',
        padding:10,
        marginVertical:10,
        top:-10,
    },
    titleQuestion:{
        fontSize:14,
        fontWeight:'bold',
        color:'black',
        width:320,
    },
    answer:{
        fontSize:22,
        fontFamily:'Outfit.Light',
        textAlign:'left',
        width:320,
    },
    separate:{
        backgroundColor:'rgba(255,198,0,0.4)',
        height:3,
        width:"98%",
    }
})
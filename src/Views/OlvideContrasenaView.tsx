import React, {  useState } from 'react'
import { View, Image, StyleSheet, Text, TextInput, TouchableOpacity} from 'react-native';
import { Circles } from '../Components/Circles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontStyles, Styles } from '../Themes/Styles'


export const OlvideContrasenaView = () => {

        const[datos, setDatos] = useState({
            correo:'',
        })
        
   
  return (
    <SafeAreaView style={Styles.container}>
        <Circles
        position='top'
        quantity={2}
        />
         <View style={Styles.headerView}>
            <Text style={Styles.textStyle}>Contraseña</Text>
        </View>
            <Image
                 style={{...Styles.imageStyle, left: -100, top: 10}}
                source={require('../Assets/Images/logo_located.png')}
            />
                <View style={Styles.bodyView}>
                    <Text style={Stylesingletext.onlytext}>Olvide mi contraseña</Text>
                    <TextInput style={Styles.input}
                        placeholder='Ingresa tu correo electronico'   
                    />
                <TouchableOpacity style={Styles.boton}>
                        <Text style={Styles.txtbtn}>Recuperar</Text>
                    </TouchableOpacity>
                </View>
    </SafeAreaView>
    
  )
}

const Stylesingletext = StyleSheet.create({
    onlytext:{
        ...Styles.textos,
        width: 300,
    }
});
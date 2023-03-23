import React, {  useState } from 'react'
import { View, Image, StyleSheet, Text, TextInput, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Circles } from '../Components/Circles';
import { FontStyles, Styles } from '../Themes/Styles'

export const CreateAccountEmailView = () => {

    const [Nombre,setNombre] = useState() /* codigo de prueba para ingresar y obtener datos */
    const [Email,setEmail] = useState()
    const [Tel,setTel] = useState()
    const [Edad,setEdad] = useState()
    return (
        <SafeAreaView style={Styles.container}>
            <Circles
            position='top'
            quantity={2}
            />
            <View style={Styles.headerView}>
                <Text style={Styles.textStyle}>Crear Cuenta</Text>
            </View>
                <Image
                    style={{...Styles.imageStyle, left: -100, top: 10}}
                    source={require('../Assets/Images/logo_located.png')}
                />
                <View style={Styles.bodyView}>
                        <Text style={Stylesingletext.onlytext}>Ingrese datos personales</Text>
                        <TextInput style={Styles.input}
                            placeholder='Nombre'   
                        />
                        <TextInput style={Styles.input}
                            placeholder='Correo Electronico'
                            keyboardType='email-address'   
                        />
                        <TextInput style={Styles.input}
                            placeholder='Telefono'
                            keyboardType="phone-pad"   
                        />
                        <TextInput style={Styles.input}
                            placeholder='Edad'
                            keyboardType='number-pad'
                        />
                <TouchableOpacity style={Styles.boton}>
                    <Text style={Styles.txtbtn}>Registrarse</Text>
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

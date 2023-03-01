import React, {  useState } from 'react'
import { View, Image, StyleSheet, Text, TextInput, TouchableHighlight} from 'react-native';


export const CreateAccountEmail = () => {

       const [Nombre,setNombre] = useState() /* codigo de prueba para ingresar y obtener datos */
       const [Email,setEmail] = useState()
       const [Tel,setTel] = useState()
       const [Edad,setEdad] = useState()
   
  return (
    <View style={styles.container}>
        <View style={styles.colummView}>
            <Text style={styles.textStyle}>Crear Cuenta</Text>
                <View>
                    <Image
                    style={styles.imageStyle}
                    source={require('../Assets/Images/logo_located.png')}
                    />
                </View>
                    <Text style={styles.textos}>Ingrese datos personales</Text>
                      <TextInput style={styles.input}
                        placeholder='Nombre'   
                       />
                       <TextInput style={styles.input}
                        placeholder='Correo Electronico'
                        keyboardType='email-address'   
                       />
                       <TextInput style={styles.input}
                        placeholder='Telefono'
                        keyboardType="phone-pad"   
                       />
                       <TextInput style={styles.input}
                        placeholder='Edad'
                        keyboardType='number-pad'
                       />
            <TouchableHighlight style={styles.boton}>
                <Text style={styles.txtbtn}>Registrarse</Text>
            </TouchableHighlight>
        </View>
        <View style={styles.ellipse3} ></View>
        <View style={styles.ellipse4} ></View>
    </View>
    
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    colummView:{
        flex:1,
        alignItems: 'center',
        justifyContent:'center',
    },
    textStyle:{
        fontSize: 30,
        letterSpacing:0,
        fontFamily: 'ExtraBold',
        top: -40,
        left: -115,
        color:'black',
        textShadowColor: 'black',
        textShadowRadius: 1,
        textShadowOffset:{
            width: 1,
            height: 1,
        }
    },
    textos:{
    fontSize:20,
    fontFamily:'bold',
    color:'black',
    top: -60,
    left:-66,
    },
    ellipse3: {
        width: 500,
        height: 500,
        backgroundColor: 'rgba(255, 198, 0, .20)',
        position: 'absolute',
        borderRadius: 250,
        alignSelf: 'stretch',
        left: -100,
        top: -350,
    },
    ellipse4: {
        width: 350,
        height: 350,
        backgroundColor: 'rgba(255, 198, 0, .20)',
        position: 'absolute',
        borderRadius: 175,
        alignSelf: 'stretch',
        right: -120,
        top: -250,
    },
    imageStyle:{
        height: 260,
        width: 190,
        resizeMode: 'contain',
        top: -10,
    },
    input:{
        height: 40,
        width: 355,
        borderColor: '#ccc',
        borderRadius: 6,
        borderWidth: 2,
        margin: 4,
        textAlign:'left',
        top: -60,
       
    },
    boton:{
        backgroundColor:'orange',
        height:40,
        paddingLeft: 125,
        paddingRight: 125,
        borderRadius: 6,
        top:-25,
        
    },
    txtbtn:{
        fontSize: 20,
        letterSpacing:0,
        fontFamily: 'ExtraBold',
        top: 7,
        left: 10,
        color:'black',
        textShadowColor: 'black',
        textShadowRadius: 1,
        textShadowOffset:{
            width: 1,
            height: 1,},        
    }
})
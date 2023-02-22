import React, {  useState } from 'react'
import { View, Image, StyleSheet, Text, TextInput, TouchableHighlight} from 'react-native';


export const OlvideContrasena = () => {

        const[datos, setDatos] = useState({
            correo:'',
        })
        
   
  return (
    <View style={styles.container}>
        <View style={styles.colummView}>
            <Text style={styles.textStyle}>Contraseña</Text>
                <View>
                    <Image
                    style={styles.imageStyle}
                    source={require('../Assets/Images/located.png')}
                    />
                </View>
                    <Text style={styles.textos}>Olvide mi contraseña</Text>
                      <TextInput style={styles.input}
                        placeholder='Ingresa tu correo electronico'   
                       />
            <TouchableHighlight style={styles.boton}>
                <Text style={styles.txtbtn}>Recuperar</Text>
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
        top: -115,
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
    top: -150,
    left:-80,
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
        top: -100,
    },
    input:{
        height: 40,
        borderColor: '#ccc',
        borderRadius: 6,
        borderWidth: 2,
        paddingRight: 157,
        textAlign:'left',
        top: -140,
       
    },
    boton:{
        backgroundColor:'orange',
        height:40,
        paddingLeft: 127,
        paddingRight: 127,
        borderRadius: 6,
        top:-130,
        
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

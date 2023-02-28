import React, {  useState } from 'react'
import { View, Image, StyleSheet, Text, TextInput, TouchableHighlight} from 'react-native';
import { Circles } from '../Components/Circles';


export const OlvideContrasenaView = () => {

        const[datos, setDatos] = useState({
            correo:'',
        })
        
   
  return (
    <View style={{flex: 1}}>
        <View style={styles.colummView}>
            <Text style={styles.textStyle}>Contraseña</Text>
            <View>
                <Image
                    style={styles.imageStyle}
                    source={require('../Assets/Images/logo_located.png')}
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
        <Circles
        position='top'
        quantity={2}
        />
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
        paddingHorizontal: 5,
       
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

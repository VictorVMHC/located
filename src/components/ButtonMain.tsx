import React from 'react'
import { Text, TouchableNativeFeedback, View, StyleSheet, Image, BackHandler, TouchableOpacity } from 'react-native';



export const ButtonMain = () => {
  return (
    <View style={ styles.contenedorprincipal }>
       
            <TouchableOpacity  onPress={()=> console.log('click') } style={[
            styles.contenedorBotonExp,styles.ButtonBt
        ]}>
                 <Image style={styles.imgwalking} source={require('../Assets/Images/walking.png')}/>
                  <Text style={styles.textoExp}>Explorar</Text>

            </TouchableOpacity>

             <TouchableOpacity  onPress={()=> console.log('click') } style={[styles.contenedorBotonExp,
            styles.ButtonBd,styles.ButtonBd
        ]}>
                  <Text style={styles.textoExp}>Iniciar Sesion</Text>
            </TouchableOpacity>
    </View>


    

    
  

  )
}

const styles = StyleSheet.create({
    contenedorprincipal:{
        position: 'absolute',
        top: '52%',
        width: '100%',
        height: '30%',
        justifyContent: 'space-around',
        paddingTop:5
    },
    contenedorBotonExp:{
        flexDirection: 'row',
        width: '92%',
        height: '28%',
        left: '5.5%',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        
        
    },
    ButtonTop:{
        flex:1,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ButtonBt:{
        backgroundColor: 'rgba(255, 198, 0, .50)',
    },
    imgwalking:{
        width:55,
        height: '100%',
        resizeMode: 'center',
        position: 'absolute',
        left: '8%'

    },
    textoExp:{
      fontSize: 45,
      color: 'black'
    },
    ButtonBd:{
        borderColor:  'rgba(255, 198, 0, 1)',
        borderWidth: 3,
        backgroundColor: 'rgba(255, 255, 255, 0.6)'
    },
})

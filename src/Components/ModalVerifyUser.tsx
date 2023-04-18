import { View, Image, StyleSheet, Text, TextInput, TouchableOpacity,Modal} from 'react-native';
import { useTranslation } from 'react-i18next';
import { black } from 'react-native-paper/lib/typescript/src/styles/themes/v2/colors';
import { FontStyles, Styles } from '../Themes/Styles'

interface Props{
    visible:Boolean,
    onPress?:() =>void,
    onDismiss?:() =>void,
    onShow?:() =>void,
}


export const ModalVerifyUser = ({onDismiss=()=>null, onShow=()=>null, visible=true}) => {
    const {t,i18n} = useTranslation();
    return (
    <Modal 
        animationType='slide'
        onDismiss={onDismiss}
        onShow={onShow}
        transparent={true}
        visible={visible}
    >
        <View style={StylesModal.contenedor}>
            <View style={StylesModal.subcontenedor}>
            <Text style={StylesModal.textos}>!Codigo de verificación enviado!</Text>
        <Text style={StylesModal.textos}>Revisa tu correo</Text>
        </View>
        <Text style={StylesModal.textos}>Ingresar Codigo</Text> 
        <View style={StylesModal.row}>
        <TextInput style={StylesModal.intext}
        placeholder="__"
        keyboardType="phone-pad"   
        />
        <TextInput style={StylesModal.intext}
        placeholder="__"
        keyboardType="phone-pad"   
        />
        <TextInput style={StylesModal.intext}
        placeholder="__"
        keyboardType="phone-pad"   
        />
        <TextInput style={StylesModal.intext}
        placeholder="__"
        keyboardType="phone-pad"   
        />
        <TextInput style={StylesModal.intext}
        placeholder="__"
        keyboardType="phone-pad"   
        />
        <TextInput style={StylesModal.intext}
        placeholder="__"
        keyboardType="phone-pad"   
        />
        </View>
        <TouchableOpacity style={StylesModal.boton}
        onPress={()=>{visible=false}}
        >
        <Text style={Styles.txtbtn}>Verificar</Text> 
        </TouchableOpacity>
        </View>
    </Modal>
    )
}

const StylesModal= StyleSheet.create({
    contenedor:{
        width: 350,
        height: 250,
        top: 390,
        left: 30,
        backgroundColor: 'rgba(255,255,255,0.9)',
        borderRadius:10,
        borderColor: 'black',
        borderWidth: 2,
        padding: 20,
        
    },
    subcontenedor:{
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
    },
    row:{
        flexDirection:'row',
        flexWrap:'wrap',
        top: 30,
    },
    intext:{
        left: 10,
        height: 40,
        width: 50,
        color:'blue',
        
    },
    textos:{
        color:'blue',
        fontSize:18,
        fontFamily:'bold',
    },
    boton:{
        ...Styles.boton,
        top:40,
    }
});

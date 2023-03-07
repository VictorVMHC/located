import { StyleSheet } from "react-native";

export const Colors = {
    orange: '#CD5F28',
    blue: "#2F76BC",
    black: "#0F0F0E",
    Yellow: '#FFC600',
    YellowOpacity: 'rgba(255,198,0,0.4)',
    white: '#FFFFFF'
};

export const FontStyles = {
    Title: { fontFamily: 'Outfit.SemiBold', fontSize: 30, },
    SubTitles: { fontFamily: 'Outfit.Regular', fontSize: 20 },
    Links: { fontFamily: 'Outfit-ExtraLight', fontSize: 20, color: Colors.blue },
    Information: { fontFamily: 'Outfit-SemiBold', fontSize: 16, color: '#4E7098' },
    Text: { fontFamily: 'Outfit.Light', fontSize: 20 },
    Alerts: {fontFamily: 'Outfit.SemiBold', fontSize: 20 }
};

export const Styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    colummView:{
        flex: 1,
        alignItems: 'center',
        justifyContent:'center',
        alignSelf: 'center',
    },
    headerView:{
        flex: 2,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    bodyView:{
        flex: 8,
        alignItems: 'center',
        justifyContent:'center',
    },
    textStyle:{
        letterSpacing:0,
        ...FontStyles.Title,
        color: Colors.black,
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
    },
    imageStyle:{
        height:70,
        resizeMode: 'contain',
    },
    input:{
        height: 40,
        width: 300,
        backgroundColor: 'white',
        borderColor: '#ccc',
        borderRadius: 6,
        borderWidth: 2,
        textAlign: 'left',
        marginVertical: 5,
    },
    boton:{
        backgroundColor:'#FFC600',
        height:40,
        borderRadius: 6,  
        width: 300,
        marginVertical: 5,
    },
    txtbtn:{
        
        textAlign: 'center',
        letterSpacing:0,
        ...FontStyles.SubTitles,
        top: 7,
        color:'black',
        textShadowColor: 'black',
        textShadowRadius: 1,
        textShadowOffset:{
            width: 1,
            height: 1,
        },        
    }
})

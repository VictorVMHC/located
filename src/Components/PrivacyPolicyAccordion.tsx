import React, { useState } from 'react'
import { LayoutAnimation, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Colors } from '../Themes/Styles';

interface Props {
    title: string,
    info: string,
}
interface DataProps {
    text: string,
    text2: string,
    text3: string,
}

export const PPAccordion = ({title, info,}:Props) => {
    const [expanded, setExpanded] = useState(false);

    const toggle = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(!expanded );
    }

    return (
        <View style={StylesPP.container}>
            <TouchableOpacity style={StylesPP.separate} onPress={toggle}>
                <Text style={StylesPP.title}>{title}</Text>
                <Icon name={ expanded ? 'chevron-up' : 'chevron-down' } size={20} color={Colors.black}/>
            </TouchableOpacity>
            {expanded ?
                <Text style={StylesPP.info} adjustsFontSizeToFit >{info}</Text> : <Text></Text>
            }
        </View>
    )
}

export const PPText = ({text, text2, text3}:DataProps) => {

    return (
        <View style={StylesPP.containerText}>
                <Text style={StylesPP.text}>{text}</Text>
                <Text style={StylesPP.text}>{text2}</Text>
                <Text style={StylesPP.text}>{text3}</Text>
        </View>
    )
}

const StylesPP = StyleSheet.create({
    container:{
        flex: 1,
        borderBottomColor: Colors.YellowOpacity,
        borderBottomWidth: 2,
        marginHorizontal: 10,
    },
    title:{
        fontWeight:'bold',
        color:'#6D6A6A',
        
    },
    info:{
        fontFamily:'Outfit.Light',
        textAlign:'left',
        color: 'black',
    },
    separate: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between', 
        alignItems: 'center',
    },
    containerText:{
        flex: 1,
        marginHorizontal: 20,
    },
    text:{
        paddingVertical:5,
        fontSize:16,
        color:'black',
        fontFamily:'Outfit.Regular',
        fontWeight:'bold',
        textAlign:'left',
    }
})
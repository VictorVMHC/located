import React, { useState } from 'react'
import { LayoutAnimation, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Colors } from '../Themes/Styles';

interface Props {
    title: string,
    info: string,
}
interface Prop {
    title2: string,
    info2: string,
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
                <Text style={StylesPP.titleQuestion}>{title}</Text>
                <Icon name={ expanded ? 'chevron-up' : 'chevron-down' } size={20} color={Colors.black}/>
            </TouchableOpacity>
            {expanded ?
                <Text style={StylesPP.answer} adjustsFontSizeToFit >{info}</Text> : <Text></Text>
            }
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
    titleQuestion:{
        fontWeight:'bold',
        color:'#6D6A6A',
        
    },
    answer:{
        fontFamily:'Outfit.Light',
        textAlign:'left',
        color: 'black',
    },
    separate: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between', 
        alignItems: 'center',
    }
})
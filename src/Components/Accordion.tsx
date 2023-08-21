import React, { useState } from 'react'
import { LayoutAnimation, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Colors } from '../Themes/Styles';

interface Props {
    question: string,
    answer: string,
}

export const Accordion = ({question, answer,}:Props) => {
    const [expanded, setExpanded] = useState(false);

    const toggle = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(!expanded );
    }

    return (
        <View style={StylesFAQ.container}>
            <TouchableOpacity style={StylesFAQ.separate} onPress={toggle}>
                <Text style={StylesFAQ.titleQuestion}>{question}</Text>
                <Icon name={ expanded ? 'chevron-up' : 'chevron-down' } size={20} color={Colors.black}/>
            </TouchableOpacity>
            {expanded ?
                <Text style={StylesFAQ.answer} adjustsFontSizeToFit >{answer}</Text> : <Text></Text>
            }
        </View>
    )
}

const StylesFAQ = StyleSheet.create({
    container:{
        flex: 1,
        borderBottomColor: Colors.YellowOpacity,
        borderBottomWidth: 3,
        marginHorizontal: 10
    },
    titleQuestion:{
        fontWeight:'bold',
        color:'black',
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

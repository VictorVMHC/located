import React from 'react';
import { StyleSheet } from 'react-native';
import { List, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props{
    title: string,
    iconName: string,
    iconColor: string,
    items: Item[],
}
interface Item{
    title:string,
    action: () => void
}
export const CollapsibleButon = ({title, iconName, iconColor, items= []}:Props) => {
    const theme = useTheme();
    theme.colors.background = "transparent"
    return (
        <List.Accordion
            title={title}
            left={ () => <Icon size={30} name={iconName} color={iconColor}/>}
            style={styles.botoncontainer}
            titleStyle={styles.text}
        >
            {
                items.map((element, index) => <List.Item key={index} title={element.title} onPress={element.action} titleStyle={styles.text}/>)
            }
        </List.Accordion>
)
}

const styles= StyleSheet.create({
    botoncontainer:{
        alignItems:'center',
    },
    text:{
        fontSize:18,
        marginStart: 0,
        fontWeight:'bold',
        color: 'white',
        alignItems: 'center',
        top: -2,
        left: 3
    },
    Iconflecha:{

    }
});
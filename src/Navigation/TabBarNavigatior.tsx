import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useTheme } from 'react-native-paper';
import { Colors } from '../Themes/Styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { PopularView } from '../Views/popularView';
import { CloseToMeView } from '../Views/CloseToMeView';
import { MapsView } from '../Views/MapsView';
import { MyLocalsView } from '../Views/MyLocalsView';
import { ForYouView } from '../Views/ForYouView';



const Tab = createMaterialBottomTabNavigator();

export const TabBarNavigator = () => {
    const theme = useTheme();
    theme.colors.secondaryContainer = "transperent"
    return (
        <Tab.Navigator
            initialRouteName="MapsView"
            shifting= {true}
            sceneAnimationType='shifting'
            sceneAnimationEnabled= {true}
            activeColor={ Colors.orange }
            barStyle={{
                backgroundColor: Colors.black
            }}
            screenOptions= { ({ route }) => ({
                tabBarIcon({focused, color}) {
                    let iconName: string = '';
                    switch(route.name){
                        case 'PopularView' :
                            iconName = 'star';
                            //iconName : 'fire';
                        break;
                        case 'CloseToMeView' :
                            iconName = 'location-arrow'
                        break;
                        case 'MapsView' :
                            iconName = 'map-marked-alt'
                        break;
                        case 'MyLocalsView' :
                            iconName= 'store-alt'
                        break;
                        case 'ForYouView' :
                            iconName = 'hand-holding-heart'
                        break;
                    }
                    return <Icon name={iconName} size={focused ? 25 : 20} color={color}  light={focused} />
                },
            })}
        >
            <Tab.Screen name="PopularView" component={ PopularView } options={{ tabBarLabel: 'Populares' }} />
            <Tab.Screen name="CloseToMeView" component={ CloseToMeView } options={{ tabBarLabel: 'Cerca de mi' }} />
            <Tab.Screen name="MapsView" component={ MapsView } options={{ tabBarLabel: 'Mapas' }} />
            <Tab.Screen name="MyLocalsView" component={ MyLocalsView } options={{ tabBarLabel: 'Mis locales' }} />
            <Tab.Screen name="ForYouView" component={ ForYouView } options={{ tabBarLabel: 'Para ti' }} />
        </Tab.Navigator>
    );
}
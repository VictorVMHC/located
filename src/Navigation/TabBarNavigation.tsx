import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useTheme } from 'react-native-paper';
import { Colors } from '../Themes/Styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { PopularView } from '../Views/popularView';
import { CloseToMeView } from '../Views/CloseToMeView';
import { MapsView } from '../Views/MapsView';
import { MyLocalsView } from '../Views/MyLocalsView';
import { ForYouView } from '../Views/ForYouView';
import { useTranslation } from 'react-i18next';
import { StoreView } from '../Views/StoreView';




const Tab = createMaterialBottomTabNavigator();

export const TabBarNavigation = () => {
    const theme = useTheme();
    const { t } = useTranslation();
    theme.colors.secondaryContainer = "transparent"
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
            <Tab.Screen name="PopularView" component={ PopularView } options={{ tabBarLabel: t('PopularTabBar').toString() }} />
            <Tab.Screen name="CloseToMeView" component={ CloseToMeView } options={{ tabBarLabel: t('NearByTabBar').toString() }} />
            <Tab.Screen name="MapsView" component={ MapsView } options={{ tabBarLabel: t('MapsTabBar').toString() }} />
            <Tab.Screen name="MyLocalsView" component={ MyLocalsView } options={{ tabBarLabel: t('MyLocalsTabBar').toString() }} />
            <Tab.Screen name="ForYouView" component={ ForYouView } options={{ tabBarLabel: t('ForYouTabBar').toString() }} />
        </Tab.Navigator>
    );
}
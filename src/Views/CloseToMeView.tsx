import { Slider } from '@miblanchard/react-native-slider';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useEffect, useState, useContext } from 'react';
import { LoadingView } from './LoadingView';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/FontAwesome5';
import { FoodView } from './FoodView';
import { OthersCategoriesView } from './OthersCategoriesView';
import { PharmacyView } from './PharmacyView';
import { LocationPermissionView } from './LocationPermissionsView';
import { PermissionsContext } from '../Context/PermissionsContext';
import { CloseToMeMainView } from './CloseToMeMainView';


const Tab = createMaterialTopTabNavigator();

export const CloseToMeView = () =>{
const {width, height} = useWindowDimensions();
const [value, setValue] = useState(0.1);
const { t } = useTranslation();
const { permissions } = useContext( PermissionsContext );

if ( permissions.locationStatus === 'unavailable' ) {
    return <LoadingView />
}

return (
    <>
    {
        ( permissions.locationStatus === 'granted' )
            ?   <CloseToMeMainView/>
            :   <LocationPermissionView/>
    }
    </>
);
}


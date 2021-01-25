import React from 'react'

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import PantallaHome from './PantallaHome'
import Perfil from './Perfil'

const Tab = createMaterialBottomTabNavigator();

export default function TabNavigation(props) {

  return (
    <Tab.Navigator initialRouteName="Inicio"
    activeColor="#ffffff"
    inactiveColor="#e3e3e3" 
    barStyle={{ backgroundColor: '#4a4a4a' }}>
      <Tab.Screen name="Inicio" initialParams={{datosApp: props.route.params.datosApp}} component={PantallaHome} options={{tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="emoticon-excited-outline" color={color} size={25} />
          )}} />
      <Tab.Screen name="Perfil" initialParams={{datosApp: props.route.params.datosApp}} component={Perfil} options={{tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-circle" color={color} size={25} />
          )}} />
    </Tab.Navigator>
  );
}

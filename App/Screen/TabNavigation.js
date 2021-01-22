import React from 'react'

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import PantallaPrincipal from './PantallaPrincipal'
import PantallaHome from './PantallaHome'
import Perfil from './Perfil'

const Tab = createMaterialBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator initialRouteName="Inicio"
    activeColor="#ffffff"
    inactiveColor="#e3e3e3" 
    barStyle={{ backgroundColor: '#4a4a4a' }}>
      <Tab.Screen name="Inicio" component={PantallaHome} options={{tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="emoticon-excited-outline" color={color} size={25} />
          )}} />
      <Tab.Screen name="Perfil" component={Perfil} options={{tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-circle" color={color} size={25} />
          )}} />
    </Tab.Navigator>
  );
}

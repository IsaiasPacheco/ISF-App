import React from 'react'
import { NavigationContainer  } from '@react-navigation/native'
import { createStackNavigator  } from '@react-navigation/stack'

import PantallaInicio from '@screen/PantallaInicio'
import PantallaPrincipal from '@screen/PantallaPrincipal'
import TabNavigation from '@screen/TabNavigation'
import MiniJuego_Lectura from '@screen/MiniJuego_Lectura'
import Perfil from '@screen/Perfil'
import Registro from '@screen/Registro'

export default function AppNavigation(props){
    const Stack = createStackNavigator();

    return(
        <NavigationContainer>
            <Stack.Navigator 
            screenOptions={{headerTitleAlign: 'center', headerLeft: null}}
            >
                <Stack.Screen name="PantallaInicio" component={PantallaInicio} options={{header: () => null}}/>
                <Stack.Screen name="PantallaPrincipal" initialParams={ {datosApp: props.datosApp} } component={TabNavigation} options={{ title: 'IncreMENTAL',  }}/>
                <Stack.Screen name="Prueba" component={PantallaPrincipal} />
                <Stack.Screen name="Minijuego" component={MiniJuego_Lectura} options={{ headerShown: false }}/>
                <Stack.Screen name="Perfil" component={Perfil} options={{ headerShown: false }}/>
                <Stack.Screen name="Registro" component={Registro} options={{ headerShown: true }}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

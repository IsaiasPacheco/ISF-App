import React from 'react'
import { NavigationContainer  } from '@react-navigation/native'
import { createStackNavigator  } from '@react-navigation/stack'

import PantallaInicio from '@screen/PantallaInicio'
import PantallaPrincipal from '@screen/PantallaPrincipal'
import TabNavigation from '@screen/TabNavigation'
import MiniJuego_Lectura from '@screen/MiniJuego_Lectura'

export default function AppNavigation(){
    const Stack = createStackNavigator();

    return(
        <NavigationContainer>
            <Stack.Navigator 
            screenOptions={{headerTitleAlign: 'center', headerLeft: null}}
            >
                <Stack.Screen name="PantallaInicio" component={PantallaInicio} options={{header: () => null}}/>
                <Stack.Screen name="PantallaPrincipal" component={TabNavigation} options={{ title: 'Inicio',  }}/>
                <Stack.Screen name="Prueba" component={PantallaPrincipal} />
                <Stack.Screen name="Minijuego" component={MiniJuego_Lectura} options={{ headerShown: false }}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

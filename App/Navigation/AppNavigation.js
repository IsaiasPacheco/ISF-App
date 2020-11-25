import React from 'react'
import { NavigationContainer  } from '@react-navigation/native'
import { createStackNavigator  } from '@react-navigation/stack'

import PantallaInicio from '@screen/PantallaInicio'
import PantallaPrincipal from '@screen/PantallaPrincipal'

export default function AppNavigation(){
    const Stack = createStackNavigator();

    return(
        <NavigationContainer>
            <Stack.Navigator >
                <Stack.Screen name="PantallaInicio" component={PantallaInicio} options={{header: () => null}}/>
                <Stack.Screen name="PantallaPrincipal" component={PantallaPrincipal} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
import React, { useState } from 'react'
import { Text, TextInput , View, Button } from 'react-native'
import Tts from 'react-native-tts'


import Header from '@components/Header'
import imgs from '@resources/CharactersImgs'
import Lecciones from '@components/Lecciones'

import cuento1 from '@cuentos/cuento1'

export default function Pantallaprincipal({navigation}){
    var [ count, setCount ] = useState(10);
    var [ completado, setCompletado ] = useState(false);

    function aumentarProgreso(){
        setCount(count+=10);
        if( count > 110 ){
            setCompletado(true);
            setCount(10);
        }
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    var leyendo = 0;
    

    function leerCuento(){
        var numElems = Object.keys(cuento1).length
        Tts.setDefaultLanguage('es-us');
        
        for (var i in cuento1 ) {
            var texto = cuento1[i];
            Tts.speak(texto);    
         }    
    }    
    
    
    

    const index = getRandomInt(0, imgs.length);
    const percentage = 66;
    return(
        <View>
            <Header progreso={count} indexImg={0} />
            <Text> {Pantallaprincipal} </Text>
            <Button title="Hablar" onPress={ ()=> Tts.speak("Hola esta es una prueba") }/>
            <Button title="Aumentar Progreso" onPress={ () => aumentarProgreso() } />
            <Button title="Leer cuento" onPress={ () => leerCuento() } />
            <Button title="Pausar" onPress={ () => Tts.stop() } />
            { completado &&  <Text> Excelente </Text>  }
        </View> 
    )
    

} 
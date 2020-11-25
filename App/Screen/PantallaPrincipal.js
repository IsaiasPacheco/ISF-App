import React, { useState } from 'react'
import { Text, TextInput , View, Button } from 'react-native'
import Tts from 'react-native-tts'

import Header from '@components/Header'
import imgs from '@resources/CharactersImgs'

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

    const index = getRandomInt(0, imgs.length);

    return(
        <View>
            <Header progreso={count} indexImg={4} />
            <Text> Pantallaprincipal </Text>
            <Button title="Hablar" onPress={ ()=> Tts.speak("Yo escojo a la Pacha mama") }/>
            <Button title="Aumentar Progreso" onPress={ () => aumentarProgreso() } />
            { completado &&  <Text> Excelente </Text>  }
        </View>
    )
    

} 

import React, { Component } from 'react'
import { Text, View, Button, ImageBackground, Image } from 'react-native'
import Tts from 'react-native-tts'

import imgBg from '@resources/Images/background.jpg'
import {stylesLogin} from '@stylesApp/styles.js'

function hablarMujer(texto){
    Tts.setDefaultLanguage('de-DE');
    Tts.speak(texto);
}

function hablarHombre(texto){
    Tts.setDefaultPitch(0.99);
    //Tts.setDefaultRate(0.7);
    Tts.setDefaultLanguage('sv-SE');
    Tts.speak(texto);
}

//onPress={ () => hablarHombre("Había una vez un ratón que quería visitar a su madre.") }

export default function PantallaInicio ({navigation}) {
    return(
        <View style={stylesLogin.container}>
            <ImageBackground source={require('@resources/Images/background.jpg')} style = {stylesLogin.image}>
                <View style={stylesLogin.iconContainer} >
                    <Image style={stylesLogin.icon} source={require('@resources/Images/bear.png')}/>
                </View>
                <Text style={stylesLogin.text}> Bienvenido </Text>
                <Button  title='Iniciar' color="#fcbd00" onPress={ () => navigation.navigate("PantallaPrincipal")} />
            </ImageBackground>
        </View>
    );

}
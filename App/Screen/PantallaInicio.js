
import React, { useEffect, useState } from 'react'
import { Text, View, Button, ImageBackground, Image, StyleSheet, TextInput, TouchableOpacity, ToastAndroid, Alert} from 'react-native'
import {stylesLogin} from '@stylesApp/styles.js'
import AsyncStorage from '@react-native-community/async-storage'

//onPress={ () => hablarHombre("Había una vez un ratón que quería visitar a su madre.") }

const getData = async (llave) => {
    try {
      const jsonValue = await AsyncStorage.getItem(`@user_${llave}`)
      console.log(jsonValue)
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      return null;
    }
}

function validarLogin(user, password, navigation) {

    if(user != null && password != null ){
        getData(user).then( (usr) => {
            if( usr == null ){
                Alert.alert(
                    "Error",
                    "Usuario no registrado"
                )
            }else{
                //Sacar el usuario y la contra
                let pas = usr['password']
                if(pas == password ){
                    ToastAndroid.show("Sesion iniciada correctamente", ToastAndroid.SHORT);
                    navigation.navigate("PantallaPrincipal")
                }else{
                    ToastAndroid.show("Contraseña incorrecta", ToastAndroid.SHORT);
                }
            }
        })

    }else{
        ToastAndroid.show("Completa los datos del formulario", ToastAndroid.SHORT);
    }
}

export default function PantallaInicio ({navigation}) {

    const [usuario, setUsuario] = useState(null)
    const [pass, setPass] = useState(null)
    
    return(
        <View style={stylesLogin.container}>
            <ImageBackground source={require('@resources/Images/background.jpg')} style = {stylesLogin.image}>
                <View style={stylesLogin.iconContainer} >
                    <Image style={stylesLogin.icon} source={require('@resources/Images/bear.png')}/>
                </View>
                <Text style={stylesLogin.text}> Bienvenido </Text>

                <TextInput style={stylesInicio.txtUsuario} onChangeText={ (text) => setUsuario(text)} />
                <Text style={stylesInicio.txtInputs} > Usuario </Text>

                <TextInput style={stylesInicio.txtUsuario} secureTextEntry={true} onChangeText={ (text) => setPass(text)} />
                <Text style={stylesInicio.txtInputs} > Contraseña </Text>

                <AppButton onPress={ () => validarLogin(usuario, pass, navigation) } title={'Iniciar'}/>
                
             
                <View style={stylesInicio.contenedor}>
                    <TouchableOpacity onPress={()  => navigation.navigate("Registro")}>
                        <Text style={stylesInicio.txtRegistro}> ¿No tienes cuenta?, Regístrate </Text>
                    </TouchableOpacity>
                </View>                
            </ImageBackground>
        </View>
    );
}

const AppButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={stylesInicio.appButtonContainer}>
      <Text style={stylesInicio.appButtonText}>{title}</Text>
    </TouchableOpacity>
  );

  //fcbd00

const stylesInicio = StyleSheet.create({
    contenedor: {
        alignSelf: 'center',
        flexDirection: 'column-reverse'
    },  
    txtRegistro: {
        color: '#fff',
        fontSize: 15,
        textDecorationLine: 'underline'
    },
    txtInputs:{
        alignSelf: 'center', 
        color: '#fff',
        fontSize: 18
    },
    txtUsuario:{
        height: 40, 
        borderColor: 'white',
        borderWidth: 1,
        backgroundColor: '#fff',
        marginLeft: 30,
        marginRight: 30,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10
    },
    appButtonContainer: {
        elevation: 8,
        backgroundColor: "#fcbd00",
        borderRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginBottom: 20,
        paddingBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
      },
      appButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
      }
})
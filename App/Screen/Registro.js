import React, {Component} from 'react'
import { Text, View, ImageBackground, StyleSheet, TextInput, TouchableOpacity, ToastAndroid, Alert } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import {stylesLogin} from '@stylesApp/styles.js'

const storeData = async (value, llave) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(`@user_${llave}`, jsonValue)
    } catch (e) {
        console.log("Error al guardar")
    }
}

const getData = async (llave) => {
    try {
      const jsonValue = await AsyncStorage.getItem(`@user_${llave}`)
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      return null;
    }
}

export default class Registro extends Component{

    constructor(){
        super();
        this.state = {
            nombre: null,
            usuario: null,
            password: null,
        }
    }

    handleNombre = (text) => {
        this.setState({nombre: text})
    }

    handleUsuario = (text) => {
        this.setState({usuario: text})
    }

    handlePassword = (text) => {
        this.setState({password: text})
    }



    registrarUsuario(nombre){
        //alert( 'nombre: ' + this.state.nombre + ' Usuario: ' + this.state.usuario + ' Contraseña: ' + this.state.password)
        //Si se puede recuperar la key con el usuario entonces ya existes
    getData(this.state.usuario).then((arr) => {
        if(arr == null ){
            if( this.state.nombre != null && this.state.password != null && this.state.usuario != null){
                storeData(this.state, this.state.usuario);
                ToastAndroid.show("Registrado correctamente", ToastAndroid.SHORT);
                this.props.navigation.goBack();
            }else{
                ToastAndroid.show("Completa los datos del formulario", ToastAndroid.SHORT);
            }
        }else{
            Alert.alert(
                "Error",
                `El usuario "${this.state.usuario}" ya esta registrado`
            )
            console.log(arr)
            //alert(`El usuario "${this.state.usuario}" ya esta registrado`)
        }
        
        } )
        
    }

    render(){
        return(
            
            <View style={{flex: 1}}>
                <ImageBackground source={require('@resources/Images/background.jpg')} style = {stylesLogin.image}>
                    
                    <Text style={hojaEstilos.txtTitulo}> Ingresa tu datos </Text>

                    <Text style={hojaEstilos.txtInputs}> Nombre completo </Text>
                    <TextInput style={hojaEstilos.txtUsuario} placeholder = "Nombre" onChangeText={text => this.handleNombre(text)}/>

                    <Text style={hojaEstilos.txtInputs}> Nombre de usuario </Text>
                    <TextInput style={hojaEstilos.txtUsuario} placeholder="Usuario" onChangeText={text => this.handleUsuario(text)}/>

                    <Text style={hojaEstilos.txtInputs}> Contraseña </Text>
                    <TextInput style={hojaEstilos.txtUsuario} secureTextEntry={true} placeholder="Contraseña" onChangeText={text => this.handlePassword(text)} />

                    <AppButton onPress={ () => this.registrarUsuario(this.state.nombre)} title='Registrar' />
                </ImageBackground>
            </View>
        )
    }

}

const AppButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={hojaEstilos.appButtonContainer}>
      <Text style={hojaEstilos.appButtonText}>{title}</Text>
    </TouchableOpacity>
  );

const hojaEstilos = StyleSheet.create({
    tarjetaPerfil: {
        flex: 1,
        backgroundColor: 'white',
        margin: 8,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 5,
    },
    txtTitulo:{
        fontSize: 33,
        alignSelf: 'center',
        color: 'white',
        marginBottom: 50,
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
    txtInputs:{
        alignSelf: 'center', 
        color: '#fff',
        fontSize: 18
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
import React, {useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, Dimensions, ScrollView, SafeAreaView } from 'react-native'
import avatar from '../Resources/Avatars/avatar.jpg'
import * as Progress from 'react-native-progress';
import AsyncStorage from '@react-native-community/async-storage'

const widh = Dimensions.get('window').width;

export default function Perfil(props){

    const [jsonObj , setObj] = useState(null);

    const getData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('@items_key')
          setObj(jsonValue)
          return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch(e) {          
          return null;
        }
    }

    useEffect( () => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            getData();
          });
        getData();
    })

    const arrDatos = JSON.parse(jsonObj)
    console.log("< -- > ")
    console.log( arrDatos)
    console.log("< -- > ")
    
    let rows = []
        if( arrDatos!= null ){
            Object.values(arrDatos).map( (i) => {
                console.log(i.nombre)
                let progreso
                if( i.completado ){
                    progreso = 100
                }else{
                    progreso = 0
                }
                rows.push( <Text style={styles.textoProgreso}> {i.nombre}</Text>  )
                rows.push( <Progress.Bar progress={progreso} width={100} color={'#369536'}/> )
                
            })
        }else{
            rows.push(<View></View>)
        }

    return(
        <View style={styles.container}>
            <View style={styles.tarjetaPerfil}>
                <Text style={styles.titulo}> Perfil </Text>
                <View style={styles.infoPerfil}>
                    <Text style={styles.nombreUsuario}> Isaias Pacheco </Text>
                    <Image style={styles.imgAvatar} source={avatar} />
                </View>
                <View>
                    <SafeAreaView>
                        <Text style={styles.leccionesCompletadas}> Progreso </Text>
                        
                        <ScrollView style={{marginLeft: 20, marginTop: 10}} keyExtractor={(item, index) => index.toString()}>
                            {rows}
                        </ScrollView>

                    </SafeAreaView>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#bfbfbf'
    },
    textoProgreso:{
        fontFamily: "Pineapple Grass",
        fontSize: 18,
        marginBottom: 5,
        marginTop: 10,
    },
    leccionesCompletadas: {
        paddingTop: 30,
        fontSize: 22,
        alignSelf: 'center',
        fontFamily: "Pineapple Grass",
    },
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
    imgAvatar: {
        width: widh-30,
        height: 300,
        resizeMode: 'contain'

    },
    nombreUsuario:{
        fontSize: 22,
        paddingTop: 20,
        alignSelf: 'center',
        paddingLeft: 10,
        fontFamily: "Pineapple Grass",
    },
    infoPerfil: {
        fontSize: 20,
        
    },
    titulo: {
        fontSize: 20,
        color: '#000',
        color: '#8f8f8f',
        alignSelf: 'center'
    },
    
})
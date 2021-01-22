import React, {useState, useEffect} from 'react'
import { Modal, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'

import cerrarIcon from '../Resources/Images/cerrar.png'
import Sound from 'react-native-sound';
import Tts from 'react-native-tts'

function validarRespuesta(props, res) {
    if( res === props.respuesta){
        var whoosh = new Sound('right_answer.mp3', Sound.MAIN_BUNDLE, (error) => {
            if (error) {
              console.log('failed to load the sound', error);
              return;
            }
            
            // Play the sound with an onEnd callback
            whoosh.play((success) => {
              if (success) {
                //console.log('successfully finished playing');
              } else {
                //console.log('playback failed due to audio decoding errors');
              }
            });
          });    
    //
    props.accionIncrementar();
    props.accionCerrarModal();

    }else{
        var whoosh = new Sound('wrong_answer.mp3', Sound.MAIN_BUNDLE, (error) => {
            if (error) {
              console.log('failed to load the sound', error);
              return;
            }
            
            // Play the sound with an onEnd callback
            whoosh.play((success) => {
              if (success) {
                //console.log('successfully finished playing');
              } else {
                //console.log('playback failed due to audio decoding errors');
              }
            });
          });
    }
}



export default function ModalEjercicio(props){
    
    return(
        <Modal 
            animationType="slide"
            transparent
            visible={props.mostrar}
        >
            
        <View
            style={{
                flex: 1, 
                backgroundColor: 'rgba(1,1,1,0.8)',
                justifyContent: 'center',
                alignItems: 'center',
            }}
                
        >
            
            <View
                style={{
                    height: '80%',
                    width: '90%',
                    backgroundColor: '#f0f0f0',
                    borderRadius: 15,
                }}
            >


                
                <View
                    style={{
                        height: 45,
                        width: '100%',
                        flexDirection: 'row',
                        alignItems: 'flex-end',
                        justifyContent: 'center'
                    }}
                >
                    <TouchableOpacity onPress={ () => props.accionCerrarModal()}>
                        <Image source={cerrarIcon} style={{ width: 30, height: 30}}/>
                    </TouchableOpacity>
                    
                </View>


                <Text style={styles.enunciado} > {props.enunciado} </Text>        
                    
                <TouchableOpacity onPress={ () => validarRespuesta(props, "a")} >
                    <Text style={styles.preguntaUno} > {props.pregunta1}  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={ () => validarRespuesta(props, "b")} >
                    <Text style={styles.preguntas} > {props.pregunta2}  </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={ () => validarRespuesta(props, "c")} >
                    <Text style={styles.preguntas} > {props.pregunta3}  </Text>
                </TouchableOpacity>

            </View>

        </View>

        </Modal>
    )

}

const styles = StyleSheet.create(
    {
      container: {
        flexDirection: 'row',
        justifyContent: 'center',
        borderWidth: 1,
        paddingLeft: 40,
        paddingRight: 40,
        paddingEnd: 5,
        paddingTop: 5,
        borderRadius: 5,
        fontSize: 20,
        backgroundColor: "#fff"
      },

      enunciado:{
        flexDirection: 'row',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#0081d6',
        paddingLeft: 40,
        paddingRight: 40,
        paddingBottom: 15,
        paddingTop: 15,
        borderRadius: 5,
        fontSize: 20,
        marginTop: 30,
        marginLeft: 10,
        marginEnd: 10,
        backgroundColor: "#fff",
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2,
        fontFamily: "Pineapple Grass",
      },

      preguntaUno: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingLeft: 40,
        paddingRight: 40,
        paddingBottom: 15,
        paddingTop: 15,
        borderRadius: 5,
        fontSize: 20,
        marginTop: 60,
        marginLeft: 10,
        marginEnd: 10,
        backgroundColor: "#fff",
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2,
        fontFamily: "Pineapple Grass",
        borderWidth: 2,
        borderColor: '#bde4ff',
      },

      preguntas: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingLeft: 40,
        paddingRight: 40,
        paddingBottom: 15,
        paddingTop: 15,
        borderRadius: 5,
        fontSize: 20,
        marginTop: 10,
        marginLeft: 10,
        marginEnd: 10,
        backgroundColor: "#fff",
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2,
        fontFamily: "Pineapple Grass",
        borderWidth: 2,
        borderColor: '#bde4ff',
      },


});
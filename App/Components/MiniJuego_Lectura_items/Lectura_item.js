import React, { Component } from 'react';
import { Text, TextInput , View, Button } from 'react-native'
import {  Animated, TouchableOpacity, StyleSheet,Image, Dimensions, Platform,  UIManager } from 'react-native';
import Tts from 'react-native-tts'

const width = Dimensions.get('window').width;

function funLeer(personaje, texto) {
  let aux = String(personaje);
  aux=aux.split("_",1);
  let auxCad = aux[0];

  //console.log(auxCad);
  Tts.setDucking(true);
  Tts.setDefaultRate(0.57);
  Tts.setDefaultLanguage('es-MX');

  if( auxCad === "narrador"){
    //console.log("narrador hablando...");
    Tts.setDefaultVoice("Juan");
    Tts.speak(""+texto);
  }else if(auxCad === "p1"){
    //console.log("personaje hablando");
    Tts.setDefaultVoice("Diego");
    Tts.speak(""+texto);
  }else if(auxCad == "p2"){
    Tts.setDefaultVoice("Angelica");
    Tts.speak(""+texto);
  }else if(auxCad == "p3"){
    Tts.setDefaultVoice("Isabela");
    Tts.speak(""+texto);
  }else if(auxCad == "p4"){
    Tts.setDefaultVoice("Jorge");
    Tts.speak(""+texto);
  }else if(auxCad == "p5"){
    Tts.setDefaultVoice("Monica");
    Tts.speak(""+texto);
  }else if(auxCad == "p6"){
    Tts.setDefaultVoice("Carlos");
    Tts.speak(""+texto);
  }else if(auxCad == "p7"){
    Tts.setDefaultVoice("Paulina");
    Tts.speak(""+texto);
  }else if(auxCad == "p8"){
    Tts.setDefaultVoice("Francisca");
    Tts.speak(""+texto);
  }
}



export default class Lectura_item extends Component {


    constructor() {
      super();
      this.animatedValue = new Animated.Value(0);
      if (Platform.OS === 'android') {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }
  
    shouldComponentUpdate(nextProps, nextState) {
      if (nextProps.item.id !== this.props.item.id) {
        return true;
      }
      return false;
    }
  
    componentDidMount() {
      Animated.timing(
        this.animatedValue,
        {
          toValue: 0.5,
          duration: 500,
          useNativeDriver: true
        }
      ).start(() => {
        this.props.afterAnimationComplete();
        const num = this.props.item.index;
        Tts.stop();
        funLeer(this.props.quienHabla, this.props.item.text);
        //Tts.speak(""+this.props.item.text);
        this.props.clikHandler();
      });
    }
  
    reEscuchar = () => {
      Tts.stop();
      Tts.speak("" + this.props.item.text);
    }

    removeItem = () => {
      Animated.timing(
        this.animatedValue,
        {
          toValue: 1,
          duration: 500,
          useNativeDriver: true
        }
      ).start(() => {
        this.props.removeItem(this.props.item.id);
        Tts.speak("Adios");
      });
    }
  
    render() {
      const translateAnimation = this.animatedValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [-width, 0, width]
      });
  
      const opacityAnimation = this.animatedValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, 1, 0]
      });
  
      return (
        <Animated.View style={[
          styles.viewHolder, {
            transform: [{ translateX: translateAnimation }],
            opacity: opacityAnimation
          }]}
        >
          <TouchableOpacity
            style={styles.removeBtn}
            onPress = {this.reEscuchar}
          >
            <Image
              source = {require('@resources/Images/audio.png')}
              style={styles.btnImage}
            />
          </TouchableOpacity>
          
          
          <Text
            style={styles.displayText}>
            {this.props.item.text}
          </Text>
          
        </Animated.View>
      );
    }
  }
  
  const styles = StyleSheet.create(
    {
      viewHolder: {
        paddingVertical: 15,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'flex-start',
        margin: 4,
        paddingLeft: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2,
      },
      displayText: {
        color: 'black',
        fontSize: 25,
        paddingRight: 35,
        marginRight: 20,
        textAlign: 'justify'
      },
      removeBtn: {
        position: 'absolute',
        right: 13,
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
      },
      btnImage: {
        resizeMode: 'contain',
        width: '100%',
      },
    });
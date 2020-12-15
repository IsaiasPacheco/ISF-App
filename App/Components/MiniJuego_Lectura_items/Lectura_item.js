import React, { Component } from 'react';
import { Text, TextInput , View, Button } from 'react-native'
import {  Animated, TouchableOpacity, StyleSheet,Image, Dimensions, Platform,  UIManager } from 'react-native';
import Tts from 'react-native-tts'

const width = Dimensions.get('window').width;

const cuento = {
    narrador: "Bienvenido",
    pa: "Hola",
    pb: "Profesor",
    pa: "esta es una prueba",
    pb: "del laz voces de personajes"
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
        Tts.speak("Hola");
      });
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
            onPress={this.removeItem}
          >
            <Image
              style={styles.btnImage}
            />
          </TouchableOpacity>
          
          <Text
            style={styles.displayText}>
            Row Now :  {this.props.item.text}
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
        borderRadius: 10
      },
      displayText: {
        color: 'black',
        fontSize: 25,
        paddingRight: 17
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
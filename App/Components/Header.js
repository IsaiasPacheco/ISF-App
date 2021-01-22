import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Cross from "./HeaderComps/Cross";
import Heart from "./HeaderComps/Heart";
import Progress from "./HeaderComps/Progress";
import Character from "./HeaderComps/Character";
import { useState, useEffect } from "react";

import Tts from 'react-native-tts'

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  title: {
    alignSelf: "center",
    fontFamily: "Pineapple Grass",
    fontSize: 30,
  },
});

export default function Header(props) {

    const [hablar, setHablar ] = useState(true);

    useEffect( () => {
      if( hablar ){
        Tts.setDefaultEngine("es.codefactory.vocalizertts");
        Tts.getInitStatus().then(() => {
          Tts.stop();
          Tts.setDucking(true);
          Tts.setDefaultVoice("Juan");
          Tts.speak(props.nombre);
        }, (err) => {
          if (err.code === 'no_engine') {
            console.log("Error con el audio");
          }
        });

        setHablar(false);
      }
      
  })

  return (
    <View>
      <View style={styles.row}>
        <Cross navigation={props.navigation} />
        <Progress progreso={props.progreso}/>
        <Heart />
      </View>
      <Text style={styles.title}>{props.nombre}</Text>
      <Character indexImg={props.indexImg} />
    </View>
  );
};

